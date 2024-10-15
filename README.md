# Connect Application
=====================================

Welcome to the **Connect** Application! This full-stack project combines a **Hono backend** (deployed on Cloudflare Workers) and a **React frontend** (using Vite, deployed on Vercel). Below ar# 🌐 Connect Application

Welcome to the **Connect** Application! This project aims to connect students within a college, providing a platform for collaboration, communication, and networking. It combines a **Hono backend** (deployed on Cloudflare Workers) and a **React frontend** (using Vite, deployed on Vercel). Below are the deployed URLs and step-by-step setup instructions for both the backend and frontend.

---

## 🚀 Deployed URLs

- **Frontend (React)**: [Connect Frontend - Vercel](https://connect-intern-final-project.vercel.app)
- **Backend (Hono)**: [Connect Backend - Cloudflare Workers](https://connectapi.tharanitharan-n2022cse.workers.dev)

---

## 📁 Project Structure

```plaintext
├── connectbackend/      # Backend (Hono + Cloudflare)
└── connectfrontend/     # Frontend (React + Vite)

This application is separated into two directories:

Backend: Contains the Hono framework-based backend connected to a Cloudflare D1 database.
Frontend: Contains the React frontend built using Vite.
🛠️ Backend (Hono)
The backend is built using Hono, a fast and lightweight framework, and is deployed on Cloudflare Workers. It manages authentication, data storage, and communication with the Cloudflare D1 database.

📋 Step-by-Step Setup Instructions (Backend)
Clone the repository and navigate to the connectbackend directory:

bash
Copy code
git clone https://github.com/your-repo-url.git
cd connectbackend
Install the dependencies:

bash
Copy code
npm install
Run the backend locally:

bash
Copy code
npm run dev
Cloudflare Deployment:

Ensure you have Cloudflare Workers and D1 database set up in your Cloudflare account.

Deploy using Cloudflare Wrangler:

bash
Copy code
wrangler publish
🌐 Frontend (React with Vite)
The frontend is built using React and Vite, which ensures a fast development process and optimized builds. The frontend communicates with the backend via API calls.

📋 Step-by-Step Setup Instructions (Frontend)
Navigate to the connectfrontend directory:

bash
Copy code
cd connectfrontend
Install the dependencies:

bash
Copy code
npm install
Run the frontend locally:

bash
Copy code
npm run dev
Build for production:

bash
Copy code
npm run build
Deploy to Vercel:

Push the frontend folder to a GitHub repository and connect it to your Vercel account for automatic deployment.

Alternatively, use the Vercel CLI:

bash
Copy code
vercel deploy
⚙️ Tech Stack
Backend: Hono running on Cloudflare Workers
Database: Cloudflare D1
Frontend: React with Vite
Deployment: Backend on Cloudflare Workers and Frontend on Vercel
📜 Scripts Overview
Backend (Hono)
npm run dev: Starts the Hono backend in development mode.
wrangler publish: Deploys the backend to Cloudflare Workers.
Frontend (React)
npm run dev: Starts the Vite development server for the React frontend.
npm run build: Builds the frontend for production.
vercel deploy: Deploys the frontend to Vercel.
🚀 Quick Start Guide
To get the application up and running locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/your-repo-url.git
Backend: Set up the Hono backend by following the instructions in the connectbackend directory.

Frontend: Set up the React frontend by following the instructions in the connectfrontend directory.

📚 Additional Resources
Hono Documentation
Vite Documentation
Cloudflare Workers
Vercel Deployment

