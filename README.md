# AI-Driven Floor Plan Generation for Architectural Design

## Overview
This project focuses on developing an **AI-based system** to automate floor plan generation, streamlining the architectural design process. Inspired by **Stanislas Chaillou's methodology**, we designed a workflow consisting of three key models:

- **Shape Detection Model**: Processes survey plans, detects plot boundaries, and generates suitable building footprints.
- **2D Floor Plan Generation Model**: Uses a **pix2pix GAN** to segment building footprints into functional room layouts.
- **3D Visualization Model** *(Future Scope)*: Converts the generated floor plans into interactive 3D views.

## Technologies Used
- **Deep Learning**: GAN-based architecture for floor plan generation.
- **Computer Vision**: Parcel map processing and shape recognition.
- **Dataset Development**: Custom-labeled dataset for accurate room segmentation.
- **Tech Stack**:
  - **Backend**: Python, Flask
  - **Frontend**: React.js
  - **Database**: MySQL
  - **AI Frameworks**: TensorFlow, OpenCV

## Key Achievements
- Successfully developed a dataset for **footprint-to-room-split generation**.
- Implemented and trained a **pix2pix GAN model** to generate room layouts.
- Selected among the **Top 10 Finalists** in a competitive exhibition.

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Python (>= 3.8)
- Node.js & npm (for frontend)
- MySQL (for database)
- TensorFlow & OpenCV
- Flask
- React.js

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/floor-plan-ai.git
   cd floor-plan-ai/backend
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Start the Flask server:
   ```sh
   python app.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## Usage
1. Upload a **survey plan** to detect plot boundaries and generate a footprint.
2. Run the **2D Floor Plan Generator** to split the footprint into rooms.
3. *(Future Scope)* Visualize the floor plan in **3D**.

## Future Improvements
- Enhancing dataset diversity for better model training.
- Improving the **GAN model** for more precise room segmentation.
- Implementing a **3D visualization module** for immersive architectural design.

## Contributing
Contributions are welcome! Feel free to submit a pull request or report issues.

## License
This project is licensed under the **MIT License**.

## Contact
For any inquiries, reach out to **[Viraj Bandara]** at **virajbandara138@gmail.com**.

## Team Members
Randilu Lindapitya - Team Leader
Manjitha Abeysinghe - Member
Chathurika Bandaranayake - Member
Niluka Kaluwelgoda - Member

---

⭐ **If you like this project, don't forget to star this repository!** ⭐
