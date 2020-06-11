const gridItemArr = document.getElementsByClassName("grid-item");
let gameTitle = document.getElementById("gameTitle");
let levelTitle = document.getElementById("score");
let gameover_message = document.getElementById("gameOverMessage");
let playagain = document.getElementById("playagain");

let offset = 75;
let score = 0;
let level = 1;
let offSquareIndex = 0;
let wholeGameReset = false;
// let play = true;

for(let i = 0; i < gridItemArr.length; i++) {
    gridItemArr[i].id = i; 
}

/* ------------------------------------------------------------------------------------------------------------------------ */

// commonColor() : function that returns an array of two rgb colors 
//      * first item in the array is the common color
//      * second item is the off color
let commonColor = function() {
    // this array will hold two values: the common color, and then the off color 
    let arrOfColors = [];

    // generating three values for the RGB color 
    let red = generateRandomNum();
    let green = generateRandomNum();
    let blue = generateRandomNum();
    
    // storing generated values in an arr
    const colorArr = [red, green, blue];
    arrOfColors.push("rgb(" + red + "," + green + "," + blue + ")");

    // finding index of largest value in color array 
    let offOne = colorArr.indexOf(findMax(colorArr));

    // subtracting the offset from the max value color without hitting negative
    colorArr[offOne] - offset > 0 ? colorArr[offOne] = colorArr[offOne] - offset : colorArr[offOne] = 0;

    // pushing the adjusted rgb color set
    arrOfColors.push("rgb(" + colorArr[0] + "," + colorArr[1] + "," + colorArr[2] + ")");
    
    // console.log(arrOfColors);
    return arrOfColors;
}

        // generateRandomNum() : function that is generating the random numbers ranging from (offset to 256)
        let generateRandomNum = function() {
            let num = Math.floor(Math.random() * 256);
            return num + offset > 256 ? num : num + offset;
        }

        // findMax() : function that finds the max value given an array
        const findMax = function(arr) {
            let max = arr[0];
            for(let i = 1; i < arr.length; i++) {
                if(arr[i] > max) {
                    max = arr[i];
                }
            }
            // if value is high enough, set the offset higher
            max > 150 ? offset = 100: null;
            return max;
        }

/* ------------------------------------------------------------------------------------------------------------------------ */

// checkAnswer() : function that checks if the provided square is the one that the user chooses.
const checkAnswer = function() {

    // if what the user has clicked is correct: 
    //      - add 100 to score && display score
    //      - increment level && display level
    if(this.id == offSquareIndex) {
        score+=100;
        level++;

        console.log("reached");
        gameTitle.innerHTML = "Level " + level;
        levelTitle.style.display = "block";
        levelTitle.innerHTML = score;
        reset();
    } else {
        gameOver();
    }
}

// reset() : function that generates new set of colors and populates the squares properly
const reset = function() {
    setupColors();
}


// setupColors() : reusable function to set the color combinations and set up the grid
const setupColors = function() {

    // generating the two new RGB combinations
    let colors = commonColor();

    // generating the index of the off square
    offSquareIndex = Math.floor((Math.random() * gridItemArr.length));
    
    // setting up the physical grid and adding a click event listener to each square 
    for(let i = 0; i < gridItemArr.length; i++) {
        gridItemArr[i].style.display = "block";
        gridItemArr[i].addEventListener("click", checkAnswer);
        if(i === offSquareIndex) {
            gridItemArr[i].style.backgroundColor = colors[1];
        } else {
            gridItemArr[i].style.backgroundColor = colors[0];
        }
    }
}


// Init() : function that sets up the initial stages of the game. 
// We set the title of the Game, generate the colors, generate which square will be off, and then set up the squares accurately
let init = function() {

    gameTitle.innerHTML = "Color Game";
    levelTitle.innerHTML = "";
    gameover_message.style.display = "none";
    playagain.style.display = "none";

    // populating the two colors;
    let colors = commonColor();
    // console.log(colors);
    // generating the position of the square that will be one color off
    offSquareIndex = Math.floor((Math.random() * gridItemArr.length));
    // console.log("init 1: " + offSquareIndex);

    // setting the squares up 
    setupColors();
    console.log("init: " + offSquareIndex);
}

// gameOver() : when user guesses incorrectly, we alert the user and restart the game within a second
const gameOver = function() {
    console.log("gameOver entered");
    // set wholeGameRest to true so that reset() method will update the titles 
    wholeGameReset = true;

    // reset level && score
    level = 1;
    score = 0;

    // display temporary game over message 
    gameTitle.innerHTML = "GAME OVER";
    levelTitle.style.display = "none";
    for(let i = 0; i < gridItemArr.length; i++) {
        gridItemArr[i].style.display = "none";
    }
    gameover_message.style.display = "block";
    gameover_message.innerHTML = "Game restarting... ";

    setTimeout(function() {
       init();
    }, 1000);
}

// start the game
init();