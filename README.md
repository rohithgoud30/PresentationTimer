# Presentation Timer ⏱️

A sleek and responsive countdown timer built using **React, Vite, Tailwind CSS, and Framer Motion**. This timer provides audio and visual alerts at key checkpoints (5 minutes, 3 minutes, and 1 minute remaining). Perfect for presentations, talks, or timed events!

---

## **Live Demo 🌐**

Use the app directly here:  
👉 [Presentation Timer](https://rohithgoud30.github.io/PresentationTimer)

---

## **Features 🚀**

- **Custom Countdown Timer**: Starts a countdown of 8 minutes with pause, reset, and resume controls.
- **Audio Alerts**: Notifications at key checkpoints: 5 minutes, 3 minutes, and 1 minute remaining.
- **Visual Alerts**: Full-screen messages and animations at key checkpoints.
- **Mute Option**: Toggle audio on or off.
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices.

---

## **Installation ⚙️**

Follow these steps to run the project locally:

### 1. **Clone the Repository**

```bash
git clone https://github.com/rohithgoud30/PresentationTimer.git
cd PresentationTimer
```

### 2. **Install Dependencies**

Ensure you have Node.js installed, then run:

```bash
npm install
```

### 3. **Run the App Locally**

Start the development server with:

```bash
npm run dev
```

Open your browser and navigate to:

```
http://localhost:5173
```

---

## **Build and Deploy 🛠️**

To create a production build:

```bash
npm run build
```

This generates a `dist/` folder with optimized static files.

To deploy on GitHub Pages:

```bash
npm run deploy
```

---

## **Folder Structure 📁**

Here's an overview of the project structure:

```plaintext
PresentationTimer/
├── public/                # Static assets
│   ├── 1_min_alert.mp3    # Audio for 1-minute alert
│   ├── 3_min_alert.mp3    # Audio for 3-minute alert
│   ├── 5_min_alert.mp3    # Audio for 5-minute alert
│   └── vite.svg           # Vite logo
├── src/                   # Source files
│   ├── components/        # Timer component
│   │   └── Timer.jsx      # Timer logic and UI
│   ├── App.jsx            # Main app entry
│   ├── index.css          # Global CSS
│   └── main.jsx           # React root entry
├── .gitignore             # Ignore files for Git
├── package.json           # Project configuration
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

---

## **Technologies Used 🛠️**

- **Vite**: Fast build tool for modern JavaScript apps.
- **React**: Front-end library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Framer Motion**: Animations and transitions.
- **React Icons**: Icon library for React.

---

## **How to Use 🧑‍💻**

1. Visit the live demo [here](https://rohithgoud30.github.io/PresentationTimer).
2. Click the **Play** button to start the 8-minute timer.
3. Visual and audio alerts will trigger at:
   - **5 minutes remaining**
   - **3 minutes remaining**
   - **1 minute remaining**
4. Use the **Pause**, **Reset**, and **Mute** buttons as needed.

---

## **Contributing 🤝**

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request on GitHub.

---

## **License 📜**

This project is licensed under the [MIT License](LICENSE).

---

## **Contact 💬**

For questions or feedback, feel free to reach out:

- **Name**: Rohith Goud Panjala  
- **GitHub**: [rohithgoud30](https://github.com/rohithgoud30)
