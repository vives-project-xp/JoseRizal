# José Rizal Walk 🚶‍♂️🇵🇭

[![Stars](https://img.shields.io/github/stars/LynnDelaere/JoseRizal?style=flat&label=Stars)](https://github.com/LynnDelaere/JoseRizal/stargazers)

[![Forks](https://img.shields.io/github/forks/LynnDelaere/JoseRizal?style=flat&label=Forks)](https://github.com/LynnDelaere/JoseRizal/network)

[![License](https://img.shields.io/github/license/LynnDelaere/JoseRizal?style=flat)](https://chatgpt.com/c/LICENSE)

[![Vue](https://img.shields.io/badge/Frontend-Vue.js-4fc08d.svg)](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231)

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231)

[![Docker](https://img.shields.io/badge/Container-Docker-blue.svg)](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231)

Live Demo: [https://joserizal.devbitapp.be/](https://joserizal.devbitapp.be/)

---

## 📖 Table of Contents

1. [Project Overview](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#project-overview)
2. [Features](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#features)
3. [Architecture &amp; Folder Structure](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#architecture--folder-structure)
4. [Tech Stack](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#tech-stack)
5. [Prerequisites](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#prerequisites)
6. [Installation &amp; Setup](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#installation--setup)
   * [Environment Variables](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#environment-variables)
   * [Local Development (Without Docker)](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#local-development-without-docker)
   * [Using Docker Compose](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#using-docker-compose)
7. [Running the App](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#running-the-app)
   * [Backend API Docs](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#backend-api-docs)
   * [Frontend](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#frontend)
   * [Admin Dashboard](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#admin-dashboard)
8. [Future Roadmap](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#future-roadmap)
9. [Contributing](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#contributing)
10. [License](https://chatgpt.com/c/6825b410-85e8-8001-b706-15ea25b8e231#license)

---

## 🚀 Project Overview

José Rizal Walk is an interactive, multilingual web application that brings to life the biography and legacy of Dr. José Protacio Rizal Mercado y Alonso Realonda—a national hero of the Philippines. Through a virtual timeline, immersive AR exhibits, quizzes, and multimedia content, learners can explore key chapters of Rizal’s life in a rich, engaging format.

---

## ✨ Features

* **Interactive Timeline**

  Users navigate chronological “chapters” highlighting Rizal’s life events and writings.
* **Virtual Exhibits**

  3D models and AR overlays of historical artifacts (e.g., manuscripts, personal items).
* **Quizzes & Activities**

  Knowledge checks at the end of each chapter, with social‐sharing of scores.
* **Multilingual Support**

  English, Tagalog, and (extendable) languages.
* **Admin Dashboard**

  CRUD interface for content managers to add/edit chapters, quizzes, and media.
* **Accessibility**

  Keyboard navigation, screen‐reader labels, high‐contrast mode.

---

## 🏗 Architecture & Folder Structure

```
.
├── docs/                      # Project documentation
├── admin_frontend/            # Vue.js admin dashboard
├── joserizalapp/              # Vue.js public‐facing frontend
├── backend/                   # FastAPI + PostgreSQL API
│   ├── app/
│   ├── migrations/
│   └── tests/
├── .env.template              # Example environment variables
├── compose.yaml               # Docker Compose orchestration
├── How to running backend...  # Word doc with backend setup
└── LICENSE
```

---

## 🛠 Tech Stack

| Layer            | Technology                       |
| ---------------- | -------------------------------- |
| Frontend         | Vue 3, Vue Router, Pinia         |
| Admin UI         | Vue 3, Vuetify                   |
| Backend API      | Python 3.11, FastAPI, SQLAlchemy |
| Database         | PostgreSQL 15                    |
| Auth             | bcrypt, PyJWT                    |
| Containerization | Docker & Docker Compose          |

---

## 🔧 Prerequisites

* **Node.js** ≥ v18
* **Python** ≥ 3.11
* **Docker** & **Docker Compose** (optional but recommended)
* **Git**

---

## ⚙️ Installation & Setup

### Environment Variables

Copy and edit `.env.template` in both `backend/` and frontends (if needed):

```bash
cp .env.template .env
```

Populate:

```dotenv
# backend/.env
POSTGRES_HOST=your_db_host
POSTGRES_PORT=5432
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=joserizal
JWT_SECRET_KEY=supersecret
```

### Local Development (Without Docker)

1. **Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   alembic upgrade head
   uvicorn app.main:app --reload
   ```
2. **Frontends**
   ```bash
   cd joserizalapp
   npm install
   npm run dev
   # In another terminal:
   cd ../admin_frontend
   npm install
   npm run dev
   ```

### Using Docker Compose

```bash
git clone https://github.com/LynnDelaere/JoseRizal.git
cd JoseRizal
docker compose up --build -d
```

---

## ▶️ Running the App

### Backend API Docs

Swagger / Redoc: [http://localhost:8000/docs](http://localhost:8000/docs)

### Frontend

User‐facing site: [http://localhost:5173](http://localhost:5173/)

### Admin Dashboard

Content manager UI: [http://localhost:5174](http://localhost:5174/)

---

## 🛣 Future Roadmap

* 📱 Mobile app (React Native / Flutter)
* 🔍 Full-text search of Rizal’s writings
* 🌐 Add more languages (e.g., Spanish, German)
* 🤝 Collaboration with historians for peer-reviewed content
* 🔬 Advanced AR experiences on mobile devices

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/XYZ`)
3. Commit your changes (`git commit -m "feat: add XYZ"`)
4. Push to your branch (`git push origin feature/XYZ`)
5. Open a Pull Request — ensure all tests pass and add descriptive details.

Please see [CONTRIBUTING.md](https://chatgpt.com/c/docs/CONTRIBUTING.md) for full guidelines.

---

## 📜 License

This project is licensed under the  **MIT License** .

See [LICENSE](https://chatgpt.com/c/LICENSE) for full text.

---

*Built with ❤️ as part of the Erasmus+ Blended Intensive Program.*
