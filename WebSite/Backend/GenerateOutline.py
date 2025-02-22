from flask import Flask, request, send_file, jsonify
import cv2
import numpy as np
import os

app = Flask(__name__)

@app.route('/generate-3d-view', methods=['POST'])
def generate_3d_view():
    try:
        # Load the input image
        input_image_path = "./generated_images/generated_room_split.png"  # Ensure this file exists in your Flask app directory
        if not os.path.exists(input_image_path):
            return jsonify({"error": "Input image not found"}), 404

        image = cv2.imread(input_image_path)
        if image is None:
            return jsonify({"error": "Failed to load the input image"}), 400

        # Convert the image to grayscale
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Perform edge detection
        edges = cv2.Canny(gray_image, threshold1=50, threshold2=150)

        # Find contours
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        # Create a blank canvas for the output
        room_plan = np.ones_like(image) * 255

        # Draw contours
        for contour in contours:
            epsilon = 0.02 * cv2.arcLength(contour, True)
            approx = cv2.approxPolyDP(contour, epsilon, True)
            cv2.drawContours(room_plan, [approx], -1, (0, 0, 0), thickness=2)

        # Save the output image
        output_path = "room_plan_with_black_outlines.png"
        cv2.imwrite(output_path, room_plan)

        # Send the output file to the client
        return send_file(output_path, mimetype='image/png', as_attachment=True, download_name='room_plan_with_black_outlines.png')

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8081, debug=True)
