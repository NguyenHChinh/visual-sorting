var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Function to create a randomized array of integers of any given length
function generateArray(size) {
    array = []
    
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
            (500 / array.length) * i,
            500
        );
        ctx.lineTo(
            (500 / array.length) * i,
            500 - (500 / array.length) * integerArray[i]
        );
        ctx.stroke();
    }
}

generateArray(100);
integerArray = generateArray(100);
displayArray(integerArray, -2);