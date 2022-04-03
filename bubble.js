var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

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
        ctx.stroke();
    }
}

// Sleep function (to delay each action in sorting algorithm)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
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
            await sleep(1);
        }
    }
}

// Creating default array (size 50)
integerArray = generateArray(50);
displayArray(integerArray, -2);

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
    bubbleSort(integerArray);
    displayArray(integerArray)
});
document.body.appendChild(sortButton);