# José Rizal walk
## Table of Contents
- [Introduction](#introduction)
- [Project Description](#project-description)
- [Project Objectives](#project-objectives)
- [Project features](#project-features)
  - [Core Features](#core-features)
  - [Additional Features](#additional-features)
- [Technological Stack](#technological-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Future improvements](#future-improvements)
- [Contributors](#contributors)
- [License](#license)

## Introduction
The José Rizal walk is an interactive application designed to educate users about the life and works of José Rizal, a national hero of the Philippines. It provides an engaging way to explore his contributions and legacy through a virtual experience.

## Project Description
This project aims to create a virtual tour that highlights key moments in José Rizal's life. Users can navigate through various chapters of his story, interact with historical artifacts, and gain insights into his influence on Philippine history. The application is built with modern web technologies to ensure a seamless and immersive experience.

## Project Objectives
- To promote awareness of José Rizal's life and works.
- To provide an educational platform for students and history enthusiasts.
- To utilize technology to preserve and share cultural heritage.

## Project features
### Core Features
- Interactive timeline of José Rizal's life.
- Virtual exhibits of historical artifacts.
- Quizzes and activities to test knowledge about José Rizal.
- Multilingual support for a wider audience.

### Additional Features
- Integration with social media for sharing achievements.
- Augmented reality (AR) support for enhanced interactivity.
- Accessibility features for users with disabilities.

## Technological Stack
- **Frontend:** vue.js, 
- **Backend:** FastAPI, PostgreSQL
- **Containerization:** Docker
- **Authentication:** bcrypt, pyjwt
- **Version Control:** Git

## Installation
### Using Docker
1. Ensure you have Docker installed on your system. You can download it from [Docker's official website](https://www.docker.com/).
2. Clone the repository:
   ```bash
   git clone <repository-url>
   cd JoseRizal
   ```
3. Build the Docker image:
   ```bash
   docker compose up --build .
   ```
4. Access the application in your browser at `http://localhost:8000/docs`.

## Usage
1. Launch the application using Docker or by running the backend and frontend servers locally.
2. Navigate to the homepage to start exploring the timeline of José Rizal's life.
3. Use the navigation menu to access different sections, such as virtual exhibits and quizzes.
4. Follow the instructions provided in each section to interact with the content.

## Future improvements
- Add more historical content and artifacts.
- Implement a mobile application version.
- Enhance AR features for a more immersive experience.
- Collaborate with historians for content accuracy.

## Contributors
- [Your Name] - Project Lead
- [Contributor Name] - Backend Developer
- [Contributor Name] - Frontend Developer
- [Contributor Name] - UI/UX Designer

## License
This project is licensed under the MIT License. See the LICENSE file for details.

