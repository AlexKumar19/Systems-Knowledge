# Question Format Guide

This document describes the JSON format for adding questions to the Systems Knowledge Prep application.

## JSON Structure

All questions are stored in `questions.json` with the following structure:

```json
{
  "questions": [
    {
      "id": 1,
      "difficulty": "easy",
      "question": "Your question text here?",
      "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
      ],
      "correct": 0,
      "explanation": "Detailed explanation of why the correct answer is correct and why other options are incorrect."
    }
  ]
}
```

## Field Descriptions

- **id**: Unique identifier for the question (integer)
- **difficulty**: Must be one of: `"easy"`, `"medium"`, or `"hard"` (string)
- **question**: The question text (string)
- **options**: Array of exactly 4 answer options (array of strings)
- **correct**: Index of the correct answer (0-3, integer)
- **explanation**: Detailed explanation that helps users understand the concept (string)

## Example Question

```json
{
  "id": 16,
  "difficulty": "medium",
  "question": "What is the time complexity of quicksort in the average case?",
  "options": [
    "O(n log n)",
    "O(n²)",
    "O(n)",
    "O(log n)"
  ],
  "correct": 0,
  "explanation": "Quicksort has an average-case time complexity of O(n log n). In the average case, the pivot divides the array into roughly equal halves, leading to log n levels of recursion, with O(n) work at each level. The worst-case complexity is O(n²) when the pivot is always the smallest or largest element."
}
```

## Adding Questions

Simply add new question objects to the `questions` array in `questions.json`. The ID should be unique and incrementing. Questions will automatically appear in the table view and be filterable by difficulty.

## Tips for LLM Generation

When asking an LLM to generate questions, you can use this prompt format:

```
Generate a [difficulty] difficulty systems knowledge question with:
- A clear, concise question
- 4 multiple choice options (one correct, three plausible distractors)
- A detailed explanation that teaches the concept

Format as JSON matching the structure above.
```

