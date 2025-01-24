# QuizSphere

## Overview

QuizSphere provides an interactive and engaging experience for users to test their knowledge on various topics. The app seamlessly guides users through the quiz-taking process, from authenticating their account to viewing their final quiz results. Designed with a focus on user experience, it ensures smooth navigation and meaningful feedback at every stage. The backend leverages the efficiency of ExpressJS and the flexibility of EJS templates for dynamic rendering, creating a responsive and reliable platform.

## App Features:
- Login page allows returning users to gain access to their profile and be directed to the home page
- Signup page that guides first time users to create their account and proceed to login
- Home page that displays the app's entry point, purpose, engagement and navigation for users
- Quiz page encompasses the user interaction with quiz questions, progression and answer feedback
- Results page accounts for the users overall performance and encourages them to retry quiz
- MongoDB data to store user information as well as their play history 
- Server side rendering using ExpressJS framework for NodeJS and EJS templating language
  
## Technologies Used:

- **HTML**: Markup language for structuring the web pages.
- **CSS**: Styling language to design and layout the web pages.
- **JavaScript**: Programming language used for client-side and server-side logic.
- **Node.js**: JavaScript runtime for executing server-side code.
- **Express.js**: Web application framework for Node.js to handle routing and server setup.
- **EJS**: Templating engine used for rendering dynamic content on the web pages.

## Video Walkthrough:


## Participating Team Members:

Samiha Zaman, Reiad Sakoor, Bhupendra Pariyar, Mani Azem

## Team Roles:

**Samiha: Backend Developer**
- Implemented backend functionality for the Quiz Page, such as developing JavaScript logic to fetch questions from a JSON file and handle user interactions with answer selection and feedback.
- Handled dynamic rendering of quiz data using EJS templates.

**Reiad: Login and Signup Pages**
- Implemented the frontend display with flexbox structure, form handling and dynamic color range
- Developed the backend functionality by initializing routers with form post/get requests, implemented crypto password hashing, stored user information in MongoDB and ensured error handling

**Bhupendra: Results page,Leaderboard and Players history**

- On the frontend, it uses EJS to display the user’s score and a leaderboard, with buttons to restart or end the quiz handled by JavaScript.
- On the backend, it processes scores via Express, updates an in-memory leaderboard, sorts it, and limits it to the top 10 before rendering the results. This integrates templating, routing, and state management for an interactive experience.
- Worked on players history record so when they login they can see their past scores.

**Mani: Backend and Server side**

- Configured core server setup in app.js, integrating middleware for logging, parsing, cookies, and static files.
- Set up the EJS view engine and defined routes (/, /quiz, /results).
- Implemented error handling for smooth operation and reliability.

## How to Run the Server

Follow these steps to set up and run the quiz app on your local machine:

## Prerequisites
- Node.js installed on your computer.
- A package manager like npm (comes with Node.js)

## Installation

1. **Clone the Repository**

```bash
git clone <repository-url>
cd <project-directory>
```
2. **Install Dependencies**

```bash
npm install
```

## Running the Server

1. **Start the server by running:**

```bash
npm start or nodemon start
```

2. **Open your web browser and navigate to:**

```bash
http://localhost:3000/
```
