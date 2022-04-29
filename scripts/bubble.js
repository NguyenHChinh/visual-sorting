// Variable used to draw on canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Modifiable multiplier for the delay between sorting operations
// Default: 1
// Higher = More Delay
// TODO: Add speed adjuster?
sleepMultiplier = 1;

async function bubbleSort(array) {
    // Delay between operations, dependent on how large the array is
    sleepTime = speedchecker.value;
    sleepTime *= sleepMultiplier

    // Iterate through the array
    for (let i = 0; i < array.length; i++) {
        displayArray(array, -1);
        await sleep(sleepTime);
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


function displayArray(array, current) {
    // Clearing canvas to draw updated image
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Stroke size
    strokeWidth = 1.4 * (Math.pow(0.982, document.getElementById("dataRange").value - 150)) - 0.5;
    ctx.lineWidth = 1.4 * (Math.pow(0.982, document.getElementById("dataRange").value - 150)) - 0.5;

    for (let i = 0; i < array.length; i++) {
        ctx.beginPath();
        ctx.moveTo(
            ((500 / array.length) * i + 15) - (array.length / 10),
            500
        );
        ctx.lineTo(
            ((500 / array.length)) * i + 15 - (array.length / 10),
            500 - (500 / array.length) * array[i]
        );

        if (i == current + 1) {
            ctx.strokeStyle = "red";
        }
        else {
            ctx.strokeStyle = "black";
        }

        ctx.stroke();
    }
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
    // Updating speed value
    updateSpeed();
}

var speedchecker = document.getElementById("speed");

// Creating default array (size 50)
integerArray = generateArray(25);
displayArray(integerArray);
updateSpeed();