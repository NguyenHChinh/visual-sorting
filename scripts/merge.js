// Variable used to draw on canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

async function mregeSort(array) {
    displayArray(array);
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


// Creating default array (size 50)
integerArray = generateArray(25);
displayArray(integerArray);
updateSpeed();