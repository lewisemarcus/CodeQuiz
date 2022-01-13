var startBtn = document.querySelector("#start");
var timerEl = document.getElementById('timer');
var mainEl = document.getElementById('main');
var headerEl = document.getElementById('header');
var buttonEl = document.getElementById('button');
var choiceEl = document.createElement("h4");
var pEl = document.createElement("p");
var quizFooterEl = document.querySelector('.quiz-card-footer');
var quizCardEl = document.querySelector('.quiz-card');
var addedUser = 0;

var correct = "Correct!";
var timeLeft = 0;
var wrong = "Wrong!";
var answerList = document.createElement('ol');
var i = 0;
var gamesPlayed = 0;
var users = [];
var viewScoreClick = 0;
var changeClick = 0;
var clearUsers = 0;
var noMoreQuestions = 0;

//from answers, create li elements and 
//append to an unordered list depending on question
//in answers, create array of answers within array
var questions = ["Commonly used data types do not include:", 
                "The condition in an if / else statement is enclosed within ______. ",
                "Arrays in JavaScript can be used to store ______.",
                "String values must be enclosed within ______ when being assigned to variables",
                "A very useful tool for used during development and debugging for printing content to the debugger is:"]
var answers = [["strings","booleans","alerts","numbers"],
              ["quotes","curly brackets","parantheses","square brackets"],
              ["numbers and strings","other arrays","booleans","all of the above"],
              ["commas","curly brackets","quotes","parantheses"],
              ["JavaScript","terminal / bash","for loops","console log"]]
             
var correctAnswers = ["alerts","parantheses","all of the above","quotes","console log"];
var savedUserScores = [];
  
var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");

li1.setAttribute("name", "choices");
li2.setAttribute("name", "choices");
li3.setAttribute("name", "choices");
li4.setAttribute("name", "choices");

li1.classList.add("choice-format");
li2.classList.add("choice-format");
li3.classList.add("choice-format");
li4.classList.add("choice-format");

//Nodelist of buttons for further use
var buttons = document.getElementsByName('choices');

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
submitBtn.addEventListener("click", results);
buttonEl.classList.add("quiz-card-footer");

var headerTag = document.getElementsByTagName('header');

//Button to view High Scores
var viewHighscores = document.createElement("button");
viewHighscores.addEventListener("click", viewScores);
viewHighscores.textContent = "View Highscores";
viewHighscores.classList.add("btn");
headerTag[0].append(viewHighscores);

//For later use with adding and storing usernames
var userEl = document.createElement("div");
var userDiv = document.createElement("div");
var allUsersDiv = document.createElement("div");

var goBack = document.createElement("button");
var clearScores = document.createElement("button");
var flexDiv = document.createElement("div");

//Starting idle screen, used for reiteration
function idle(){
  headerEl.textContent = "Press the button to start the quiz!";
  startBtn.textContent = "START!";
  startBtn.addEventListener("click", startGame);
  var flexStart = document.createElement("div");
  flexStart.classList.add("flex", "justify-center", "margin-top");
  flexStart.append(startBtn);
  mainEl.append(flexStart);
  timeLeft = 0;
  timerEl.textContent = timeLeft + ' seconds remaing.';  
  if (gamesPlayed != 0) {
    quizCardEl.classList.remove("column");
    for (var p = 1; p < (mainEl.children.length) - 1; p++) {
      mainEl.children[p].remove();
    }
    mainEl.children[1].remove();
  }
}

function startGame() {
  noMoreQuestions = 0;
  if (gamesPlayed > 0) {
    buttonEl.classList.remove("user-class");
  }
  quizCardEl.append(quizFooterEl);
    i=0;
    timeLeft = 59
    timerEl.textContent = (timeLeft+1) + ' seconds remaing.';
    //Timer function
    //Once a condition for the end game message is met, then displayEndMsg runs
    var timeInterval = setInterval(function() {
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft + ' seconds remaing.';
        timeLeft--;      
      }
      else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second remaing.';
        timeLeft--;
      }
      else if (timeLeft == 0 || timeLeft < 0) {
        timerEl.textContent = 0 + ' second remaing.';
        clearInterval(timeInterval);
        displayEndMsg();
      }
      else {
        timerEl.textContent = timeLeft + ' seconds remaing.';
        clearInterval(timeInterval);
        displayEndMsg();
      }
      if (noMoreQuestions == 1) {    
        clearInterval(timeInterval);
      }
      if (viewScoreClick == 1) {
        buttonEl.removeChild(answerList);
        choiceEl.remove();
        timerEl.textContent = 0 + ' seconds remaing.';
        clearInterval(timeInterval);
      }
    }, 1000);

    startBtn.remove();
    loadQuestion(i);
    //add event listeners to each button to change question and check answer
    //NOTE: the object adding eventlisteners are passed through function called  
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].addEventListener("click", checkAnswer); 
  }
  gamesPlayed++;
  changeClick = 0;
}

function loadQuestion(v) {
headerEl.textContent = questions[v];
  //checks for no more questions, if no question detected, user is shown credits page
  //if question detected, continues with program
  if(answers[v] === undefined) {
    noMoreQuestions = 1;
    displayEndMsg();
  }
  else {
    li1.textContent = answers[v][0];
    li2.textContent = answers[v][1];
    li3.textContent = answers[v][2];
    li4.textContent = answers[v][3];

    answerList.append(li1, li2, li3, li4);
    buttonEl.appendChild(answerList);  
  }
}

function changeQuestion () {
  i++;
  loadQuestion(i);
  changeClick = 1;
}

//takes button parameter in checkAnswer to pass through specific button if clicked
//adds score if corrects, reduces time if incorrect
//Changes question after score/time affected
function checkAnswer(btn) {
  choiceEl.classList.add("answer-style", "flex", "justify-center");

  if (btn.target.textContent == correctAnswers[i]) {
    choiceEl.textContent = correct;
    mainEl.appendChild(choiceEl);  
  }       
  else {
    choiceEl.textContent = wrong;
    mainEl.appendChild(choiceEl);
    timeLeft = timeLeft - 10;
  }
  answerTimer();
  changeQuestion();
  btn.stopPropagation(); 
}

//Timer function for the checkAnswer result
function answerTimer() {
  var checkTime = 1;
  var checkInterval = setInterval(function() {
    if (checkTime == 1) {
      checkTime--;
    } 
    else {
      clearInterval(checkInterval);
      choiceEl.remove();
    }
    if (changeClick == 1) {
      clearInterval(checkInterval);
      choiceEl.remove();
    }
  }, 500);
}    

//Function that displays end screen
function displayEndMsg() {
  userInput.value = "";
  mainEl.children[1].className = "flex";
  timerEl.textContent = timeLeft + ' seconds remaing.';
  //checks which end card to write
  if ((timeLeft == 0 || timeLeft < 0) && noMoreQuestions == 1) {
    headerEl.textContent = ("GAME OVER. YOUR SCORE:" + 0);
    timerEl.textContent = 0 + ' seconds remaing.';
  }
  else if ((timeLeft < 0 || timeLeft == 0) && noMoreQuestions == 0) {
    headerEl.textContent = ("TIME IS UP. YOUR SCORE:" + 0);
    timerEl.textContent = 0 + ' seconds remaing.';
  }
  else {
    headerEl.textContent = ("GAME OVER. YOUR SCORE:" + timeLeft);
  }
  
  buttonEl.append(userInput, submitBtn);
  if(buttonEl.contains(answerList)) {
    buttonEl.removeChild(answerList);
  } 
}

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
}

//Add users to empty array 
function addUser() {
   if (addedUser == 1) {
     users = [];
   }
  var pEl = document.createElement("p");
  users.push(userInput.value);
  userDiv.classList.add("flex");
  if (userInput.value.length < 3) {
    quizFooterEl.classList.add("user-class");
  }
  if(timeLeft < 0) {
    pEl.textContent = users + " — " + 0;
  }
  else {
    pEl.textContent = users + " — " + (timeLeft + 1);
  }
  
  //stores username to array, to compare with other users
  savedUserScores.push(pEl);
  userDiv.style.marginTop = "20px";
  for (var k = 0; k < savedUserScores.length; k++) {
    pEl.classList.add("user-name");
    userEl.append(savedUserScores[k]); 
  }
  userEl.setAttribute("id", "user-div");
  allUsersDiv.append(userEl);
  quizFooterEl.append(allUsersDiv);
  viewScores();
  addedUser = 1;
}

function back() {
  goBack.remove();
  clearScores.remove();
  allUsersDiv.remove();
  flexDiv.style.marginTop = "0px";
  mainEl.children[1].classList.remove("flex");
  userDiv.remove(savedUserScores);
  viewScoreClick = 0;
  idle();
}

//Removes children from userEl(contains all <p> elements) and creates uniform format
function clearScore() {
  for (var h = 0; h < userEl.children.length; h++) {
    userEl.children[h].remove();
    allUsersDiv.children[h].textContent = "";
    allUsersDiv.children[h].classList.remove("user-name");
  }
  savedUserScores = [];
  users = [];
  pEl.classList.remove("user-name");
  clearUsers = 1;
}


function viewScores() {
  viewScoreClick = 1;
  headerEl.textContent = "Highscores";
  startBtn.remove();
  submitBtn.remove();
  userInput.remove();
  allUsersDiv.append(pEl);
  quizFooterEl.append(allUsersDiv);

  buttonEl.classList.remove("quiz-card-footer");
  quizCardEl.classList.add("column");

  //Add event listeners to goback/clear scores
  goBack.addEventListener("click", back);
  goBack.className = "goBack-clearScore-btn";
  goBack.textContent = "Go Back";

  clearScores.addEventListener("click", clearScore);
  clearScores.className = "goBack-clearScore-btn";
  clearScores.textContent = "Clear Highscores";

  flexDiv.style.marginTop = "40px";
  flexDiv.style.marginLeft = "80px";
  flexDiv.classList.add("flex");
  flexDiv.append(goBack, clearScores);
  mainEl.append(userDiv, flexDiv);
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