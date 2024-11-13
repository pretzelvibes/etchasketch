const container = document.querySelector("#container");
const btnNewGrid = document.querySelector("#newGrid");
const checkRGB = document.querySelector("#randomRGB");
const checkEraser = document.querySelector("#eraser");



const widthContainer = 500;
const heightContainer = 500;
let randomRGB = false;
let eraser = false;

btnNewGrid.addEventListener("click", createNewGrid);
checkRGB.addEventListener("change", (e) => {
    randomRGB = e.currentTarget.checked;
});
checkEraser.addEventListener("change", (e) => {
    eraser = e.currentTarget.checked;
});

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

function drawGrid(squareRow = 16) {
    setContainer();
    for (let i = 1; i <= squareRow * squareRow; i++) {
        const div = document.createElement("div");
        const widthDiv = widthContainer / squareRow;
        const heightDiv = widthDiv;
        div.setAttribute("style", "width: " + widthDiv + "px; height: " + heightDiv + "px;");
        container.appendChild(div);
        div.addEventListener('mouseover', function (e) {
            let color = colorPixel();
            e.currentTarget.setAttribute("style", "width: " + widthDiv + "px; height: " + heightDiv + "px; background-color: rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
        });
    }
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