// définissez une base de données
const quizData = [
    {
        question: 'Quelle âge a Emamnuel Macron ?',
        a: '38',
        b: '40',
        c: '42',
        d: '55',
        correct: 'c'
    },
    {
        question: 'Quel etait le meilleur smartphone en 2019 ?',
        a: 'Apple iPhone 11 Pro',
        b: 'One Plus 7T Pro',
        c: 'Samsung Galaxy S10',
        d: 'Huawei P30 Pro',
        correct: 'b'
    },
    {
        question: 'Qui est le president de la France ?',
        a: 'Vladimir Putin',
        b: 'Donald Trump',
        c: 'Emmanuel Macron',
        d: 'Bruce Willis',
        correct: 'c'      
    }, 
    {
        question: 'Que signifie CSS ?',
        a: 'Cascading Style Sheets',
        b: 'Social State Company',
        c: 'Commité de la Sécurité Sociale',
        d: 'Citroën Saxo Six',
        correct: 'a'
    },
    {
        question: 'Dans quel année a été créé le premier site web ?',
        a: '1987',
        b: '1988',
        c: '1989',
        d: '1990',
        correct: 'd'
    }
];

// récupérez les réferences des éléments
const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

// récupérer tous les réponses du quiz
const answerElements = document.querySelectorAll('.answer');


// la première question du quiz du tableau a l'index 0 
let currentQuiz = 0;
// le score démarre à 0
let score = 0;


// lancez le quiz
loadQuiz();

function loadQuiz(){
    // deselect the answers
    deselectAnswers();
    // définissez le quiz courant
    const currentQuizData = quizData[currentQuiz];
    // affichez la question et ses réponses
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;  
    
    

}

function getSelectedAnswer(){
    
    // déclarez une variable qui va stocker la réponse sélectionné
    let answer = undefined;

    answerElements.forEach((answerElement) => {
        // console.log(answer.checked);
        if(answerElement.checked){
            answer = answerElement.id;
        }
    });
    return answer;
}

function deselectAnswers(){
    answerElements.forEach((answerElement) => {
        answerElement.checked = false;
    });
}

// ajoutez un écouteur d'évenement "click"
submitBtn.addEventListener("click", () => {
   
    // définissez une variable qui va stocker la réponse retourné par la fonction 
    const submitedAnswer = getSelectedAnswer();
    // console.log(submitedAnswer);
    if(submitedAnswer){
        if(submitedAnswer === quizData[currentQuiz].correct){
            // increase the score
            score++;
        }

        // incrémentez le compteur du quiz
        currentQuiz++; 
        if(currentQuiz < quizData.length){ // tanq il y a des questions dans le quiz
            loadQuiz();
            }else{
                // affichez le score
                quiz.innerHTML = `
                <h2 class="result">Vous avez répondu au ${score}/${quizData.length} questions.</h2>

                <button onclick="location.reload()">Recommencer</button>
                `;
            }
    }
});
