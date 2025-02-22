import os
import numpy as np
import tensorflow as tf
import cv2
from tensorflow.keras.models import load_model

# Paths to the generator model
generator_path = 'roomsplitGen.h5'  # Update path as needed

# Load the pre-trained generator
generator = load_model(generator_path, compile=False)

def preprocess_image(image_path):
    """
    Preprocess the input image for the generator.
    """
    img = tf.io.read_file(image_path)
    img = tf.image.decode_png(img, channels=3)  # Decode image from file
    img = tf.image.resize(img, [256, 256])  # Resize to match model input size
    img = (tf.cast(img, tf.float32) / 127.5) - 1  # Normalize to [-1, 1]
    return img

def generate_room_split(processed_footprint_path, output_save_path):
    """
    Generate a room split image from the processed footprint image.
    """
    # Preprocess the input image
    input_image = preprocess_image(processed_footprint_path)
    
    # Add batch dimension
    input_image = tf.expand_dims(input_image, axis=0)
    
    # Generate room split using the model
    predicted_split = generator(input_image, training=False)
    
    # Save the generated output image
    tf.keras.preprocessing.image.save_img(
        output_save_path, (predicted_split[0] + 1) * 127.5  # Convert back to [0, 255] range
    )
    
    return output_save_path

def generate_room_split_image():
    """
    Main function to generate and return the room split image path.
    """
    generated_image_path = generate_room_split("./generated_images/generated_image.png", "./generated_images/generated_room_split.png")
    
    return generated_image_path