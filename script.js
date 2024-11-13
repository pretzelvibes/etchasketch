const container = document.querySelector("#container");
const btnNewGrid = document.querySelector("#newGrid");

const widthContainer = 500;
const heightContainer = 500;

btnNewGrid.addEventListener("click", createNewGrid);

function setContainer() {
    container.setAttribute("style", "width: " + widthContainer + "px; height: " + heightContainer + "px");
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
            e.currentTarget.setAttribute("style", "width: " + widthDiv + "px; height: " + heightDiv + "px; background-color: gray;");
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
    while (squareRow > 100){
        squareRow = +prompt("Square per row (max 100):");
    }
    deleteGrid();
    drawGrid(squareRow);
}

drawGrid(16);