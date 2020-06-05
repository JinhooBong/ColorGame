const gridItemArr = document.getElementsByClassName("grid-item");
let offset = 75;
let score = 0;
let level = 1;

// this array will hold two values: the common color, and then the off color 
let arrOfColors = [];

let commonColor = function() {

    // generating three values for the RGB color 
    let red = generateRandomNum();
    let green = generateRandomNum();
    let blue = generateRandomNum();
    
    // storing generated values in an arr
    const colorArr = [red, green, blue];
    arrOfColors.push("rgb(" + red + "," + green + "," + blue + ")");

    // finding index of largest value in color array 
    let offOne = colorArr.indexOf(findMax(colorArr));
    // making sure value never hits negative
    colorArr[offOne] - offset > 0 ? colorArr[offOne] = colorArr[offOne] - offset : colorArr[offOne] = 0;

    arrOfColors.push("rgb(" + colorArr[0] + "," + colorArr[1] + "," + colorArr[2] + ")");
    // console.log(arrOfColors);
}

// generating random numbers starting from offset - 256
let generateRandomNum = function() {
    return Math.floor((Math.random() * 256) + offset);
}

// function to find the max value in a given array
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

// passing in the square we know is off and checking it with the one the user clicks
// if correct, score increases by 100, and level goes up
const checkAnswer = function(differentSquare) {
    for(let i = 0; i < gridItemArr.length; i++) {
        gridItemArr[i].addEventListener("click", function() {
            // console.log(i + " was clicked");
            if(i === differentSquare) {
                score+=100;
                level++;
                console.log("score: " + score);
                console.log("Level: " + level);
            } else {
                console.log("Incorrect!");
                // implement lose function
            }
        })
    }
}

let init = function() {
    // populating the two colors;
    commonColor();
    console.log(arrOfColors);
    // generating the position of the square that will be one color off
    let offSquare = Math.floor((Math.random() * gridItemArr.length));
    console.log(offSquare);
    checkAnswer(offSquare);
    for(let i = 0; i < gridItemArr.length; i++) {
        if(i === offSquare) {
            console.log(arrOfColors[1]);
            gridItemArr[i].style.backgroundColor = arrOfColors[1];
            console.log("success");
        } else {
            gridItemArr[i].style.backgroundColor = arrOfColors[0];
        }
    }
}

init();