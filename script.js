//TODO: make right/wrong disappear shortly after

var startBtn = document.querySelector("#start");
var timerEl = document.getElementById('timer');
var mainEl = document.getElementById('main');
var headerEl = document.getElementById('header');
var buttonEl = document.getElementById('button');
var choiceEl = document.createElement("h4");
var score = 0;
var correct = "Correct!";
var timeLeft = 0;
var wrong = "Wrong!";
var answerList = document.createElement('ol');
var i = 0;

//from answers, create li elements and 
//append to an unordered list depending on question
//in answers, create array of answers within array
var questions = ["What is 1+1?", "What is 2+2?","3+3","4+4?","5+5?", "6+6", "7+7","8+8"];
var answers = [["2","3","6","9"],["1","4","8","3"],["4","8","6","10"],
              ["1","4","8","3"],["4","8","6","10"],["8","11","12","3"], 
              ["8","11","12","14"], ["16","11","12","14"]];
var correctAnswers = ["2","4","6","8","10","12","14", "16"];
var savedUserScores = [];
  
var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");

var liBtn1 = document.createElement("button");
var liBtn2 = document.createElement("button");
var liBtn3 = document.createElement("button");
var liBtn4 = document.createElement("button");

liBtn1.setAttribute("name", "choices");
liBtn2.setAttribute("name", "choices");
liBtn3.setAttribute("name", "choices");
liBtn4.setAttribute("name", "choices");

//Nodelist of buttons for further use
var buttons = document.getElementsByName('choices');

var scriptEl = document.createElement('script');
scriptEl.src = "script.js";

//Starting idle screen, used for reiteration
function idle(){
  headerEl.textContent = "Press the button to start the quiz!";
  startBtn.textContent = "START!";
  startBtn.addEventListener("click", startGame);
  var flexStart = document.createElement("div");
  flexStart.classList.add("flex", "justify-center");
  flexStart.append(startBtn);
  mainEl.append(flexStart);
  timerEl.textContent = timeLeft + ' seconds remaing.';  
}

function startGame() {
    i=0;
    score = 0;
    timeLeft = 60;
    timerEl.textContent = timeLeft + ' seconds remaing.';
    //Timer function
    //Once a condition for the end game message is met, then displayEndMsg runs
    var timeInterval = setInterval(function() {
      if (timeLeft > 1) {
        timeLeft--;
        timerEl.textContent = timeLeft + ' seconds remaing.';
      }
      else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second remaing.';
        timeLeft--;
      }
      else if (headerEl.textContent == ("GAME OVER. YOUR SCORE:" + score)) {
        clearInterval(timeInterval);
        timerEl.textContent = 0 + ' seconds remaing.';
      }
      else if (timeLeft == 0 || timeLeft < 0) {
        timerEl.textContent = timeLeft + ' second remaing.';
        clearInterval(timeInterval);
        displayEndMsg();
      }
      else {
        timerEl.textContent = timeLeft + ' seconds remaing.';
        clearInterval(timeInterval);
        displayEndMsg();
      }
    }, 1000);

    startBtn.remove();
    loadQuestion(i);
    //add event listeners to each button to change question and check answer
    //NOTE: the object adding eventlisteners are passed through function called  
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].style.width = "100px";
      buttons[j].addEventListener("click", checkAnswer); 
  }
}  
function loadQuestion(v) {

headerEl.textContent = questions[v];
  //checks for no more questions, if no question detected, user is shown credits page
  //if question detected, continues with program
  if(answers[v] === undefined) {
    displayEndMsg();
  }
  else {
      liBtn1.textContent = answers[v][0];
      liBtn2.textContent = answers[v][1];
      liBtn3.textContent = answers[v][2];
      liBtn4.textContent = answers[v][3];
    
      li1.appendChild(liBtn1);
      li2.appendChild(liBtn2);
      li3.appendChild(liBtn3);
      li4.appendChild(liBtn4);

      answerList.append(li1, li2, li3, li4);
      buttonEl.appendChild(answerList);  
}
}
function changeQuestion () {
  i++;
  loadQuestion(i);
}
//takes button parameter in checkAnswer to pass through specific button if clicked
//adds score if corrects, reduces time if incorrect
//Changes question after score/time affected
function checkAnswer(btn) {
if (btn.target.textContent == correctAnswers[i]) {
  choiceEl.textContent = correct;
  mainEl.appendChild(choiceEl);
  score++;        
}       
else {
    choiceEl.textContent = wrong;
    mainEl.appendChild(choiceEl);
    timeLeft = timeLeft - 10;
}
choiceEl.classList.add("answer-style", "flex", "justify-center");
answerTimer();
changeQuestion();
btn.stopPropagation(); 
} 
//Timer function for the checkAnswer result
function answerTimer() {
  var checkTime = 2;
  var checkInterval = setInterval(function() {
    if (headerEl.textContent === "") {
      checkTime--; 
    }
    if (checkTime > 1) {
      checkTime--;
    }
    else if (checkTime === 1) {
      checkTime--;
    } 
    else {
      clearInterval(checkInterval);
      choiceEl.remove();
    }
  }, 300);
}    

function displayEndMsg() {
  mainEl.children[1].className = "flex";
  answerTimer();

  //checks which end card to write
  if (timeLeft == 0 || timeLeft < 0) {
    headerEl.textContent = ("TIME IS UP. YOUR SCORE:" + score);
    timerEl.textContent = 0 + ' seconds remaing.';
    buttonEl.removeChild(answerList);
  }
  else {
    headerEl.textContent = ("GAME OVER. YOUR SCORE:" + score);
    timeLeft = 0;
    buttonEl.removeChild(answerList);
  }
  //takes user input for user's initials
  var userInput = document.createElement("input");
  userInput.type = "text";
  userInput.classList.add("user-input");
  userInput.placeholder = "Enter initials...";
  userInput.style.marginTop = "15px";

  var submitBtn = document.createElement("button");
  submitBtn.classList.add("submit-btn");
  submitBtn.textContent = "Submit";
  submitBtn.style.marginTop = "15px";
  
  buttonEl.classList.add("quiz-card-footer");
  buttonEl.append(userInput, submitBtn);
  
  function results() {
    if (userInput.value == "Rejean My Love <3") {
      addUser();
    }
    //checks if username is empty or contains any non-letters
    else if (userInput.value == ""|| !/^[a-zA-Z]+$/.test(userInput.value) || userInput.value.length != 2) {
      headerEl.textContent = "Please enter your initials(for first and last name only).";
    }
    else {
      addUser();  
    }

   //Add users to empty array 
  function addUser() {
    headerEl.textContent = "Highscores";
    submitBtn.remove();
    userInput.remove();
    var users = [];
    users.push(userInput.value);
    
    var userEl = document.createElement("div");
    var userDiv = document.createElement("div");
    userDiv.classList.add("flex");
    if (userInput.value.length < 3) {
      userDiv.classList.add("user-class");
    }
    userEl.textContent = users + " -- " + score;

    //stores username to array, to compare with other users
    savedUserScores.push(userEl.textContent);
    userDiv.style.marginTop = "20px";
    userDiv.append(savedUserScores.join('\r\n'));

    //Add event listeners to goback/clear scores
    var goBack = document.createElement("button");
    goBack.addEventListener("click", back);
    goBack.className = "goBack-clearScore-btn";
    goBack.textContent = "Go Back";

    var clearScores = document.createElement("button");
    clearScores.addEventListener("click", clearScore);
    clearScores.className = "goBack-clearScore-btn";
    clearScores.textContent = "Clear Highscores";

    function back() {
      goBack.remove();
      clearScores.remove();
      userDiv.remove();
      flexDiv.style.marginTop = "0px";
      mainEl.children[1].classList.remove("flex");

      idle(); 
    }

    function clearScore() {
      savedUserScores = [];
      userDiv.remove(savedUserScores);
    }

    var flexDiv = document.createElement("div");
    flexDiv.style.marginTop = "40px";
    flexDiv.style.marginLeft = "80px";
    flexDiv.classList.add("flex");
    flexDiv.append(goBack, clearScores);
    mainEl.append(userDiv, flexDiv);
  }
}
  buttonEl.children[1].addEventListener("click", results);
}

idle();

//Click start, then timer starts and question displays DONE
//Display answer choices below question DONE
//Highlight answer choice on hover DONE
//Display 'Wrong!' or 'Correct!' once answered DONE
//If wrong, reduce by 10 seconds DONE
//If correct, tally score DONE
//When questions are done, or timer = 0, display submit page DONE
//On scoreboard, allow player entry for highscore DONE
//After player enters name, display name and highscore DONE


//NOTE: In javascript, to set a CSS class to newly created item:
//use "yourVariable".className = "css-class-name"
//NOTE: remove() deletes for the rest of the code
//NOTE: while loops already exist within functions(will keep running until if condition breaks)