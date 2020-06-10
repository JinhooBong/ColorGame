const gridItemArr = document.getElementsByClassName("grid-item");
let gameTitle = document.getElementById("gameTitle");
let levelTitle = document.getElementById("score");
let directions = document.getElementById("directions");

let offset = 75;
let score = 0;
let level = 1;
let offSquareIndex = 0;
let wholeGameReset = false;
// let play = true;

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
    // adding event listener to each item 
    for(let i = 0; i < gridItemArr.length; i++) {
        gridItemArr[i].addEventListener("click", function() {
            // if user chooses correctly:
            //      - add 100 to score
            //      - level + 1
            //      - update the gameTitle html
            //      - reset for new squares 
            if(i === offSquareIndex) {
                score+=100;
                level++;
                gameTitle.innerHTML = "Level " + level;
                levelTitle.innerHTML = score;
                console.log("score: " + score);
                console.log("Level: " + level);
                reset();
            } else {
                console.log("Incorrect!");
                // play = false;
                // implement lose function
                gameOver();
            }
        })
    }
}

// resetColors() : function that generates new set of colors and populates the squares properly
const reset = function() {

    // if the whole game is reset, we want the text to reflect the start of the game.
    if(wholeGameReset) {
        gameTitle.innerHTML = "Color Game";
        levelTitle.innerHTML = "";
        directions.style.display = "none";
    }

    // creating new sets of colors
    let newColors = commonColor();

    // generating the new position of the square that will be one color off
    offSquareIndex = Math.floor((Math.random() * gridItemArr.length));
    console.log("reset 1: " + offSquareIndex);

    // setting the squares up
    for(let i = 0; i < gridItemArr.length; i++) {
        gridItemArr[i].style.display = "block";
        if(i === offSquareIndex) {
            gridItemArr[i].style.backgroundColor = newColors[1];
        } else {
            gridItemArr[i].style.backgroundColor = newColors[0];
        }
    }
    console.log("reset 2: " + offSquareIndex);
    checkAnswer(offSquareIndex);
}

// Init() : function that sets up the initial stages of the game. 
// We set the title of the Game, generate the colors, generate which square will be off, and then set up the squares accurately
let init = function() {

    gameTitle.innerHTML = "Color Game";
    levelTitle.style.display = "block";
    levelTitle.innerHTML = "";
    directions.style.display = "none";
    // populating the two colors;
    let colors = commonColor();
    // console.log(colors);
    // generating the position of the square that will be one color off
    offSquareIndex = Math.floor((Math.random() * gridItemArr.length));
    console.log("init 1: " + offSquareIndex);

    // setting the squares up 
    for(let i = 0; i < gridItemArr.length; i++) {
        gridItemArr[i].style.display = "block";
        if(i === offSquareIndex) {
            // console.log(arrOfColors[1]);
            gridItemArr[i].style.backgroundColor = colors[1];
        } else {
            gridItemArr[i].style.backgroundColor = colors[0];
        }
    }
    console.log("init 2: " + offSquareIndex);
    checkAnswer(offSquareIndex);
}

// gameOver() : when user guesses incorrectly, we alert the user and restart the game within a second
const gameOver = function() {
    wholeGameReset = true;
    level = 1;
    score = 0;
    gameTitle.innerHTML = "GAME OVER";
    levelTitle.style.display = "none";
    for(let i = 0; i < gridItemArr.length; i++) {
        gridItemArr[i].style.display = "none";
    }
    directions.style.display = "block";
    directions.innerHTML = "Game restarting... ";
    setTimeout(function() {
       reset();
    }, 1000);
}



// start the game
init();