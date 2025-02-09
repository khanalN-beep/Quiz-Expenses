const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .re-start");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const next_btn = document.querySelector(".next_btn");
const restart_btn = document.querySelector(".restart");
const quit_btn = document.querySelector(".quit");
const timer_sec = document.querySelector(".timer_sec");
const question_text = document.querySelector(".que_text");
const total_que = document.querySelector(".total_que p:first-child");
const total_que_out_of = document.querySelector(".total_que p:last-child");
const score_text = document.querySelector(".score_text span p");

const questions = [
    { question: "What does HTML stand for?", options: ["Hypertext Preprocessor", "Hypertext Markup Language", "Hypertext Multiple Language", "Hypertext Multi Language"], answer: 1 },
    { question: "What does CSS stand for?", options: ["Cascading Style Sheet", "Colorful Style Sheet", "Creative Style Sheet", "Computer Style Sheet"], answer: 0 },
    { question: "What does JS stand for?", options: ["Java Super", "Just Script", "JavaScript", "Jordan Shoes"], answer: 2 },
    { question: "Which is a JavaScript framework?", options: ["Python", "React", "Django", "Flask"], answer: 1 },
    { question: "What does PHP stand for?", options: ["Hypertext Preprocessor", "Pretext Hypertext Processor", "Personal Home Page", "Programming Hypertext Preprocessor"], answer: 0 }
];

let currentQuestion = 0;
let score = 0;
let timer;
let userAnswers = []; 

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    clearInterval(timer);
    info_box.style.display = "none";
    quiz_box.style.display = "none";
    result_box.style.display = "none";
    document.querySelector(".start_btn").style.display = "block";
}

start_btn.onclick = () => {
    info_box.style.display = "block";
    start_btn.parentElement.style.display = "none";
};

exit_btn.onclick = () => {
    resetQuiz();
};

continue_btn.onclick = () => {
    info_box.style.display = "none";
    quiz_box.style.display = "block";
    loadQuestion();
    startTimer(15);
};

function loadQuestion() {
    let question = questions[currentQuestion];
    question_text.innerHTML = `<span>${question.question}</span>`;
    option_list.innerHTML = "";
    total_que.innerText = currentQuestion + 1;
    total_que_out_of.innerText = questions.length;

    question.options.forEach((option, index) => {
        let div = document.createElement("div");
        div.classList.add("option");
        div.innerHTML = `<span>${option}</span>`;
        div.onclick = () => selectAnswer(index);
        option_list.appendChild(div);
    });

    next_btn.style.display = "none";
}

function selectAnswer(index) {
    userAnswers[currentQuestion] = index; 
    next_btn.style.display = "block";
}

next_btn.onclick = () => {
    if (userAnswers[currentQuestion] === undefined) {
        alert("Please select an answer before proceeding!");
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
        startTimer(15);
    } else {
        showResult();
    }
};

function startTimer(time) {
    clearInterval(timer);
    timer_sec.innerText = time;
    timer = setInterval(() => {
        time--;
        timer_sec.innerText = time;
        if (time <= 0) {
            clearInterval(timer);
            userAnswers[currentQuestion] = -1; // Mark unanswered question
            next_btn.style.display = "block";
        }
    }, 1000);
}

function showResult() {
    quiz_box.style.display = "none";
    result_box.style.display = "block";
    score = 0;

    let resultHTML = "";

    userAnswers.forEach((answer, index) => {
        let question = questions[index];
        let correctIndex = question.answer;
        let userAnswerIndex = answer === undefined ? -1 : answer;
        let isCorrect = userAnswerIndex === correctIndex;

        if (isCorrect) score++;

        resultHTML += `
            <div class="question-box">
                <p class="question-text">${question.question}</p>
                <div class="options">`;

        question.options.forEach((option, i) => {
            let className = "option"; 
            let icon = "";

            if (i === correctIndex) {
                className += " correct";
                icon = "✔️";  
            }
            if (i === userAnswerIndex && !isCorrect) {
                className += " wrong"; 
                icon = "❌";
            }

            resultHTML += `
                <div class="${className}">
                    <span class="icon">${icon}</span> ${option}
                </div>`;
        });

        resultHTML += `</div></div>`;
    });

    score_text.innerHTML = `Score: ${score} / ${questions.length}`;

    let resultsContainer = document.createElement("div");
    resultsContainer.id = "results-container";
    resultsContainer.innerHTML = resultHTML;
    result_box.appendChild(resultsContainer);
}


function toggleAnswer(element) {
    let correctAnswer = element.querySelector(".correct-answer");
    correctAnswer.style.display = correctAnswer.style.display === "none" ? "block" : "none";
}




restart_btn.onclick = () => {
    resetQuiz();
    result_box.style.display = "none";
    quiz_box.style.display = "block";
    loadQuestion();
    startTimer(15);
};

quit_btn.onclick = () => {
    resetQuiz();
};

window.onload = resetQuiz;

function submitQuiz() {
    let resultsContainer = document.getElementById("results-container");
    
    
    document.getElementById("quiz-container").style.display = "none";
    resultsContainer.style.display = "block";

    setTimeout(() => {
        resultsContainer.scrollIntoView({ behavior: "smooth" });
    }, 200);
}

