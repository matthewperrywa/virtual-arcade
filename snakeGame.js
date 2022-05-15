const gameBoard = document.querySelector("#gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetButton = document.querySelector("#resetButton");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "black";
const snakeBorder = "white";
const foodColor = "#5b1782";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [{x:unitSize * 4, y:unitSize * 10}, {x:unitSize * 3, y:unitSize * 10}, 
             {x:unitSize * 2, y:unitSize * 10}, {x:unitSize, y:unitSize * 10}, {x:0, y:unitSize * 10}];

window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

gameStart();

/**
 * Description: Starts the game by creating all of the game components.
 */
function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};

/**
 * Description: Moves the snake and checks for collisions.
 * Pre-Condition: The game must be running (the player hasn't lost the game yet) for the snake to be moved.
 * Post-Condition: The location of the snake changes.
 */
function nextTick(){
    if(running) {
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else {
        displayGameOver();
    }
};

/**
 * Description: The board is cleared.
 * Post-Condition: The snake and fruit are no longer visible.
 */
function clearBoard(){
    context.fillStyle = boardBackground;
    context.fillRect(0, 0, gameWidth, gameHeight);
};

/**
 * Description: Food is given a random location.
 * Post-Condition: Food's X and Y values are changed.
 */
function createFood(){
    /**
     * Description: Returns a random location for the food given the lowest and highest values of the board.
     */
    function randomFood(min, max){
        const randomNumber = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randomNumber;
    }
    // x coordinate of the food is assigned
    foodX = randomFood(0, gameWidth - unitSize);
    // y coordinate of the food is assigned
    foodY = randomFood(0, gameWidth - unitSize);
};

/**
 * Description: Food is drawn at its location.
 */
function drawFood(){
    context.fillStyle = foodColor;
    context.fillRect(foodX, foodY, unitSize, unitSize);
};

/**
 * Description: Snake is moved.
 * Post-Condition: If the snake reaches the fruit, the score is increased by 1 and the size of the snake is increased by 1.
 */
function moveSnake(){
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY) {
        score+=1;
        scoreText.textContent = score;
        createFood();
    }
    else {
        snake.pop();
    }
};

/**
 * Description: Snake is drawn.
 */
function drawSnake(){
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};

/**
 * Description: Direction of snake is changed. Uses the arrow keys or WASD keys to change the direction.
 * Pre-Condition: The new direction must either be 90 degrees to the left or 90 degrees to the right of the snake's current direction.
 */
function changeDirection(event){
    const keyPressed = event.keyCode;
    const UP_WASD = 87;
    const UP_ARROW = 38;
    const LEFT_WASD = 65;
    const LEFT_ARROW = 37;
    const DOWN_WASD = 83;
    const DOWN_ARROW = 40;
    const RIGHT_WASD = 68;
    const RIGHT_ARROW = 39;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true) {
        case(keyPressed == LEFT_WASD && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == LEFT_ARROW && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP_WASD && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == UP_ARROW && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT_WASD && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == RIGHT_ARROW && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN_WASD && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
        case(keyPressed == DOWN_ARROW && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};

/**
 * Description: Checks to see if the snake has collided with anything.
 * Post-Condition: If a collision occurred, the variable determining if the game is running is set to false.
 */
function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >=gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};

/**
 * Description: Displays game over text on the game screen.
 */
function displayGameOver(){
    context.font = "50px Dubai Light";
    context.fillStyle = "#5b1782";
    context.textAlign ="center";
    context.fillText("G A M E    O V E R", gameWidth / 2, gameHeight / 2);
    running = false;
};

/**
 * Description: Resets the game to the start state.
 */
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [{x:unitSize * 4, y:unitSize * 10}, {x:unitSize * 3, y:unitSize * 10}, 
             {x:unitSize * 2, y:unitSize * 10}, {x:unitSize, y:unitSize * 10}, {x:0, y:unitSize * 10}];
    gameStart();
};