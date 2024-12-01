# 🎨🧮 SketchSolveAI  
Welcome to **SketchSolveAI** – an AI-powered interactive calculator that brings your hand-drawn mathematical expressions to life! Draw equations and problems directly on the canvas, and let our AI interpret and solve them for you. Perfect for students, educators, and anyone who loves the blend of art and mathematics.

![SketchSolveAI Banner](https://your-image-url.com/banner.png)

---

## 🚀 Live Demo  
- **[Live Demo](#)**  
- **[Video Walkthrough](#)**  

---

## 🌟 Features  
- **Interactive Canvas Drawing**: Sketch mathematical expressions with ease.  
- **AI Interpretation**: Leverages advanced AI models to interpret and solve hand-drawn inputs.  
- **Dynamic Equation Rendering**: Visualize solutions with beautifully rendered equations using MathJax.  
- **Draggable Results**: Move and organize your results anywhere on the screen.  
- **Customizable Colors**: Choose from a palette of colors to draw your expressions.  
- **Responsive Design**: Optimized for both desktop and mobile devices.  
- **Fast Calculations**: Real-time processing for instant feedback.  

---

## 🛠 Tech Stack  

### **Frontend**  
- **React.js with TypeScript**: Robust and type-safe user interface.  
- **Vite**: Fast and efficient bundling and development.  
- **Tailwind CSS**: Utility-first CSS for rapid styling.  
- **React Draggable**: Enables draggable result components.  
- **Axios**: Handles HTTP requests to the backend.  
- **MathJax**: Beautiful rendering of mathematical notation.  

### **Backend**  
- **FastAPI**: High-performance web framework for building APIs.  
- **Python 3.x**: Backend logic and integration.  
- **Gemini 1.5 Flash API**: AI model for interpreting and solving mathematical expressions.  
- **Uvicorn**: ASGI server for FastAPI.  

---

## 📋 Requirements  
- **Node.js**: >= 14.x  
- **Python**: >= 3.7  
- **Virtual Environment**: Recommended for Python dependencies.  

---

## 🔧 Installation  

### **Clone the Repository**  
```bash
git clone https://github.com/yourusername/SketchSolveAI.git
cd SketchSolveAI
```

### **Setup the Frontend**  
1. Navigate to the frontend directory:  
   ```bash
   cd SketchSolveAI
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Create an `.env.local` file:  
   ```bash
   touch .env.local
   ```  
   Add the following environment variable:  
   ```env
   VITE_API_URL=http://localhost:8900
   ```
4. Start the development server:  
   ```bash
   npm run dev
   ```

### **Setup the Backend**  
1. Navigate to the backend directory:  
   ```bash
   cd SketchSolveAI_backend
   ```
2. Create and activate a virtual environment:  
   ```bash
   python -m venv SketchSolve_venv
   source SketchSolve_venv/bin/activate  # On Windows: SketchSolve_venv\Scripts\activate
   ```
3. Install dependencies:  
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables. Create a `.env` file:  
   ```bash
   touch .env
   ```  
   Add your Gemini API key:  
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
5. Start the backend server:  
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8900
   ```

---

## 🎮 Usage  
1. Open your browser and navigate to `http://localhost:5173`.  
2. Choose a color from the palette.  
3. Sketch your mathematical expression on the canvas.  
4. Click the **Calculate** button.  
5. Watch as your expression is interpreted, and the solution is displayed!  

---

## 📷 Screenshots  
![Drawing an Equation](https://your-image-url.com/screenshot1.png)  
*Drawing an equation on the canvas.*  

![Calculated Result](https://your-image-url.com/screenshot2.png)  
*AI-generated solution displayed on the screen.*  

---

## 🤖 How It Works  

1. **User Input**: Drawn on an HTML5 canvas element.  
2. **Data Capture**: Canvas image is converted to a base64 string and sent to the backend.  
3. **AI Processing**: Backend forwards the image to the Gemini 1.5 Flash API.  
4. **Result Rendering**: The interpreted expression and solution are sent back to the frontend and rendered using MathJax.  

---

## 🌐 API Reference  

**Endpoint**: `POST /calculate`  
- **Request Body**:  
  ```json
  {
    "image": "data:image/png;base64,...",
    "dict_of_vars": {}
  }
  ```
- **Response**:  
  ```json
  {
    "expr": "2 + 3 =",
    "result": "5",
    "assign": false
  }
  ```

---

## 🧑‍💻 Skills Demonstrated  
- Full-Stack Development: Proficient in both frontend and backend development.
- API Integration: Seamless integration with external AI services.
- TypeScript: Strong typing for robust React applications.
- Performance Optimization: Efficient rendering and state management.
- UI/UX Design: Creating intuitive and interactive user experiences.
- Error Handling: Graceful handling of exceptions and user feedback.
- DevOps: Running and managing development servers and environments.

---

## 📂 Project Structure  
```plaintext
SketchSolveAI/
├── SketchSolveAI/         # Frontend React application
├── SketchSolveAI_backend/ # Backend FastAPI application
├── SketchSolve_venv/      # Python virtual environment
├── README.md
└── ...
```

---

## 📝 License  
This project is licensed under the [MIT License](LICENSE).  

---

## 🤝 Contributing  

Contributions are welcome! Here's how you can help:  
1. Fork the repository.  
2. Create your Feature Branch:  
   ```bash
   git checkout -b feature/YourFeature
   ```  
3. Commit your changes:  
   ```bash
   git commit -m 'Add YourFeature'
   ```  
4. Push to the branch:  
   ```bash
   git push origin feature/YourFeature
   ```  
5. Open a Pull Request.  

---

## 📫 Contact  

**Your Name**  
- **Email**: [fcb.satadrud10s@gmail.com](mailto:fcb.satadrud10s@gmail.com)  
- **LinkedIn**: [Satadru Bhowmik](https://www.linkedin.com/in/satadru-bhowmik-082179239/)  
- **GitHub**: [sagacious-satadru](https://github.com/sagacious-satadru)  

---

Thank you for checking out **SketchSolveAI**! If you find this project interesting, please give it a star ⭐.
```

