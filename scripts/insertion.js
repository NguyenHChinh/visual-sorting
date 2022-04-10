// Variable used to draw on canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Modifiable multiplier for the delay between sorting operations
// Default: 1
// Higher = More Delay
// TODO: Add speed adjuster?
sleepMultiplier = 1;

async function insertionSort(array) {
    // Delay between operations, dependent on how large the array is
    sleepTime = speedchecker.value;
    sleepTime *= sleepMultiplier

    // Used to visualize the sorted portion of array
    sortedArray = 0;
    
    // Runs through array once, sorting as it goes through
    for (let i = 0; i < array.length; i++) {
        // Swaps the currently value and the value before if needed until sorted
        currentIndex = i;
        while (array[currentIndex] < array[currentIndex - 1]) {
            let temp = array[currentIndex];
            array[currentIndex] = array[currentIndex-1];
            array[currentIndex-1] = temp;
            currentIndex--;
            displayArray(array, currentIndex, sortedArray + 1);
            await sleep(sleepTime);
        }

        sortedArray++;
        displayArray(array, i + 1, sortedArray);
        await sleep(sleepTime);
    }

    checkSort(array, sleepTime);
}

function displayArray(array, current, sorted) {
    // Clearing canvas to draw updated image
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Stroke size
    strokeWidth = 1.4 * (Math.pow(0.982, document.getElementById("dataRange").value - 150)) - 0.5;
    ctx.lineWidth = 1.4 * (Math.pow(0.982, document.getElementById("dataRange").value - 150)) - 0.5;

    for (let i = 0; i < array.length; i++) {
        ctx.beginPath();
        ctx.moveTo(
            (500 / array.length) * i + 15 - (array.length / 10),
            500
        );
        ctx.lineTo(
            (500 / array.length) * i + 15 - (array.length / 10),
            500 - (500 / array.length) * array[i]
        );

        // Current index being looked at
        if (i == current) {
            ctx.strokeStyle = "red";
        }
        else {
            if (i < sorted) {
                ctx.strokeStyle = "green";
            }
            else {
                ctx.strokeStyle = "black";
            }
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
    insertionSort(integerArray);
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