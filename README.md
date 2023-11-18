# Snake Game with Voice Control

Welcome to the Snake Game with Voice Control! 🐍🗣️

## Overview

This project combines the classic Snake game with voice control using TensorFlow's Speech Commands. You can control the movement of the snake by speaking specific commands.

## How to Play

1. **Setup:**

   - Clone this repository.
   - Install dependencies using `npm install`.
   - Run the application with `npm run dev`.

2. **Game Rules:**

   - The snake starts at the center of the grid.
   - Your goal is to eat the apples to grow the snake and earn points.
   - Avoid colliding with the snake's own body or the game boundaries.

3. **Voice Commands:**

   - Press the "Press to speak" button to start voice recognition.
   - Use voice commands to control the snake:
     - **"up"** - Move the snake up.
     - **"down"** - Move the snake down.
     - **"left"** - Move the snake left.
     - **"right"** - Move the snake right.
     - **"stop"** - Stop the game and end voice recognition.

4. **Scoring:**
   - Each apple eaten increases your score.
   - The game ends if the snake collides with itself or the game boundaries.

## Technologies Used

- React with Vite: Frontend framework for building the user interface together with the fastest local development server.
- TensorFlow.js: Machine learning library for voice command recognition.
- Web Speech API: Enables voice recognition in the browser.

## Project Structure

- **App.jsx:**

  - React component that integrates the Snake game and voice control logic.

- **Field.jsx:**
  - React component representing a single grid cell in the game.

## Voice Commands Tips

- Speak clearly and loudly for better recognition.
- Use the provided voice commands: "up," "down," "left," "right," and "stop."

Enjoy playing the Snake Game with Voice Control! 🎮🔊
