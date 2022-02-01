// Game Constants & Variables
// const board = document.getElementById("board");
let inputDir = {x: 0, y: 0};
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7};
let score = 0;
// let scoreBox = document.querySelector(".scoreBox"); 
let highScore = 0;


//  Game Function

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <= 0) {
        return true;
    }
    
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press  any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        scoreBox.textContent = "Score: 0"
    }

    // If you have eaten the food, increment the score and rearrange the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b =16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
        score += 1;
        scoreBox.textContent = "Score: " + score;
        if(score>highScore){
            highScore = score;
            localStorage.setItem("hiScore", JSON.stringify(highScore));
            hiScoreBox.textContent = "High Score: " + highScore;
        }
        
      
    }

    // Moving the snake
    for(let i = snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
         const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart =e.y;
        snakeElement.style.gridColumnStart =e.x;
        
        if(index === 0){
            snakeElement.classList.add("head");
        }else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    })
    // Display the food
    const foodElement = document.createElement("div");
        foodElement.style.gridRowStart =food.y;
        foodElement.style.gridColumnStart =food.x;
        foodElement.classList.add("food");
        board.appendChild(foodElement);
}

//  Main Logic  Starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown", e =>{
    inputDir = {x: 0, y: 1} // Start The Game
    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    } 
})


// Loccal Storage
let hiScore = localStorage.getItem("hiScore");
if(hiScore === null){
     localStorage.setItem("hiScore", JSON.stringify(highScore));
}else{
    highScore = JSON.parse(hiScore);
    hiScoreBox.textContent = "High Score: " + highScore;
}