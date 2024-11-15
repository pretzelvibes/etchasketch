const container = document.querySelector("#container");
const btnNewGrid = document.querySelector("#newGrid");
const btnCleanCanvas = document.querySelector("#cleanCanvas");
const btnRandomRGB = document.querySelector("#randomRGB");
const btnEraser = document.querySelector("#eraser");
const btnDarkEffect = document.querySelector("#darkEffect");
const toggleButtons = document.querySelectorAll(".toggle-button");

const widthContainer = 500;
const heightContainer = 500;
let randomRGB = false;
let eraser = false;
let darkEffect = false;
let isPainting = false;

btnNewGrid.addEventListener("click", createNewGrid);
btnCleanCanvas.addEventListener("click", cleanCanvas);
btnRandomRGB.addEventListener("click", () => randomRGB = !randomRGB);
btnEraser.addEventListener("click", () => eraser = !eraser);
btnDarkEffect.addEventListener("click", () => darkEffect = !darkEffect);
document.addEventListener("mouseup", () => isPainting = false);

toggleButtons.forEach(button => {
    button.addEventListener("click", () => toggleButtonState(button));
});

function toggleButtonState(button) {
    if (button.classList.contains("active")) {
        button.classList.remove("active");
        resetState();
    } else {
        toggleButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        if (button.id === "randomRGB") {
            randomRGB = true;
            eraser = false;
            darkEffect = false;
        } else if (button.id === "eraser") {
            eraser = true;
            randomRGB = false;
            darkEffect = false;
        } else if (button.id === "darkEffect") {
            darkEffect = true;
            randomRGB = false;
            eraser = false;
        }
    }
}

function resetState() {
    randomRGB = false;
    eraser = false;
    darkEffect = false;
}

function cleanCanvas() {
    const squares = container.querySelectorAll("div");
    squares.forEach(cell => {
        cell.style.backgroundColor = "";
        cell.style.opacity = "";
        delete cell.dataset.darkEffect;
    });
}

function setContainer() {
    container.style.width = widthContainer + "px";
    container.style.height = heightContainer + "px";
}

function generateRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return [r, g, b];
}

function getPixelColor(pixel) {
    if (randomRGB) {
        return generateRandomRGB();
    } else if (eraser) {
        return [255, 255, 255];
    } else {
        return [80, 80, 80];
    }
}

function applyDarkEffect(pixel) {
    let opacity = Number(pixel.style.opacity);
    if (darkEffect) {
        if (pixel.dataset.darkEffect === undefined) {
            opacity = 0.1;
        } else {
            opacity += 0.1;
            if (opacity > 1) opacity = 1;
        }
        pixel.dataset.darkEffect = true;
        pixel.style.opacity = opacity;
    } else {
        delete pixel.dataset.darkEffect;
        pixel.style.opacity = 1;
    }
}

function drawGrid(squareRow = 16) {
    setContainer();
    const squareSize = widthContainer / squareRow;
    for (let i = 1; i <= squareRow * squareRow; i++) {
        const square = document.createElement("div");
        square.style.width = squareSize + "px";
        square.style.height = squareSize + "px";
        container.appendChild(square);

        square.addEventListener('mousedown', function (e) {
            if (e.button === 0) {
                isPainting = true;
                paintPixel(e.target);
            }
        });

        square.addEventListener('mouseenter', function (e) {
            if (e.button === 0 && isPainting) {
                paintPixel(e.target);
            }
        });
    }
}

function paintPixel(pixel) {
    const [r, g, b] = getPixelColor(pixel);
    pixel.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    applyDarkEffect(pixel);
}

function deleteGrid() {
    const nodeList = container.querySelectorAll("div");
    nodeList.forEach(node => node.remove());
}

function createNewGrid() {
    let squareRow;
    do {
        squareRow = parseInt(prompt("Square per row (max 100):"), 10);
    } while (isNaN(squareRow) || squareRow > 100);

    deleteGrid();
    drawGrid(squareRow);
}

drawGrid(16);