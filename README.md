# Bingo Game - SvelteKit Project

## Description

**Bingo Game** is an interactive web application built with **Svelte**. It allows users to create, edit, and save their Bingo games with a customizable board size and their own set of words. The game board is generated with random word placement, and players can click on the fields to mark them as completed. The game also supports saving, editing, and deleting configurations, which are stored locally in the browser using localStorage.

## Features

- **Create Game**: Users can create a game with a custom board size and add words (one per line).
- **Save & Edit Games**: Games can be saved and later edited or deleted.
- **Interactive Board**: Players can click on the fields to mark them as completed.
- **Edit Words**: Users can add, edit, or remove words during game creation or editing.
- **Local Data Storage**: All saved games are stored in *localStorage*, allowing users to retrieve them after page reload.

## Installation

To run the project locally, follow the steps below:

1. **Install Node.js**:  
   If you don't have Node.js installed, download and install it from [nodejs.org](https://nodejs.org/).

2. **Clone the repository**:  
   Clone the repository to your local machine using Git:
   ```bash
   git clone https://github.com/Guliveer/Bingo-SvelteKit
   ```
3. **Install dependencies**:  
   Navigate to the project directory and install the necessary dependencies using npm:
   ```bash
   cd Bingo-SvelteKit
   npm install
   ```
4. **Run the application**:  
    Start the development server using the following command:
    ```bash
    npm run dev
    ```

You can also host the application on a live server (like [Vercel](https://vercel.com/docs/deployments/git/vercel-for-github) or [Netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/)) by following the deployment instructions for SvelteKit.