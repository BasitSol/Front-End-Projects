const questions = [
    {
        question:'Which is the largest animal in the world ?',
        answers:[
            {text:'Shark', correct: false},
            {text:'Blue Whale', correct: true},
            {text:'Elephant', correct: false},
            {text:'Giraffe', correct: false}
        ]
    },
    {
        question:'What is the chemical symbol for gold ?',
        answers:[
            {text:'Au', correct: true},
            {text:'Ag', correct: false},
            {text:'Fe', correct: false},
            {text:'Pb', correct: false}
        ]
    },
    {
        question:'Who was the first President of the United States ?',
        answers:[
            {text:'Roosevelt', correct: false},
            {text:'Jefferson', correct: false},
            {text:'Lincoln', correct: false},
            {text:'Washington', correct: true}
        ]
    },
    {
        question:'Which planet is known as the Red Planet ?',
        answers:[
            {text:'Saturn', correct: false},
            {text:'Jupiter', correct: false},
            {text:'Mars', correct: true},
            {text:'Venus', correct: false}
        ]
    },
    {
        question:'Which metal is the best conductor of electricity?',
        answers:[
            {text:'Aluminum', correct: false},
            {text:'Gold', correct: false},
            {text:'Silver', correct: true},
            {text:'Copper', correct: false}
        ]
    },
];

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    })
}

function resetState(){
    nextButton.style.display = 'none'
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true'
    if(isCorrect){
        selectedBtn.classList.add('correct')
        score++;
    }else{
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true
    });
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = 'block'
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})
startQuiz()
