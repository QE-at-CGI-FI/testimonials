# testimonials

Oh my, there should be an app for this - encouraging people to write not only feedback out of a training session, but testimonials of their experience. This repo is for discovering what it would be.

## Testimonials App

A simple web application for collecting anonymous testimonials and star ratings for the Vibe Coding course.

### Features

- Anonymous submissions (no names or emails collected)
- 5-star rating system for the course
- Text testimonials about what people built with vibe coding
- Local storage for data persistence
- Responsive design
- Export testimonials to JSON file
- Import testimonials from JSON file
- Shows "No testimonials yet" message when empty

### Files

- `index.html` - Main HTML page
- `style.css` - Styling
- `script.js` - JavaScript functionality

### How to Use

1. Open `index.html` in a web browser
2. Select a star rating for the course
3. Enter your testimonial in the text area
4. Click "Submit Testimonial"
5. View all testimonials below the form (shows "No testimonials yet" until you add your first one)
6. Export testimonials to a JSON file using the "Export Testimonials" button
7. Import testimonials from a JSON file using the "Import Testimonials" button

All data is stored locally in the browser's localStorage.


# Getting started

Install playwright
`npm init playwright@latest`

Install agents
`npx playwright init-agents --loop=vscode`
