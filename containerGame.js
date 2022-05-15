const gameBoard = document.querySelector("#gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetButton = document.querySelector("#resetButton");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const barColor = "#5b1782";
const barBorderColor = "black";
let barLength = 0;
let barPoints = 0;
let barGoingDown = true;
let barStopped = false;
let circleStopped = false;
let fullCirclePoints = 0;
const targetBorderColor = "black";
const targetColor = "#5b1782";
let targetWidth = 0;
let targetPoints = 0;
let targetGoingRight = true;
let targetStopped = false;
const fullCircleColor = "#5b1782";
const fullCircleBorderColor = "#black";
const fullCircleRadius = 25;
let fullCircleY = 280;
let fullCircleGoingDown = false;
const emptyCircleBorderColor = "black";
const emptyCircleRadius = 25;
let intervalID;

window.addEventListener("keydown", punch);
resetButton.addEventListener("click", resetGame);

gameStart();

/**
 * Description: Starts the game by creating all of the game components.
 */
function gameStart(){
    nextTick();
};

/**
 * Description: Draws and moves the various containers and shapes.
 */
function nextTick(){
    intervalID = setTimeout(() => {
        clearBoard();
        drawBar();
        drawCircles();
        drawTarget();
        drawText();
        nextTick();
    }, 1)
};

/**
 * Description: Stops one of the shapes. Use the A, S, and D keys to stop their corresponding shapes. If the shape is already stopped, it will unstop it.
 * Post-Condition: The score will be changed.
 */
function punch(event){
    switch(event.keyCode){
        case(65):
            barStopped = !barStopped;
            barPoints = barLength;
            if(barStopped == false){
                barPoints = 0;
            }
            break;
        case(83):
            circleStopped = !circleStopped;
            fullCirclePoints = 80 - Math.abs(fullCircleY - 200);
            if(circleStopped == false){
                fullCirclePoints = 0;
            }
            break;
        case(68):
            targetStopped = !targetStopped;
            targetPoints = targetWidth;
            if(targetStopped == false){
                targetPoints = 0;
            }
            break;
    }
    let displayedScore = "";

    // adds leading zeros to the displayed score
    if(barPoints + fullCirclePoints + targetPoints < 10){
        displayedScore = `00${barPoints + fullCirclePoints + targetPoints}`;
    }
    else if(barPoints + fullCirclePoints + targetPoints < 100){
        displayedScore = `0${barPoints + fullCirclePoints + targetPoints}`;
    }
    else{
        displayedScore = barPoints + fullCirclePoints + targetPoints;
    }
    scoreText.textContent = `${displayedScore} / 300`;
};

/**
 * Description: Resets the game to the start state.
 */
function resetGame(){
    barLength = 0;
    barPoints = 0;
    barGoingDown = true;
    barStopped = false;
    circleStopped = false;
    fullCirclePoints = 0;
    targetWidth = 0;
    targetPoints = 0;
    targetGoingRight = true;
    targetStopped = false;
    fullCircleY = 280;
    fullCircleGoingDown = false;
    clearInterval(intervalID);
    scoreText.textContent = "000 / 300";
    gameStart();
};

/**
 * Description: Draws the left shape and its container.
 */
function drawBar(){
    context.lineWidth = 4;
    context.strokeStyle = barBorderColor;
    context.fillStyle = barColor;
    if(barStopped == true){
        barLength = barLength;
    }
    else if(barLength == 0){
        barLength = barLength + 2;
        barGoingDown = !barGoingDown;
    }
    else if((barLength < 150) && barGoingDown == false){
        barLength = barLength + 2;
    }
    else if((barLength < 150) && barGoingDown == true){
        barLength = barLength - 2;
    }
    else if(barLength == 150){
        barLength = barLength - 2;
        barGoingDown = !barGoingDown;
    }
    context.fillRect(50, 300, 50, -barLength);
    context.strokeRect(50, 150, 50, 150);
};

/**
 * Description: Draws the individual scores and lists the shape controls.
 */
function drawText(){
    context.font = "bold 50px Dubai Light";
    context.fillStyle = "black";
    context.fillText("A            S          D", 60, 350);
    let displayedBarPoints = "";
    if(barPoints < 10){
        displayedBarPoints = `00${barPoints}/150`;
    }
    else if(barPoints < 100){
        displayedBarPoints = `0${barPoints}/150`;
    }
    else{
        displayedBarPoints = `${barPoints}/150`;
    }
    let displayedFullCirclePoints = "";
    if(fullCirclePoints < 10){
        displayedFullCirclePoints = `0${fullCirclePoints}/80`;
    }
    else{
        displayedFullCirclePoints = `${fullCirclePoints}/80`;
    }
    let displayedTargetPoints = "";
    if(targetPoints < 10){
        displayedTargetPoints = `0${targetPoints}/70`;
    }
    else{
        displayedTargetPoints = `${targetPoints}/70`;
    }
    context.font = "25px Dubai Light";
    context.fillStyle = "black";
    context.fillText(`${displayedBarPoints}                ${displayedFullCirclePoints}              ${displayedTargetPoints}`, 30, 430);
};

/**
 * Description: Draws the right shape and its container.
 */
function drawTarget(){
    context.lineWidth = 4;
    context.strokeStyle = targetBorderColor;
    context.fillStyle = targetColor;
    if(targetStopped == true){
        targetWidth = targetWidth;
    }
    else if(targetWidth == 0){
        targetWidth = targetWidth + 1;
        targetGoingRight = true;
    }
    else if((targetWidth < 70) && targetGoingRight == true){
        targetWidth = targetWidth + 1;
    }
    else if((targetWidth < 70) && targetGoingRight == false){
        targetWidth = targetWidth - 1;
    }
    else if(targetWidth == 70){
        targetWidth = targetWidth -1;
        targetGoingRight = false;
    }
    context.fillRect(380, 150, targetWidth, 150);
    context.strokeRect(380, 150, 70, 150);
};

/**
 * Description: Draws the middle shape and its container.
 */
function drawCircles(){
    context.strokeStyle = emptyCircleBorderColor;
    context.lineWidth = 4;
    context.beginPath();
    context.arc(255, 200, emptyCircleRadius, 0, 2 * Math.PI);
    context.stroke();
    context.strokeStyle = fullCircleBorderColor;
    context.fillStyle = fullCircleColor;
    context.lineWidth = 4;
    context.beginPath();
    if(circleStopped){
        fullCircleY = fullCircleY;
    }
    else if(fullCircleY == 280){
        fullCircleY = fullCircleY - 2;
        fullCircleGoingDown = false;
    }
    else if(fullCircleY > 120){
        if (fullCircleGoingDown == true) {
            fullCircleY = fullCircleY + 2;
        }
        else{
            fullCircleY = fullCircleY - 2;
        }
    }
    else{
        fullCircleY = fullCircleY + 2;
        fullCircleGoingDown = true;
    }
    context.arc(255, fullCircleY, fullCircleRadius, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
};

/**
 * Description: Clears the board.
 */
function clearBoard(){
    context.fillStyle = boardBackground;
    context.fillRect(0, 0, gameWidth, gameHeight);
};