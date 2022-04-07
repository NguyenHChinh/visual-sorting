// Sleep function (to delay each action in sorting algorithm)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Creating shuffled array of any given size
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
    document.getElementById("speed").disabled = false;
    document.getElementById("sortBtn").className = "button";
    document.getElementById("shuffleBtn").className = "button";
    document.getElementById("dataRange").className = "slider";
}

function disableInputs() {
    document.getElementById("dataRange").disabled = true;
    document.getElementById("shuffleBtn").disabled = true;
    document.getElementById("sortBtn").disabled = true;
    document.getElementById("speed").disabled = true;
    document.getElementById("sortBtn").className = "button disabled";
    document.getElementById("shuffleBtn").className = "button disabled";
    document.getElementById("dataRange").className = "slider disabled";
}

function updateSpeed() {
    speedchecker.value = (-0.12 * document.getElementById("dataRange").value + 13).toFixed(0);
}