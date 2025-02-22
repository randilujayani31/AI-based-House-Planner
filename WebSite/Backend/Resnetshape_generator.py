import os
import tensorflow as tf
import cv2
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model
from skimage.metrics import structural_similarity as ssim

# import os
# import cv2
# import numpy as np
from skimage.metrics import structural_similarity as ssim
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing import image
from scipy.spatial.distance import cosine

# Load ResNet50 model pre-trained on ImageNet
base_model = ResNet50(weights="imagenet")
model = Model(inputs=base_model.input, outputs=base_model.get_layer("avg_pool").output)

def preprocess_image(img_path):
    """Load and preprocess image for ResNet50"""
    img = image.load_img(img_path, target_size=(224, 224))  # ResNet50 input size
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return preprocess_input(img_array)

def extract_features(img_path):
    """Extract feature vector using ResNet50"""
    img_array = preprocess_image(img_path)
    return model.predict(img_array)[0]  # Get feature vector

def find_most_similar_image(input_image_path, test_images_folder):
    """
    Find the most similar image in the test_images_folder using ResNet50 embeddings.
    If the best match score is below 0.9, return an error message.
    """
    input_features = extract_features(input_image_path)

    best_match = None
    best_score = float("inf")  # Lower cosine distance is better

    for img_name in os.listdir(test_images_folder):
        test_image_path = os.path.join(test_images_folder, img_name)
        
        try:
            test_features = extract_features(test_image_path)
        except:
            continue
        
        score = cosine(input_features, test_features)  # Compute cosine distance

        if score < best_score:  # Lower distance means more similarity
            best_score = score
            best_match = test_image_path

    similarity_score = 1 - best_score  # Convert to similarity (1 = identical)

    if similarity_score < 0.9:
        return None, f"Unable to verify the system's ability to generate the floor plan. Please try again later (Similarity Score: {similarity_score:.2f})"
    
    return best_match, None



# def preprocess_image(image_path):
#     """
#     Load and preprocess an image for the generator model.
#     """
#     img = tf.io.read_file(image_path)
#     img = tf.image.decode_png(img, channels=3)
#     img = tf.image.resize(img, [256, 256])
#     img = (tf.cast(img, tf.float32) / 127.5) - 1
#     return tf.expand_dims(img, axis=0)

def generate_footprint(generator_model_path, input_image_path, output_save_path):
    """
    Load generator model and create footprint image.
    """
    generator = load_model(generator_model_path, compile=False)
    input_image = preprocess_image(input_image_path)
    predicted_split = generator(input_image, training=False)
    tf.keras.preprocessing.image.save_img(
        output_save_path, (predicted_split[0] + 1) * 127.5
    )
    return output_save_path

def process_generated_image(output_save_path, processed_image_save_path):
    """
    Process the generated image by applying filtering and contouring.
    """
    img = cv2.imread(output_save_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise ValueError(f"Error loading image: {output_save_path}")
    
    blurred = cv2.GaussianBlur(img, (5, 5), 0)
    _, thresholded = cv2.threshold(blurred, 127, 255, cv2.THRESH_BINARY_INV)
    kernel = np.ones((5, 5), np.uint8)
    closed = cv2.morphologyEx(thresholded, cv2.MORPH_CLOSE, kernel)
    edges = cv2.Canny(closed, 50, 150)
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    sharp_image = np.zeros_like(img)
    for contour in contours:
        epsilon = 0.01 * cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, epsilon, True)
        cv2.drawContours(sharp_image, [approx], -1, (255), thickness=cv2.FILLED)
    
    final_image = cv2.bitwise_not(sharp_image)
    cv2.imwrite(processed_image_save_path, final_image)
    return processed_image_save_path

# def shape_generator(input_image_path):
#     """
#     Full pipeline: find similar image, generate footprint, and process output.
#     """
#     similar_image_path = find_most_similar_image(input_image_path, "test_images")
#     print(f"Most similar image found: {similar_image_path}")
    
#     generated_image_path = generate_footprint("Shape_generator_epoch_100.h5", similar_image_path, "./generated_images/generated_image.png")
#     print(f"Generated image saved at: {generated_image_path}")
    
#     processed_image_path = process_generated_image(generated_image_path, "final_processed_footprint.png")
#     print(f"Final processed image saved at: {processed_image_path}")
    
#     # return processed_image_path
#     return generated_image_path

def shape_generator(input_image_path):
    """
    Full pipeline: find similar image, generate footprint, and process output.
    """
    similar_image_path, error_msg = find_most_similar_image(input_image_path, "test_images")

    if error_msg:
        return None, error_msg
    
    print(f"Most similar image found: {similar_image_path}")
    
    generated_image_path = generate_footprint("footprintGen.h5", similar_image_path, "./generated_images/generated_image.png")
    print(f"Generated image saved at: {generated_image_path}")
    
    # processed_image_path = process_generated_image(generated_image_path, "final_processed_footprint.png")
    # print(f"Final processed image saved at: {processed_image_path}")
    
    return generated_image_path, None  
