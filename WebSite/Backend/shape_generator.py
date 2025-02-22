# import os
# import tensorflow as tf
# import cv2
# import numpy as np
# import matplotlib.pyplot as plt
# from tensorflow.keras.models import load_model
# from skimage.metrics import structural_similarity as ssim
# #from tensorflow.keras.applications.ResNet50 import preprocess_image

# # Load pre-trained ResNet50 model
# #model = ResNet50(weights="imagenet", include_top=False, pooling="avg")

# def find_most_similar_image(input_image_path, test_images_folder):
#     """
#     Find the most similar image in the test_images_folder using SSIM.
#     If the best match score is below 0.9, return an error message.
#     """
#     input_image = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
#     input_image = cv2.resize(input_image, (256, 256))
    
#     best_match = None
#     best_score = -1
    
#     for img_name in os.listdir(test_images_folder):
#         test_image_path = os.path.join(test_images_folder, img_name)
#         test_image = cv2.imread(test_image_path, cv2.IMREAD_GRAYSCALE)
        
#         if test_image is None:
#             continue
        
#         test_image = cv2.resize(test_image, (256, 256))
#         score, _ = ssim(input_image, test_image, full=True)
        
#         if score > best_score:
#             best_score = score
#             best_match = test_image_path
    
#     if best_score < 0.8000:
#         return None, f"Unable to verify the system's ability to generate the floor plan.Please try again later (SSIM Score: {best_score:.2f})"
#     print(best_match)

#     return best_match, None


# # def find_most_similar_image(input_image_path, test_images_folder):
# #     """
# #     Find the most similar image in the test_images_folder using SSIM.
# #     """
# #     input_image = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
# #     input_image = cv2.resize(input_image, (256, 256))
    
# #     best_match = None
# #     best_score = -1
    
# #     for img_name in os.listdir(test_images_folder):
# #         test_image_path = os.path.join(test_images_folder, img_name)
# #         test_image = cv2.imread(test_image_path, cv2.IMREAD_GRAYSCALE)
        
# #         if test_image is None:
# #             continue
        
# #         test_image = cv2.resize(test_image, (256, 256))
# #         score, _ = ssim(input_image, test_image, full=True)
        
# #         if score > best_score:
# #             best_score = score
# #             best_match = test_image_path
    
# #     return best_match

# def preprocess_image(image_path):
#     """
#     Load and preprocess an image for the generator model.
#     """
#     img = tf.io.read_file(image_path)
#     img = tf.image.decode_png(img, channels=3)
#     img = tf.image.resize(img, [256, 256])
#     img = (tf.cast(img, tf.float32) / 127.5) - 1
#     return tf.expand_dims(img, axis=0)

# def generate_footprint(generator_model_path, input_image_path, output_save_path):
#     """
#     Load generator model and create footprint image.
#     """
#     generator = load_model(generator_model_path, compile=False)
#     input_image = preprocess_image(input_image_path)
#     predicted_split = generator(input_image, training=False)
#     tf.keras.preprocessing.image.save_img(
#         output_save_path, (predicted_split[0] + 1) * 127.5
#     )
#     return output_save_path

# def process_generated_image(output_save_path, processed_image_save_path):
#     """
#     Process the generated image by applying filtering and contouring.
#     """
#     img = cv2.imread(output_save_path, cv2.IMREAD_GRAYSCALE)
#     if img is None:
#         raise ValueError(f"Error loading image: {output_save_path}")
    
#     blurred = cv2.GaussianBlur(img, (5, 5), 0)
#     _, thresholded = cv2.threshold(blurred, 127, 255, cv2.THRESH_BINARY_INV)
#     kernel = np.ones((5, 5), np.uint8)
#     closed = cv2.morphologyEx(thresholded, cv2.MORPH_CLOSE, kernel)
#     edges = cv2.Canny(closed, 50, 150)
#     contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
#     sharp_image = np.zeros_like(img)
#     for contour in contours:
#         epsilon = 0.01 * cv2.arcLength(contour, True)
#         approx = cv2.approxPolyDP(contour, epsilon, True)
#         cv2.drawContours(sharp_image, [approx], -1, (255), thickness=cv2.FILLED)
    
#     final_image = cv2.bitwise_not(sharp_image)
#     cv2.imwrite(processed_image_save_path, final_image)
#     return processed_image_save_path

# # def shape_generator(input_image_path):
# #     """
# #     Full pipeline: find similar image, generate footprint, and process output.
# #     """
# #     similar_image_path = find_most_similar_image(input_image_path, "test_images")
# #     print(f"Most similar image found: {similar_image_path}")
    
# #     generated_image_path = generate_footprint("Shape_generator_epoch_100.h5", similar_image_path, "./generated_images/generated_image.png")
# #     print(f"Generated image saved at: {generated_image_path}")
    
# #     processed_image_path = process_generated_image(generated_image_path, "final_processed_footprint.png")
# #     print(f"Final processed image saved at: {processed_image_path}")
    
# #     # return processed_image_path
# #     return generated_image_path

# def shape_generator(input_image_path):
#     """
#     Full pipeline: find similar image, generate footprint, and process output.
#     """
#     similar_image_path, error_msg = find_most_similar_image(input_image_path, "test_images")

#     if error_msg:
#         return None, error_msg  # Return error message if similarity is low
    
#     print(f"Most similar image found: {similar_image_path}")
    
#     generated_image_path = generate_footprint("footprintGen.h5", similar_image_path, "./generated_images/generated_image.png")
#     print(f"Generated image saved at: {generated_image_path}")
    
#     processed_image_path = process_generated_image(generated_image_path, "final_processed_footprint.png")
#     print(f"Final processed image saved at: {processed_image_path}")
    
#     return processed_image_path, None  # No error message
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

# Load pre-trained ResNet50 model
model = ResNet50(weights="imagenet", include_top=False, pooling="avg")

def get_embedding(img_path):
    """
    Get the embedding of an image using ResNet50.
    """
    img = tf.keras.preprocessing.image.load_img(img_path, target_size=(224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return model.predict(img_array).flatten()

def find_most_similar_image(input_image_path, test_images_folder):
    """
    Find the most similar image in the test_images_folder using ResNet50 embeddings and cosine similarity.
    If the best match score is below 0.8, return an error message.
    """
    input_embedding = get_embedding(input_image_path)

    best_match = None
    best_score = -1

    for img_name in os.listdir(test_images_folder):
        test_image_path = os.path.join(test_images_folder, img_name)
        if not os.path.isfile(test_image_path):
            continue

        test_embedding = get_embedding(test_image_path)
        score = np.dot(input_embedding, test_embedding) / (np.linalg.norm(input_embedding) * np.linalg.norm(test_embedding))

        if score > best_score:
            best_score = score
            best_match = test_image_path

    if best_score < 0.8:
        return None, f"Unable to verify the system's ability to generate the floor plan. Please try again later (Similarity Score: {best_score:.2f})"

    return best_match, None

def preprocess_image(image_path):
    """
    Load and preprocess an image for the generator model.
    """
    img = tf.io.read_file(image_path)
    img = tf.image.decode_png(img, channels=3)
    img = tf.image.resize(img, [256, 256])
    img = (tf.cast(img, tf.float32) / 127.5) - 1
    return tf.expand_dims(img, axis=0)

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

def shape_generator(input_image_path):
    """
    Full pipeline: find similar image, generate footprint, and process output.
    """
    similar_image_path, error_msg = find_most_similar_image(input_image_path, "test_images")

    if error_msg:
        return None, error_msg  # Return error message if similarity is low

    print(f"Most similar image found: {similar_image_path}")

    generated_image_path = generate_footprint("footprintGen.h5", similar_image_path, "./generated_images/generated_image.png")
    print(f"Generated image saved at: {generated_image_path}")

    processed_image_path = process_generated_image(generated_image_path, "final_processed_footprint.png")
    print(f"Final processed image saved at: {processed_image_path}")

    return processed_image_path, None  # No error message
