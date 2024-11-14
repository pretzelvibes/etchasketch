const container = document.querySelector("#container");
const btnNewGrid = document.querySelector("#newGrid");
const btnCleanCanvas = document.querySelector("#cleanCanvas");
const checkRGB = document.querySelector("#randomRGB");
const checkEraser = document.querySelector("#eraser");
const checkDarkEffect = document.querySelector("#darkEffect");
const toggleButtons = document.querySelectorAll(".toggle-button");

const widthContainer = 500;
const heightContainer = 500;
let randomRGB = false;
let eraser = false;
let darkEffect = false;
let isPainting = false;

btnNewGrid.addEventListener("click", createNewGrid);
btnCleanCanvas.addEventListener("click", cleanCanvas);
checkRGB.addEventListener("change", (e) => randomRGB = e.currentTarget.checked);
checkEraser.addEventListener("change", (e) => eraser = e.currentTarget.checked);
checkDarkEffect.addEventListener("change", (e) => darkEffect = e.currentTarget.checked);
document.addEventListener("mouseup", () => isPainting = false);

toggleButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");
    });
});

function cleanCanvas() {
    const squares = container.querySelectorAll("div");
    squares.forEach(cell => {
        cell.style.backgroundColor = "";
    })
}

function setContainer() {
    container.setAttribute("style", "width: " + widthContainer + "px; height: " + heightContainer + "px");
}

function generateRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return [r, g, b];
}

function colorPixel() {
    if (randomRGB) {
        return generateRandomRGB();
    } else if (eraser) {
        return [255, 255, 255]
    } else {
        return [80, 80, 80];
    }
}

function opacity(currentOpacity) {
    if (darkEffect) {
        let opacity = Number(currentOpacity);
        if (opacity < 1) {
            return (opacity * 10 + 1) / 10;
        } else {
            return 1;
        }
    } else {
        return 1;
    }
}

function drawGrid(squareRow = 16) {
    setContainer();
    for (let i = 1; i <= squareRow * squareRow; i++) {
        const square = document.createElement("div");
        const squareSize = widthContainer / squareRow;
        square.style.cssText = "width: " + squareSize + "px; height: " + squareSize + "px;"
        container.appendChild(square);
        square.addEventListener('mousedown', function (e) {
            isPainting = true;
            drawPixel(e);
        });
        square.addEventListener('mouseenter', function (e) {
            if (isPainting) {
                drawPixel(e);
            }
        });
    }
}

function drawPixel(e) {
    const [r, b, g] = colorPixel();
    e.target.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    e.target.style.opacity = opacity(e.target.style.opacity);
}

function deleteGrid() {
    const nodeList = container.querySelectorAll("div");
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].remove();
    }
}

function createNewGrid() {
    const squareRow = +prompt("Square per row (max 100):");
    while (squareRow > 100) {
        squareRow = +prompt("Square per row (max 100):");
    }
    deleteGrid();
    drawGrid(squareRow);
}

drawGrid(16);