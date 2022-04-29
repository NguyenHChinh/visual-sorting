// Variable used to draw on canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

async function quickSort(array) {
    /*
    Idea on Implementation:
    Instead of an array of integers, it is an array of objects with an integer
    value and a constant "index" value. Thus, when recursion happens, perhaps
    it is possible to pass down the "parts" of the array actively being worked on,
    and only update those values on the canvas screen? This might be a little
    harder than I thought..
    */
    displayArray(array);

    if (array.length <= 1) {
        return;
    }

    let leftArray = [];
    let rightArray = [];

    let pivot = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < pivot) {
            leftArray.push(array[i]);
        }
        else {
            rightArray.push(array[i]);
        }
    }

    await sleep(1000);
    array = quickSort(leftArray).concat(pivot, quickSort(rightArray));  
}

function quickSortHelper(array) {
    if (array.length <= 1) {
        return array;
    }
    console.log(array);
    let pivot = array[0];
    let leftArray = [];
    let rightArray = [];
    let sorted = [];

    for (let i = 1; i < array.length; i++) {
        if (array[i] < pivot) {
            leftArray.push(array[i]);
        }
        else {
            rightArray.push(array[i]);
        }
    }

    return quickSortHelper(leftArray).concat(pivot, quickSortHelper(rightArray));
}

function displayArray(array) {
    // Clearing canvas to draw updated image
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Stroke size
    strokeWidth = 1.4 * (Math.pow(0.982, document.getElementById("dataRange").value - 150)) - 0.5;
    ctx.lineWidth = 1.4 * (Math.pow(0.982, document.getElementById("dataRange").value - 150)) - 0.5;

    for (let i = 0; i < array.length; i++) {
        ctx.beginPath();
        ctx.moveTo(
            (500 / array.length) * i + 15 - (strokeWidth / 2),
            500
        );
        ctx.lineTo(
            (500 / array.length) * i + 15 - (strokeWidth / 2),
            500 - (500 / array.length) * array[i]
        );

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
    //disableInputs();
    quickSort(integerArray);
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

// Creating default array (size 50)
integerArray = generateArray(25);
displayArray(integerArray);
var speedchecker = document.getElementById("speed");
updateSpeed();