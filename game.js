let btnColors = ['red', 'blue', 'green', 'yellow']

let gamePattern = [] 
let userClickedPattern = []

let started = false
let level = 0;

$(document).keydown(function () {
   if (!started) {
    
     $('#level-title').text('Level ' + level)
     nextSequence();
     gameStarted = true
   }
 });


 $('.btn').click(function () {
   let userChosenColor = $(this).attr('id')
   userClickedPattern.push(userChosenColor);

   playSound(userChosenColor)
   animatePress(userChosenColor)  

   checkAnswer(userClickedPattern.length - 1)
 })

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
   playSound('wrong')
    wrongMove();
    $('h1').text('Game Over, Press Any Key to Restart')
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = []

  level++

  $('#level-title').text('Level ' + level)

  let randomNumber = Math.floor(Math.random() * 4); 
  let randomChosenColor = btnColors[randomNumber]; 
  gamePattern.push(randomChosenColor); //add random color to pattern arr
  
  //animates & sounds
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor)
  animatePress(randomChosenColor)
 
}    

function playSound(name) {
  //sounds on click
  let audio = new Audio("sounds/" + name + ".mp3"); 
  audio.play();
}

function animatePress(currentColor) {
  $('.' + currentColor).addClass('pressed')

  setTimeout(function () {
    $('.' + currentColor).removeClass('pressed')
  }, 100)
}

function wrongMove() {
  $("body").addClass("game-over");

  setTimeout(function () {
    $('body').removeClass('game-over')
  }, 200)
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}