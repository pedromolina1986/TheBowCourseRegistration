TheBowCourseRegistration

A modern web application built with React, Vite, and Tailwind CSS for managing course registrations at Bow Valley. This project provides a responsive front-end interface leveraging Tailwind CSS utility classes, optimized with Vite for fast development.

Table of Contents

Features

Technologies

Project Structure

Setup & Installation

Available Scripts

Folder Structure

Contributing

License

Features

Register for courses through a clean, modern interface

View registered courses and course details

Responsive design powered by Tailwind CSS

Fast development and hot module replacement with Vite

Technologies

React 18 – UI library

Vite – Build tool and development server

Tailwind CSS 3+ – Utility-first CSS framework

JavaScript / JSX – Frontend logic

Node.js & npm – Package management

Project Structure
TheBowCourseRegistration/
├─ node_modules/          # Installed dependencies
├─ public/                # Static assets (favicon, images)
├─ src/
│  ├─ assets/             # Images and media
│  ├─ components/         # Reusable React components
│  ├─ App.jsx             # Main App component
│  ├─ index.css           # Tailwind directives
│  └─ main.jsx            # React entry point
├─ package.json
├─ tailwind.config.js     # Tailwind CSS configuration
├─ vite.config.js         # Vite configuration
└─ README.md

Setup & Installation

Clone the repository:

git clone https://github.com/yourusername/TheBowCourseRegistration.git
cd TheBowCourseRegistration


Install dependencies:

npm install


Run the development server:

npm run dev


Open your browser at http://localhost:5173

Available Scripts

npm run dev – Start the development server with hot reload

npm run build – Build the production-ready app

npm run preview – Preview the production build locally

Folder Structure

src/components/ – Contains reusable UI components

src/assets/ – Images, icons, and other media

src/App.jsx – Main React component

src/main.jsx – Entry point that renders <App /> and imports Tailwind CSS

Contributing

Fork the repository

Create a new branch: git checkout -b feature-name

Make your changes and commit: git commit -m "Description"

Push to your branch: git push origin feature-name

Open a Pull Request

License

This project is licensed under the MIT License.