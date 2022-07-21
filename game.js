var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100).delay(100);
    playSound(randomChosenColour);
    level++;
    $('h1').text("Level " + level);
}

$(".btn").click(function (event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed").delay(100).queue(function (next) {
        $(this).removeClass("pressed");
        next();
    })
}

$(document).keydown(function () {
    if (started == false) {
        $('h1').text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log('success');
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log('wrong');
        var audioWrong = new Audio('sounds/wrong.mp3');
        audioWrong.play();
        $('body').addClass('game-over').delay(200).queue(function (next) {
            $(this).removeClass("game-over");
            next();
        })
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();

    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}