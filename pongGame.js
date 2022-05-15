const gameBoard = document.querySelector("#gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetButton = document.querySelector("#resetButton");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const paddleOneColor = "black";
const paddleTwoColor = "black";
const paddleBorder = "black";
const ballColor = "#5b1782";
const ballBorderColor = "#5b1782";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let playerOneScore = 0;
let playerTwoScore = 0;
let paddleOne = {width: 25, height: 100, x: 0, y: 200};
let paddleTwo = {width: 25, height: 100, x: gameWidth - 25, y: 200};

window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

gameStart();

/**
 * Description: Starts the game by creating all of the game components.
 */
function gameStart(){
    createBall();
    nextTick();
};

/**
 * Description: Moves the paddles and ball and checks for ball collisions.
 * Post-Condition: The location of these objects changes.
 */
function nextTick(){
    intervalID = setTimeout(() => {
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();
    }, 10)
};

/**
 * Description: The board is cleared.
 */
function clearBoard(){
    context.fillStyle = boardBackground;
    context.fillRect(0, 0, gameWidth, gameHeight);
};

/**
 * Description: The paddles are drawn.
 */
function drawPaddles(){
    context.strokeStyle = paddleBorder;
    context.fillStyle = paddleOneColor;
    context.fillRect(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height);
    context.strokeRect(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height);
    context.fillStyle = paddleTwoColor;
    context.fillRect(paddleTwo.x, paddleTwo.y, paddleTwo.width, paddleTwo.height);
    context.strokeRect(paddleTwo.x, paddleTwo.y, paddleTwo.width, paddleTwo.height);
};

/**
 * Description: The ball is created and given a random start direction.
 * Post-Condition: The ball is drawn.
 */
function createBall(){
    ballSpeed = 1;
    if(Math.round(Math.random()) == 1){
        ballXDirection = 1;
    }
    else{
        ballXDirection = -1;
    }
    if(Math.round(Math.random()) == 1){
        ballYDirection = 1;
    }
    else{
        ballYDirection = -1;
    }
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
};

/**
 * Description: The ball is moved.
 * Post-Condition: The coordinates of the ball change.
 */
function moveBall(){
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
};

/**
 * Description: The ball is drawn.
 * Pre-Condition: The coordinates must be within the game board.
 */
function drawBall(ballX, ballY){
    context.fillStyle = ballColor;
    context.strokeStyle = ballBorderColor;
    context.lineWidth = 2;
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
};

/**
 * Description: Checks to see if the ball has collided with a paddle or wall.
 * Post-Condition: If there is a collision, the ball will change direction. If a score is made, the score is updated and a new ball is created.
 */
function checkCollision(){
    // if ball hits top border, ball will bounce down
    if(ballY <= 0 + ballRadius){
        ballYDirection *= -1;
    }
    // if ball hits bottom border, ball will bounce up
    if (ballY >= gameHeight - ballRadius){
        ballYDirection *= -1;
    }
    // if ball hits left border, the score is changed and a new ball will be created
    if(ballX <= 0){
        playerTwoScore+=1;
        updateScore();
        createBall();
        return;
    }
    // if ball hits right border, the score is changed and a new ball will be created
    if(ballX >= gameWidth){
        playerOneScore+=1;
        updateScore();
        createBall();
        return;
    }
    // if ball hits paddle one, the ball will be bounced towards the other side
    if(ballX <= (paddleOne.x + paddleOne.width + ballRadius)){
        if(ballY > paddleOne.y && ballY < paddleOne.y + paddleOne.height){
            ballX = (paddleOne.x + paddleOne.width) + ballRadius; // prevents ball from getting stuck
            ballXDirection *= -1;
            ballSpeed += 0.3;
        }
    }
    // if ball hits paddle two, the ball will be bounced towards the other side
    if(ballX >= (paddleTwo.x - ballRadius)){
        if(ballY > paddleTwo.y && ballY < paddleTwo.y + paddleTwo.height){
            ballX = paddleTwo.x - ballRadius; // prevents ball from getting stuck
            ballXDirection *= -1;
            ballSpeed += 0.3;
        }
    }
};

/**
 * Description: Paddles are moved. Use the W and S keys for paddle one and the arrow up and down keys for paddle two.
 * Pre-Condition: The paddles will not be moved if you try to move them past the edge of the screen.
 */
function changeDirection(event){
    const keyPressed = event.keyCode;
    const paddleOneUp = 87;
    const paddleOneDown = 83;
    const paddleTwoUp = 38;
    const paddleTwoDown = 40;

    switch(keyPressed){
        case(paddleOneUp):
            if(paddleOne.y > 0){
                paddleOne.y -= paddleSpeed;
            }
            break;
        case(paddleOneDown):
            if(paddleOne.y < gameHeight - paddleOne.height){
                paddleOne.y += paddleSpeed;
            }
            break;
        case(paddleTwoUp):
            if(paddleTwo.y > 0){
                paddleTwo.y -= paddleSpeed;
            }
            break;
        case(paddleTwoDown):
            if(paddleTwo.y < gameHeight - paddleTwo.height){
                paddleTwo.y += paddleSpeed;
            }
            break;
    }
};

/**
 * Description: The displayed score is updated to reflect the current score of the game.
 */
function updateScore(){
    scoreText.textContent = `${playerOneScore} : ${playerTwoScore}`;
};

/**
 * Description: Resets the game to the start state.
 */
function resetGame(){
    playerOneScore = 0;
    playerTwoScore = 0;
    paddleOne = {width: 25, height: 100, x: 0, y: 200};
    paddleTwo = {width: 25, height: 100, x: gameWidth - 25, y: 200};
    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
    clearInterval(intervalID);
    gameStart();
};