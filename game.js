
var buttonColours = ["red", "blue", "green", "yellow"];

var gamepattern = [];

var userclickedpattern = [];

var level = 0;

var start = false;


// user click the button

$(".btn").click(function () {
    var userchoosencolor = $(this).attr("id");
    userclickedpattern.push(userchoosencolor);
    playsound(userchoosencolor);
    animatepress(userchoosencolor);

    var length = userclickedpattern.length-1;
    checkanswer(length);
});


// to start and end the game by pressing the key

$(document).keypress(function () {
    if (!start) {
        $("h1").html("Level " + level);
        nextSequence();
        start = true;
    }   
});

// it creates the game pattern by computer

function nextSequence() {
    userclickedpattern = [];
    level += 1;
    $("h1").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomchoosenColor = buttonColours[randomNumber];
    gamepattern.push(randomchoosenColor);

    $("#" + randomchoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);  
    playsound(randomchoosenColor);
}

// checking the answer

function checkanswer(currentlevel) {
    if (userclickedpattern[currentlevel] === gamepattern[currentlevel]) {

        if (gamepattern.length === userclickedpattern.length) {
            setTimeout(function () {
                nextSequence(); 
            },1000)
        }
    }
    else {
        playsound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startover();
        console.log("fail");
    }
}



// if answer is worng start over

function startover() {
    level = 0;
    gamepattern = [];
    start = false;
}

// playing the sound

function playsound(name) {
    var a = new Audio(".//sounds/" + name + ".mp3"); //."//sounds/" + randomchoosenColor + ".mp3"
    a.play();
}

// provide the animation to the button

function animatepress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}
