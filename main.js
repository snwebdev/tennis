var canvas;
var canvasContext;
var scores = {
    player: 0,
    comp: 0
};

var digits = [
    [
        1,1,1,
        1,0,1,
        1,0,1,
        1,0,1,
        1,1,1,
    ],
    [
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,
    ],
    [
        1,1,1,
        0,0,1,
        1,1,1,
        1,0,0,
        1,1,1
    ],
    [
        1,1,1,
        0,0,1,
        1,1,1,
        0,0,1,
        1,1,1
    ],
    [
        1,0,1,
        1,1,1,
        0,0,1,
        0,0,1
    ],
    [
        1,1,1,
        1,0,0,
        1,1,1,
        0,0,1,
        1,1,1
    ],
    [
        1,0,0,
        1,0,0,
        1,1,1,
        1,0,1,
        1,1,1
    ],
    [
        1,1,1,
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1
    ],
    [
        1,1,1,
        1,0,1,
        1,1,1,
        1,0.1,
        1,1,1
    ],
    [
        1,1,1,
        1,0,1,
        1,1,1,
        0,0,1,
        0,0,1
    ]
]
var ball = {
    x: 100,
    y: 100,
    dx: 10,
    dy: 6,
    size: 20,
    inplay: true,
    direction: "right"
}
var bat1, bat2;

var bat2Y = 100;
const BAT_HEIGHT = 100;
const BAT_WIDTH = 15;
const BAT_H_SPACE = 100;
const BAT_V_SPACE = 20;
const COMP_SPEED = 6;


function getMousePosition(e) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    mouseX = e.clientX - rect.left - root.scrollLeft;
    mouseY = e.clientY - rect.top - root.scrollTop;
    return {x: mouseX, y: mouseY};

}

window.onload = function () {

    console.log("hellow world");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvas.style.cursor = "none";
    bat1 = {
        y: 100,
        x: BAT_H_SPACE,
        dy: 0
    };

    bat2 = {
        y: 100,
        x: canvas.width - BAT_WIDTH - BAT_H_SPACE,
        dy: 0,
        speed: COMP_SPEED
    };

    var fps = 30;
    setInterval(function () {
        moveEverything();
        checkMovement();
        setBatMove(bat1);
        drawEverything();

    }, 1000 / fps);

    canvas.addEventListener('mousemove', function (e) {
        mousePosition = getMousePosition(e);
        bat1.newY = mousePosition.y - BAT_HEIGHT / 2;
        // bat2.dy = mousePosition.y - BAT_HEIGHT / 2;
    })
}

function reverseBallDirection() {
    if (ball.direction === "right") {
        ball.direction = "left";
    } else {
        ball.direction = "right";
    }
}

function computerMove() {
    if (ball.direction == "left") {
        bat2.dy = 0;
        return;
    }
    {
        if (bat2.y + (BAT_HEIGHT / 2) > ball.y) {
            bat2.dy = -bat2.speed;
        } else {
            bat2.dy = bat2.speed;
        }
    }
}

function checkMovement() {
    //hit bat1
    if (ball.x <= BAT_WIDTH + bat1.x) {
        if (ball.inplay) {
            if (ball.y > bat1.y &&
                ball.y < (bat1.y + BAT_HEIGHT) &&
                ball.inplay) {
                ball.dx = -ball.dx;
                reverseBallDirection();
            } else {
                ball.inplay = false;
            }
        }

    }

    //hit bat2
    if (ball.x + ball.size >= canvas.width - BAT_H_SPACE) {
        if (ball.inplay) {
            if (ball.y > bat2.y &&
                ball.y < (bat2.y + BAT_HEIGHT)) {
                ball.dx = -ball.dx;
                reverseBallDirection();
            } else {
                ball.inplay = false;
            }
        }
    }

    //hit top
    if (ball.y <= 0) ball.dy = -ball.dy;

    //hit bottom
    if (ball.y + ball.size >= canvas.height) ball.dy = -ball.dy;

    //out left
    if (ball.x + ball.size <= 0){
        scores.comp++;
        ballReset();
        console.log(scores);
    }

    //out right
    if (ball.x >= canvas.width) {
        scores.player++;
        ballReset();
        console.log(scores);
    }

    //bat 1 off bottom
    if (bat1.y + BAT_HEIGHT + BAT_V_SPACE >= canvas.height) bat1.y = canvas.height - BAT_HEIGHT - BAT_V_SPACE;

    //bat 1 off top
    if (bat1.y - BAT_V_SPACE <= 0) bat1.y = BAT_V_SPACE;

}

function moveEverything() {
    ball.x = ball.x + ball.dx;
    ball.y = ball.y + ball.dy;
    bat1.y = bat1.newY;
    computerMove();
    bat2.y += bat2.dy;
}

function setBatMove(bat) {
}

function drawEverything() {
    //canvas
    drawRect(0, 0, canvas.width, canvas.height, 'black');

    //ball
    drawRect(ball.x, ball.y, 10, 10, 'white');

    //bat1
    drawRect(bat1.x, bat1.y, BAT_WIDTH, BAT_HEIGHT, 'white');
    bat1.dy = 0;

    //bat2
    drawRect(bat2.x, bat2.y, BAT_WIDTH, BAT_HEIGHT, 'white');
}

function drawRect(X, Y, width, height, colour) {
    canvasContext.fillStyle = colour;
    canvasContext.fillRect(X, Y, width, height);
}

function ballReset() {
    ball.inplay = true;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
}