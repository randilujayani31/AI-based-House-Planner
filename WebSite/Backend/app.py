from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import mysql.connector
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import base64
from io import BytesIO
from PIL import Image
import os
from werkzeug.utils import secure_filename
from skimage.metrics import structural_similarity as ssim
import cv2
from flask import Flask, request, send_file, jsonify
import cv2
import numpy as np
import os
import open3d as o3d

from shape_generator import shape_generator
from generate_room_split import generate_room_split_image


app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = './uploads'
app.config["TEST_IMAGES_FOLDER"] = "test_images"
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

app.config['JWT_SECRET_KEY'] = 'jwt-secrty-key'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']  # Read token from cookies
app.config['JWT_COOKIE_NAME'] = 'access_token_cookie'
app.config['JWT_COOKIE_SECURE'] = False  # Use True for HTTPS
app.config['JWT_COOKIE_HTTPONLY'] = True  # Prevent JavaScript access
app.config['JWT_COOKIE_CSRF_PROTECT'] = False  # Disable CSRF for testing


CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Database connection
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '1111',
    'database': 'apexa_db'
}

def db_connection():
    conn = mysql.connector.connect(**db_config)
    return conn

def log_activity(email, activity):
    conn = db_connection()
    cursor = conn.cursor()
    sql = "INSERT INTO user_activities (email, activity) VALUES (%s, %s)"
    cursor.execute(sql, (email, activity))
    conn.commit()
    cursor.close()
    conn.close()
    
@app.route('/')
def homepage():
    return "Welcome to Apexa"

@app.route('/search', methods=['GET'])
@jwt_required()  
def search():
    query = request.args.get('query')
    
    if not query:
        return jsonify({"Error": "Search query is required"}), 400
    
    conn = db_connection()
    cursor = conn.cursor(dictionary=True)
    
    sql = "SELECT username, email FROM users WHERE username LIKE %s OR email LIKE %s"
    cursor.execute(sql, (f"%{query}%", f"%{query}%"))
    results = cursor.fetchall()
    
    cursor.close()
    conn.close()

    return jsonify({"Status": "Success", "results": results})

@app.route('/adminpage', methods=['GET'])
@jwt_required()
def admin_page():
    current_user = get_jwt_identity()
    return jsonify({'Status': 'Success', 'email': current_user})

@app.route('/user-details', methods=['GET'])
@jwt_required()
def get_user_details():
    conn = db_connection()
    cursor = conn.cursor(dictionary=True)
    sql = "SELECT username, email FROM users WHERE role = 'user'"
    cursor.execute(sql)
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify({'Status': 'Success', 'users': users})

@app.route('/deleteuser', methods=['DELETE'])
@jwt_required()
def delete_user():
    email = request.json.get('email')
    conn = db_connection()
    cursor = conn.cursor()
    sql = "DELETE FROM users WHERE email = %s"
    cursor.execute(sql, (email,))
    conn.commit()
    rows_affected = cursor.rowcount
    cursor.close()
    conn.close()
    if rows_affected == 0:
        return jsonify({'Error': 'No user found with this email'})
    log_activity(get_jwt_identity(), f"Deleted user with email {email}")
    return jsonify({'Status': 'Success', 'Message': 'User deleted successfully'})

@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    email = data['email']
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    if cursor.fetchone():
        return jsonify({'Error': 'Email already exists'})
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    sql = "INSERT INTO users (username, email, password, role) VALUES (%s, %s, %s, 'user')"
    cursor.execute(sql, (data['username'], email, hashed_password))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'Status': 'Success'})

@app.route('/login', methods=['POST'])
def login_user(): 
    data = request.json
    email = data['email']
    conn = db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if not user or not bcrypt.check_password_hash(user['password'], data['password']):
        return jsonify({'Error': 'Invalid email or password'})
    token = create_access_token(identity=user['email'], expires_delta=False)
    log_activity(user['email'], 'User logged in')
    response = make_response({'Status': 'Success', 'role': user['role'],'email':user['email']})
    response.set_cookie('access_token_cookie', token, httponly=True)
    return response

@app.route('/logout', methods=['GET'])
@jwt_required()
def logout_user():
    email = get_jwt_identity()
    log_activity(email, 'User logged out')
    response = make_response({'Status': 'Success'})
    response.delete_cookie('access_token_cookie')
    return response

@app.route('/forgotpassword', methods=['POST'])
def forgot_password():
    data = request.json
    email = data['email']
    conn = db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if not user:
        return jsonify({'Error': 'No email existed'})
    token = create_access_token(identity=email, expires_delta=False)
    reset_url = f"http://localhost:3000/resetpassword/{token}"
    msg = MIMEMultipart()
    msg['From'] = 'teamapexa2024@gmail.com'
    msg['To'] = email
    msg['Subject'] = 'Password Reset'
    msg.attach(MIMEText(f'Click <a href="{reset_url}">here</a> to reset your password.', 'html'))
    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
            smtp.starttls()
            smtp.login('teamapexa2024@gmail.com', 'glsd dxny pwjo kqoq')
            smtp.sendmail('teamapexa2024@gmail.com', email, msg.as_string())
        log_activity(email, 'Password reset email sent')
        return jsonify({'Status': 'Success', 'Message': 'Email sent'})
    except Exception as e:
        return jsonify({'Error': f'Error sending email: {str(e)}'})
    
@app.route('/resetpassword', methods=['POST'])
@jwt_required(locations=["headers"])  
def reset_password():
    data = request.json
    password = data.get('password')

    if not password:
        return jsonify({'Error': 'Password is required'}), 400

    try:
        email = get_jwt_identity()  
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        conn = db_connection()
        cursor = conn.cursor()
        sql = "UPDATE users SET password = %s WHERE email = %s"
        cursor.execute(sql, (hashed_password, email))
        conn.commit()
        cursor.close()
        conn.close()

        log_activity(email, 'Password reset')

        return jsonify({'Status': 'Success', 'Message': 'Password updated successfully'})

    except Exception as e:
        return jsonify({'Error': f'Invalid or expired token: {str(e)}'}), 400


@app.route('/upload', methods=['POST'])
@jwt_required()
def upload_image():
    data = request.json
    file_data = data['fileData']
    conn = db_connection()
    cursor = conn.cursor()
    sql = "INSERT INTO user_input_image (image, email) VALUES (%s, %s)"
    cursor.execute(sql, (file_data, get_jwt_identity()))
    conn.commit()
    cursor.close()
    conn.close()
    log_activity(get_jwt_identity(), 'Uploaded an image')
    return jsonify({'Status': 'Success', 'Message': 'File uploaded successfully'})

@app.route('/get-all-user-inputs', methods=['GET'])
@jwt_required()
def get_user_images():
    conn = db_connection()
    cursor = conn.cursor(dictionary=True)
    sql = "SELECT * FROM user_input WHERE email = %s"
    cursor.execute(sql, (get_jwt_identity(),))
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

# @app.route('/api/images', methods=['GET'])
# def get_images():
#     conn = db_connection()
#     cursor = conn.cursor(dictionary=True)
#     sql = "SELECT * FROM images LIMIT 3"
#     cursor.execute(sql)
#     images = cursor.fetchall()
#     cursor.close()
#     conn.close()
#     return jsonify(images)


def fix_base64_padding(base64_string):
    """Fix missing padding in base64 encoded string."""
    missing_padding = len(base64_string) % 4
    if missing_padding:
        base64_string += "=" * (4 - missing_padding)
    return base64_string


@app.route("/upload-image", methods=["POST"])
@jwt_required()  
def upload_input_image():
    data = request.json.get("imageData")
    inputImage = request.json.get("inputImage")
    email = get_jwt_identity()


    if not data:
        return jsonify({"error": "No image data provided"}), 400
    try:
        
        data = fix_base64_padding(data)
        image_data = base64.b64decode(data)
        image = Image.open(BytesIO(image_data))

        input_image_data = base64.b64decode(inputImage)
        input_image = Image.open(BytesIO(input_image_data))
        
        if not os.path.exists(app.config["UPLOAD_FOLDER"]):
            os.makedirs(app.config["UPLOAD_FOLDER"])
        
        masked_image_path = os.path.join(app.config["UPLOAD_FOLDER"], "masked_image.png")
        input_image_path = os.path.join(app.config["UPLOAD_FOLDER"], "input_image.png")

        image.save(masked_image_path)
        input_image.save(input_image_path)


        # shape_generated_image_path = shape_generator(masked_image_path)
        shape_generated_image_path, error_msg = shape_generator(masked_image_path)

        if error_msg:
            return jsonify({"error": error_msg}), 400
        
        generated_room_split_image_path = generate_room_split_image()

        input_image = cv2.imread(input_image_path)
        _, input_image_encoded_output = cv2.imencode('.png', input_image)
        input_image_blob = input_image_encoded_output.tobytes()
        
        masked_image = cv2.imread(masked_image_path)
        _, masked_encoded_output = cv2.imencode('.png', masked_image)
        masked_image_blob = masked_encoded_output.tobytes()

        shape_generated_image = cv2.imread(shape_generated_image_path)
        _, shape_generated_encoded_output = cv2.imencode('.png', shape_generated_image)
        shape_generated_image_blob = shape_generated_encoded_output.tobytes()

        room_split_generated_image = cv2.imread(generated_room_split_image_path)
        _, room_split_encoded_output = cv2.imencode('.png', room_split_generated_image)
        room_split_generated_image_blob = room_split_encoded_output.tobytes()

        conn = db_connection()
        cursor = conn.cursor(dictionary=True)
        insert_query = "INSERT INTO user_input_image (email,input_image, masked_img,2d_room_split_img,shape_generated_img) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(insert_query, (email, input_image_blob, masked_image_blob,room_split_generated_image_blob,shape_generated_image_blob))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({
                    "Status": "Image uploaded successfully",
                    "uploadedImageUrl": f"/{masked_image_path}",
                    "generated_path": f"/{generated_room_split_image_path}",
                    "generateImagePath": shape_generated_image_path
                }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/get-room-split-images", methods=["GET"])
@jwt_required()
def get_room_split_images():
    try:
        conn = db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT id, email, 2d_room_split_img FROM user_input_image WHERE id = (SELECT MAX(id) FROM user_input_image)")
        images = cursor.fetchall()

        image_list = []
        for image in images:
            base64_image = base64.b64encode(image['2d_room_split_img']).decode("utf-8")
            image_list.append({
                "id": image['id'],
                "email": image['email'],
                "image_data": base64_image
            })

        return jsonify({"status": "success", "images": image_list}), 200

    except Exception as e:
        return jsonify({"error": f"Error fetching images: {str(e)}"}), 500
    
@app.route("/get-all-images", methods=["GET"])
@jwt_required()
def get_all_user_input_images():
    try:
        conn = db_connection()
        cursor = conn.cursor(dictionary=True)

        # Get the logged-in user's email from the JWT token
        user_email = get_jwt_identity()

        # Fetch only images belonging to the logged-in user
        cursor.execute(
            "SELECT id, email, input_image, masked_img, 2d_room_split_img, shape_generated_img, timestamp "
            "FROM user_input_image WHERE email = %s",
            (user_email,)
        )
        images = cursor.fetchall()

        image_list = []
        for image in images:
            image_list.append({
                "id": image['id'],
                "email": image['email'],
                "input_image": base64.b64encode(image['input_image']).decode("utf-8"),
                "masked_image": base64.b64encode(image['masked_img']).decode("utf-8"),
                "room_split_image": base64.b64encode(image['2d_room_split_img']).decode("utf-8"),
                "shape_generated_image": base64.b64encode(image['shape_generated_img']).decode("utf-8"),
                "timestamp": image['timestamp'],
            })

        return jsonify({"status": "success", "images": image_list}), 200

    except Exception as e:
        return jsonify({"error": f"Error fetching images: {str(e)}"}), 500

@app.route('/user-inputs', methods=['POST'])
@jwt_required()
def add_user_inputs():
    data = request.json
    email = get_jwt_identity()  
    number_of_room = data.get("number_of_room")
    land_width = data.get("land_width")
    land_length = data.get("land_length")
    floor_angle = data.get("floor_angle")

    if not all([number_of_room, land_width, land_length, floor_angle, email]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        conn = db_connection()
        cursor = conn.cursor()
        sql = """INSERT INTO user_input (number_of_room, land_width, land_length, floor_angle, email) 
                 VALUES (%s, %s, %s, %s, %s)"""
        cursor.execute(sql, (number_of_room, land_width, land_length, floor_angle, email))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Property added successfully"}), 201
    except Exception as e:
        return jsonify({"error": "Failed to add Property Data", "details": str(e)}), 500


# @app.route('/generate-outline', methods=['POST'])
# def generate_3d_view():
#     try:
#         # Load the input image
#         input_image_path = "./generated_images/generated_room_split.png"  # Ensure this file exists in your Flask app directory
#         if not os.path.exists(input_image_path):
#             return jsonify({"error": "Input image not found"}), 404

#         image = cv2.imread(input_image_path)
#         if image is None:
#             return jsonify({"error": "Failed to load the input image"}), 400

#         # Convert the image to grayscale
#         gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

#         # Perform edge detection
#         edges = cv2.Canny(gray_image, threshold1=50, threshold2=150)

#         # Find contours
#         contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

#         # Create a blank canvas for the output
#         room_plan = np.ones_like(image) * 255

#         # Draw contours
#         for contour in contours:
#             epsilon = 0.02 * cv2.arcLength(contour, True)
#             approx = cv2.approxPolyDP(contour, epsilon, True)
#             cv2.drawContours(room_plan, [approx], -1, (0, 0, 0), thickness=2)

#         # Save the output image
#         output_path = "room_plan_with_black_outlines.png"
#         cv2.imwrite(output_path, room_plan)

#         # Send the output file to the client
#         return send_file(output_path, mimetype='image/png', as_attachment=True, download_name='room_plan_with_black_outlines.png')

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # if __name__ == '__main__':
# #     app.run(host="0.0.0.0", port=8081, debug=True)


# if __name__ == '__main__':
#     app.run(port=8081, debug=True)

# from flask import Flask, send_file, jsonify
# import os
# import cv2
# import numpy as np


# app = Flask(__name__)

# Define the path to the input and output files
ROOM_PLAN_IMAGE = 'room_plan_with_black_outlines.png'
OUTPUT_FOLDER = 'output_3d_models'

# Make sure the output folder exists
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Function to create a 3D wall mesh from a binary image
def create_3d_wall_mesh(binary_image, wall_height=10, wall_thickness=0.5):
    height, width = binary_image.shape
    wall_meshes = []

    # Iterate through the pixels of the binary image
    for y in range(height):
        for x in range(width):
            if binary_image[y, x] == 0:  # Black pixel indicates a wall
                # Create a cuboid for the wall pixel
                cuboid = o3d.geometry.TriangleMesh.create_box(
                    width=wall_thickness, height=wall_thickness, depth=wall_height
                )
                # Translate cuboid to its position
                cuboid.translate((x * wall_thickness, y * wall_thickness, 0))
                # Set a uniform gray color for the wall
                cuboid.paint_uniform_color([0.5, 0.5, 0.5])
                wall_meshes.append(cuboid)

    # Combine all cuboids into one mesh
    if wall_meshes:
        combined_mesh = wall_meshes[0]
        for mesh in wall_meshes[1:]:
            combined_mesh += mesh
        return combined_mesh
    else:
        print("No walls detected in the image.")
        return None

# Endpoint for generating 3D wall model from the room plan
@app.route('/generate-3d-view', methods=['GET'])
def generate_3d_view():
    try:
        # Load the binary image (room plan with black outlines)
        binary_image = cv2.imread(ROOM_PLAN_IMAGE, cv2.IMREAD_GRAYSCALE)
        if binary_image is None:
            return jsonify({"error": f"Failed to load image: {ROOM_PLAN_IMAGE}"}), 400

        # Generate 3D wall mesh
        wall_height = 6  # Default height in meters
        wall_thickness = 0.5  # Default thickness in meters
        wall_mesh = create_3d_wall_mesh(binary_image, wall_height, wall_thickness)

        # Save the 3D model as a .ply file
        if wall_mesh is not None:
            output_filename = os.path.splitext(ROOM_PLAN_IMAGE)[0] + "_3d_wall_model.ply"
            output_path = os.path.join(OUTPUT_FOLDER, output_filename)
            o3d.io.write_triangle_mesh(output_path, wall_mesh)

            # Return the 3D model file as a response
            return send_file(output_path, as_attachment=True, mimetype="model/x-ply")


        return jsonify({"error": "No walls detected in the image"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)
if __name__ == '__main__':
     app.run(port=8081, debug=True)
