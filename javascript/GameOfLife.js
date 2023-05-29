let GRID_SIZE = 30;
let CELL_SIZE = 20;

let grid = []; // 0 = dead, 1 = alive

let gameState = 0; // 0 = stopped, 1 = running

let startButton;
let stopButton;
let clearButton;

function setup() {
    frameRate(30)
    createCanvas(1500, 1500);
    setupGrid();

    createButtons();
    document.getElementById("statusMessage").innerHTML = "Click Grid to make cells alive/dead and press Start";
}

function startGame(){
    if(gameState == 0){
        frameRate(2)
        gameState = 1;
        document.getElementById("statusMessage").innerHTML = "Game is running";
    }
}

function stopGame() {
    if(gameState == 1){
        frameRate(30)
        gameState = 0;
        document.getElementById("statusMessage").innerHTML = "Game is stopped";
    }
}

function resetGrid(){
    if(gameState == 0){
        setupGrid();
        document.getElementById("statusMessage").innerHTML = "Grid has been reset";
    }
}

//TODO not ready yet, buttons are not moving correctly
function updateGridSize(newSize){
    if(gameState == 0){
        GRID_SIZE = newSize;

        document.getElementsByTagName("button").forEach((button) => {
            button.remove();
        });

        setupGrid();
        createButtons();

        document.getElementById("statusMessage").innerHTML = "Grid size has been updated to " + GRID_SIZE + "x" + GRID_SIZE;
    }
}

//setup the grid by making all cells 0 (dead)
function setupGrid(){
    grid = [];
    for(let i = 0; i < GRID_SIZE; i++){
        let row = [];
        for(let j = 0; j < GRID_SIZE; j++){
            row.push(0);
        }
        grid.push(row);
    }
}

function createButtons(){
    startButton = createButton("Start");
    stopButton = createButton("Stop");
    clearButton = createButton("Reset Grid");

    startButton.position(GRID_SIZE * CELL_SIZE + 30, 100);
    stopButton.position(GRID_SIZE * CELL_SIZE + 30, 125);
    clearButton.position(GRID_SIZE * CELL_SIZE + 30, 150);

    startButton.size(100, 25);
    stopButton.size(100, 25);
    clearButton.size(100, 25);

    startButton.style("background-color", "lightgreen");
    stopButton.style("background-color", "lightcoral");
    clearButton.style("background-color", "lightblue");

    startButton.mousePressed(startGame);
    stopButton.mousePressed(stopGame);
    clearButton.mousePressed(resetGrid);
}

function draw() {
    grid.forEach((gridRow, row) => {
        gridRow.forEach((gridCol, col) => {
            stroke("lightgrey");
            strokeWeight(2);
            fill(gridCol == 1 ? "black" : "transparent"); // Black if live, transparent if dead
            rect(row * CELL_SIZE, col * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        });
    });
    if(gameState == 1){
        updateGrid();
    }
}

function checkNeighbours(row, col){
    let count = 0;
    
    for (let i = -1; i < 2; i++) { //This checks the row above and row below
        if (col + i >= 0 && col + i < GRID_SIZE - 1) { // Check for valid column
            if (row > 0 && grid[row - 1][col + i] == 1) {
                count++;
            }
            if (row < GRID_SIZE - 1 && grid[row + 1][col + i] == 1) { 
            count++;
            }
        }
    }
    if (col - 1 >= 0 && grid[row][col - 1] == 1) { // Check left cell
        count++;
      }
      if (col + 1 < GRID_SIZE - 1 && grid[row][col + 1] == 1) { // Check right cell
        count++;
      }

      return count;
}

function mousePressed(){
    if(gameState == 0){
        let x = Math.floor(mouseX / CELL_SIZE);
        let y = Math.floor(mouseY / CELL_SIZE);
        if(x <= GRID_SIZE-1 && y <= GRID_SIZE-1){
            grid[x][y] = grid[x][y] == 0 ? 1 : 0;
        }
    }
}

function updateGrid(){
    let nextGridState = [];
    grid.forEach((gridRow, row) => {
        let nextRow = [];
        gridRow.forEach((gridCol, col) => {
            let curCell = gridCol;
            let neighbourCount = checkNeighbours(row, col);
            if(curCell == 1 && neighbourCount < 2){
                curCell = 0;
            }else if(curCell == 1 && neighbourCount > 3){
                curCell = 0;
            }else if(curCell == 0 && neighbourCount == 3){
                    curCell = 1;
            }
            nextRow.push(curCell);
        });
        nextGridState.push(nextRow);
    });
    grid = nextGridState;
}


//Testing Funtions
function printCurGrid(){
    console.log(grid);
}
