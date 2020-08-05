var timeEl = document.querySelector(".timer");
var mainEl = document.getElementById("main");
const points = [];

var secondsLeft = 30;

var questions = [
  { 
    question : 'Who is on 1 Dollar bill?',
    answers : [
      {
      label: 'B. Franklin',
      value: 0,
      },
      {
      label: 'J Washington',
      value: 10,
      },
      {
      label: 'A. Hamilton',
      value: 0,
      },
      {
      label: 'B. Obama',
      value: 0,
      }
    ]
  },
  { 
    question : 'Who is on 10 Dollar bill?',
    answers : [
      {
      label: 'B. Franklin',
      value: 0,
      },
      {
      label: 'A. Hamilton',
      value: 10,
      },
      {
      label: 'J Washington',
      value: 0,
      },
      {
      label: 'D. Trump',
      value: 0,
      }
    ]
  },
  { 
    question : 'Who is on 100 Dollar bill?',
    answers : [
      {
        label: 'B. Franklin',
        value: 10,
        },
        {
        label: 'A. Hamilton',
        value: 0,
        },
        {
        label: 'J Washington',
        value: 0,
        },
        {
        label: 'D. Trump',
        value: 0,
        }
    ]
  },
]



function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left till exam ends.";

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }

  }, 1000);
}

function renderQuestion(quest) {
  const questionContainer = document.getElementById('test')
 

  function answerRenderer(answer){
    const answers = answer.map((item,index) => {
      return `<span class="answer" data-value='${item.value}'>${index + 1} : ${item.label}</span>`
    })
    
    return answers.join(' ');
  }

  const questionHtml = quest.map((item , index) => {
    return `<div class="question flex-column  ${ index !== 0 && 'd-none'}" id=${index}>
      <p>${item.question}</p>
      <p class="answers d-flex flex-column">
        ${answerRenderer(item.answers)}
      </p>
    </div>`
  })

  questionContainer.innerHTML = questionHtml.join(' ')
}


function answerClick() {
  const answers = document.querySelectorAll('.answer');
  const question = document.querySelectorAll('.question');


  function messageRenderer(value) {
    const messageBox = document.getElementById('message');

    if( value === '10'){
      messageBox.innerText = 'Correct'
      setTimeout(function(){
        messageBox.innerText = ''
      },1000)
      return
    }

    messageBox.innerText = 'Wrong'
    setTimeout(function(){
      messageBox.innerText = ''
    },1000)
  }

  function pointsRenderer(score) {
    const pointsBox = document.getElementById('points');
    const pointsSum = score.reduce(function(a, b){
      return a + b;
    }, 0);
    pointsBox.innerText = pointsSum;
  }


  for(let i = 0; i < answers.length ; i++){
    answers[i].onclick = function name() {
      const currentQuestion = this.parentElement.parentElement;
      currentQuestion.classList.remove('d-flex');
      currentQuestion.classList.add('d-none');
      const id = currentQuestion.id;

      const value = this.getAttribute('data-value');

      points.push(parseInt(value))
      
      messageRenderer(value);

      if(question[parseInt(id) + 1]){
          question[parseInt(id) + 1].classList.add('d-flex')
          question[parseInt(id) + 1].classList.add('d-none');
          return
      }

      pointsRenderer(points)
    }
  }




}

function startQuiz(){
  renderQuestion(questions);
  answerClick();
}

startQuiz();

setTime();

