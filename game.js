var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; 
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

$("#start-btn").on("click", function() {
    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
    
})

$(document).on("keydown", function(event) {
    // console.log(event.key);
    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    } 
})

function nextSequence() {

    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    level++;
    $("#level-title").text("Level " + level);

    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("./sounds/" + randomChosenColour + ".mp3")
    audio.play();
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3")

    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var wrong = new Audio("sounds/wrong.mp3")
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    };
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}