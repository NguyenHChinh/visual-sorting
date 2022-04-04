// Variable used to draw on canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Modifiable multiplier for the delay between sorting operations
// Default: 1
// Higher = More Delay
// TODO: Add speed adjuster?
sleepMultiplier = 1;

// Function to create a randomized array of integers of any given length
function generateArray(size) {
    let array = []
    
    // Push integers 1 through size onto array [1, 2, 3, ..., size-1, size]
    for (let i = 0; i < size; i++) {
        array.push(i + 1)
    }

    // Shuffle the array
    shuffle(array);
    
    return array;
}

// Function to shuffle an array
function shuffle(array) {
    // Setting currentIndex to the array's length (end of array)
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
        // Picking a random element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap with current element
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function displayArray(array, current) {
    // Clearing canvas to draw updated image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < array.length; i++) {
        ctx.beginPath();
        ctx.moveTo(
            (500 / array.length) * i + 10,
            500
        );
        ctx.lineTo(
            (500 / array.length) * i + 10,
            500 - (500 / array.length) * array[i]
        );

        if (i == current + 1) {
            ctx.strokeStyle = "red";
        }
        else {
            ctx.strokeStyle = "black";
        }
        
        ctx.lineWidth = 1.4 * (Math.pow(0.982, document.getElementById("dataRange").value - 150)) - 0.5;
        ctx.stroke();
    }
}

// Sleep function (to delay each action in sorting algorithm)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
    // Delay between operations, dependent on how large the array is
    sleepTime = -0.12 * document.getElementById("dataRange").value + 13
    sleepTime *= sleepMultiplier

    // Iterate through the array
    for (let i = 0; i < array.length; i++) {
        // Move through array from index 0 to last unsorted index
        for (let j = 0; j < array.length - (i + 1); j++) {
            // Comparing current value with next value, if current value is GREATER, swap two values
            if (array[j] > array[j+1]) {
                let temp = array[j+1];
                array[j+1] = array[j];
                array[j] = temp;
            }
            // Redraw visual and then keep it on screen for 1ms
            displayArray(array, j);
            await sleep(sleepTime);
        }
    }

    checkSort(array, sleepTime);
}

async function checkSort(array, sleepTime) {
    // Iterate through array
    for (let i = 0; i < array.length; i++) {
        // If value is greater than next value, then it is not sorted.
        displayArray(array, i);
        if (array[i] > array[i+1]) {
            alert("Error! There was a problem that occured while sorting..");
            return;
        }
        await sleep (sleepTime);
    }
    displayArray(array);
    enableInputs();
}

function enableInputs() {
    document.getElementById("dataRange").disabled = false;
    document.getElementById("shuffleBtn").disabled = false;
    document.getElementById("sortBtn").disabled = false;
    document.getElementById("sortBtn").className = "button";
    document.getElementById("shuffleBtn").className = "button";
    document.getElementById("dataRange").className = "slider";
}

function disableInputs() {
    document.getElementById("dataRange").disabled = true;
    document.getElementById("shuffleBtn").disabled = true;
    document.getElementById("sortBtn").disabled = true;
    document.getElementById("sortBtn").className = "button disabled";
    document.getElementById("shuffleBtn").className = "button disabled";
    document.getElementById("dataRange").className = "slider disabled";
}

// Creating shuffle button
let shuffleButton = document.createElement("button");
shuffleButton.innerHTML = "Shuffle";
shuffleButton.id = "shuffleBtn"
shuffleButton.className = "button"
shuffleButton.addEventListener("click", function() {
    shuffle(integerArray);
    displayArray(integerArray);
});
document.body.appendChild(shuffleButton);

// Creating sort button
let sortButton = document.createElement("button");
sortButton.innerHTML = "Sort";
sortButton.id = "sortBtn"
sortButton.className = "button"
sortButton.addEventListener("click", function() {
    disableInputs();
    bubbleSort(integerArray);
});
document.body.appendChild(sortButton);

// Adding functions to slider
var slider = document.getElementById("dataRange");
slider.oninput = function() {
    // Deleting current array
    integerArray.length = 0;
    // Creating new array of appropriate size from slider
    integerArray = generateArray(this.value);
    // Display new array
    displayArray(integerArray);
}

// Creating default array (size 50)
integerArray = generateArray(25);
displayArray(integerArray, -2);