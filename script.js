const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height / 2;

let ballRadius = 6;

let dx = 4;
let dy = 0;

let paddleWidth = 20;
let paddleHeight = 100;

let paddleOneX = 0;
let paddleOneY = canvas.height / 2 - (0.5 * paddleHeight);

let paddleTwoX = canvas.width - paddleWidth;
let paddleTwoY = canvas.height / 2 - (0.5 * paddleHeight);

//input booleans
let wPressed = false;
let sPressed = false;
let upPressed = false;
let downPressed = false;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function drawPlayerOne() {
    ctx.beginPath();
    ctx.rect(paddleOneX, paddleOneY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FF00FF";
    ctx.fill();
    ctx.closePath();
}

function drawPlayerTwo() {
    ctx.beginPath();
    ctx.rect(paddleTwoX, paddleTwoY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function movePlayerOne() {
    if (wPressed && paddleOneY > 0) {
        paddleOneY -= 7;
    } else if (sPressed && paddleOneY < canvas.height - paddleHeight) {
        paddleOneY += 7;
    }
}

function movePlayerTwo() {
    if (upPressed && paddleTwoY > 0) {
        paddleTwoY -= 7;
    } else if (downPressed && paddleTwoY < canvas.height - paddleHeight) {
        paddleTwoY += 7;
    }
}

// function movePlayerTwo() {
//     if (upPressed) {
//         paddleTwoY = Math.min(paddleTwoY + 5, canvas.height - paddleHeight);
//     } else if (downPressed) {
//         paddleTwoY = Math.max(paddleTwoY - 5, 0);
//     }
// }

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayerOne();
    drawPlayerTwo();
    betterCollision();
    drawBall();
    

    movePlayerOne();
    movePlayerTwo();

    x -= dx;
    y += dy;
    
    requestAnimationFrame(draw);
}


document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);

function keyUpHandler(e) {
    if (e.key === "w") {
        wPressed = false;
    } else if (e.key === "s") {
        sPressed = false;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = false;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = false;
    }
}

function keyDownHandler(e) {
    if (e.key === "w") {
        wPressed = true;
    } else if (e.key === "s") {
        sPressed = true;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = true;
    }
}


// function collisionDetectionX() {
//     if (
//         ((x == paddleOneX + paddleWidth) && (y > paddleOneY && y < paddleOneY + (paddleHeight))) ||
//         ((x == paddleTwoX) && (y > paddleTwoY && y < paddleTwoY + (paddleHeight)))
//         )
//          {
//             dx = -dx;
//         }
// }

// function collisionDetectionY() {
//     if (y < paddleOneY + (0.25 *paddleHeight) || y < paddleTwoY + (0.25 * paddleHeight)) {
//         dy += 0.5;
//     }
// }

// function collisionDetection() {
//     if (
//         (
//             (x == paddleOneX + paddleWidth) && 
//             (y > paddleOneY && y < paddleOneY + (paddleHeight))
//             )
//             )
//          {
//             if (y < paddleOneY + (0.25 *paddleHeight)) {
//                 dy += 0.5;
//             } else if (y > paddleOneY + (paddleHeight - (0.25 *paddleHeight))) {
//                 dy -= 0.5;
//             }
//             dx = -dx;
//         }
    
//     if (
//         (
//             (x == paddleTwoX) && 
//             (y > paddleTwoY && y < paddleTwoY + (paddleHeight))
//             )
//             )
//          {
//             if (y < paddleTwoY + (0.25 *paddleHeight)) {
//                 dy += 0.5;
//             } else if (y > paddleTwoY + (paddleHeight - (0.25 *paddleHeight))) {
//                 dy -= 0.5;
//             }
//             dx = -dx;
//         }
    
//     if (y < 0 || y > canvas.height) {
//         dy = -dy;
//     }
// }

function betterCollision() {
    if (x == paddleOneX + paddleWidth) {
        if (y > paddleOneY && y < paddleOneY + (paddleHeight)) {
            if (y < paddleOneY + (0.25 *paddleHeight)) {
                dy += 0.5;
            } else if (y > paddleOneY + (paddleHeight - (0.25 *paddleHeight))) {
                dy -= 0.5;
            }
            dx = -dx;
        }
    }

    if (x == paddleTwoX) {
        if (y > paddleTwoY && y < paddleTwoY + (paddleHeight)) {
            if (y < paddleTwoY + (0.25 *paddleHeight)) {
                dy += 0.5;
            } else if (y > paddleTwoY + (paddleHeight - (0.25 *paddleHeight))) {
                dy -= 0.5;
            }
            dx = -dx;
        }
    }
    
    if (y < 0 || y > canvas.height) {
        dy = -dy;
    }
}

draw();