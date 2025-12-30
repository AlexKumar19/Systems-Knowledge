// Application state
let allQuestions = [];
let filteredQuestions = [];
let currentQuestion = null;
let currentQuestionIndex = -1;
let selectedAnswer = null;

// DOM elements
const menuView = document.getElementById('menu-view');
const questionsView = document.getElementById('questions-view');
const navButtons = document.querySelectorAll('.nav-btn');
const questionsTableBody = document.getElementById('questions-table-body');
const searchInput = document.getElementById('search-input');
const difficultyFilter = document.getElementById('difficulty-filter');
const questionCountDisplay = document.getElementById('question-count-display');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionNumber = document.getElementById('question-number');
const currentDifficultyBadge = document.getElementById('current-difficulty');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const explanationContainer = document.getElementById('explanation-container');
const explanationText = document.getElementById('explanation-text');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadQuestions();
    setupEventListeners();
    renderQuestionsTable();
});

// Load questions from JavaScript data file
function loadQuestions() {
    if (typeof questionsData !== 'undefined' && questionsData.questions) {
        allQuestions = questionsData.questions;
        filteredQuestions = [...allQuestions];
    } else {
        console.error('Questions data not found. Please ensure questions-data.js is loaded.');
        alert('Failed to load questions. Please ensure questions-data.js exists.');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            switchView(view);
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Search and filter
    searchInput.addEventListener('input', () => {
        filterQuestions();
    });

    difficultyFilter.addEventListener('change', () => {
        filterQuestions();
    });

    // Question navigation
    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < filteredQuestions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    });

    backBtn.addEventListener('click', () => {
        switchView('menu');
        navButtons.forEach(b => {
            b.classList.remove('active');
            if (b.dataset.view === 'menu') b.classList.add('active');
        });
        // Re-filter to show all questions when going back
        filteredQuestions = [...allQuestions];
        renderQuestionsTable();
    });
}

// Filter questions based on search and difficulty
function filterQuestions() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const difficulty = difficultyFilter.value;

    filteredQuestions = allQuestions.filter(q => {
        const matchesSearch = searchTerm === '' || 
            q.question.toLowerCase().includes(searchTerm) ||
            q.id.toString().includes(searchTerm);
        const matchesDifficulty = difficulty === 'all' || q.difficulty === difficulty;
        return matchesSearch && matchesDifficulty;
    });

    renderQuestionsTable();
}

// Render questions table
function renderQuestionsTable() {
    questionsTableBody.innerHTML = '';

    if (filteredQuestions.length === 0) {
        questionsTableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    No questions found matching your criteria.
                </td>
            </tr>
        `;
        questionCountDisplay.textContent = 'Showing 0 questions';
        return;
    }

    filteredQuestions.forEach((question, index) => {
        const row = document.createElement('tr');
        const preview = question.question.length > 80 
            ? question.question.substring(0, 80) + '...' 
            : question.question;

        row.innerHTML = `
            <td>${question.id}</td>
            <td class="question-preview" title="${question.question}">${preview}</td>
            <td>
                <span class="table-difficulty-badge ${question.difficulty}">${question.difficulty}</span>
            </td>
            <td>
                <button class="table-action-btn" onclick="startQuestion(${index})">Start</button>
            </td>
        `;
        questionsTableBody.appendChild(row);
    });

    questionCountDisplay.textContent = `Showing ${filteredQuestions.length} of ${allQuestions.length} questions`;
}

// Start a specific question
function startQuestion(index) {
    currentQuestionIndex = index;
    currentQuestion = filteredQuestions[index];
    selectedAnswer = null;
    
    switchView('questions');
    navButtons.forEach(b => {
        b.classList.remove('active');
        if (b.dataset.view === 'questions') b.classList.add('active');
    });
    
    loadQuestion();
}

// Switch between views
function switchView(view) {
    if (view === 'menu') {
        menuView.classList.add('active');
        questionsView.classList.remove('active');
    } else if (view === 'questions') {
        menuView.classList.remove('active');
        questionsView.classList.add('active');
    }
}

// Load current question
function loadQuestion() {
    if (!currentQuestion || filteredQuestions.length === 0) return;
    
    // Update question text
    questionText.textContent = currentQuestion.question;
    
    // Update question number
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${filteredQuestions.length}`;
    
    // Update difficulty badge
    currentDifficultyBadge.textContent = currentQuestion.difficulty;
    currentDifficultyBadge.className = `difficulty-badge ${currentQuestion.difficulty}`;
    
    // Clear and populate options
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        
        optionElement.addEventListener('click', () => {
            selectOption(index, optionElement);
        });
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === filteredQuestions.length - 1;
    
    // Hide explanation initially
    explanationContainer.style.display = 'none';
    
    // Reset selected answer for new question
    selectedAnswer = null;
}

// Handle option selection
function selectOption(index, element) {
    // Remove previous selection
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Mark selected option
    element.classList.add('selected');
    selectedAnswer = index;
    
    // Show correct/incorrect feedback
    const options = document.querySelectorAll('.option');
    options[currentQuestion.correct].classList.add('correct');
    
    if (index !== currentQuestion.correct) {
        element.classList.add('incorrect');
    }
    
    // Show explanation
    if (currentQuestion.explanation) {
        explanationText.textContent = currentQuestion.explanation;
        explanationContainer.style.display = 'block';
    }
}

// Make startQuestion available globally for onclick handlers
window.startQuestion = startQuestion;
