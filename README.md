# Systems Knowledge Prep

A minimalist MCQ (Multiple Choice Question) web application for systems knowledge preparation, styled like LeetCode.

## Features

- Dark theme with LeetCode-inspired design
- Question bank with filtering and search
- Difficulty-based organization (Easy, Medium, Hard)
- Detailed explanations for each question
- Progress tracking with localStorage
- Responsive design

## Local Development

Simply open `index.html` in your web browser, or use a local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

## Adding Questions

Questions are stored in `questions-data.js`. To add new questions, add objects to the `questions` array following this format:

```javascript
{
  "id": 16,
  "difficulty": "medium",
  "question": "Your question here?",
  "options": [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4"
  ],
  "correct": 0,
  "explanation": "Detailed explanation here..."
}
```

## Deployment

This is a static site that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Simply upload all files to your hosting service.

