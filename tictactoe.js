const cells = document.querySelectorAll(".cell");
const status_text = document.querySelector("#status_text");
const restart_btn = document.querySelector("#restart_btn");
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let current_player = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cell_clicked));
    restart_btn.addEventListener("click", restartGame);
    status_text.textContent = `${current_player}'s turn`;
    running = true;
}
function cell_clicked(){
    const cell_index = this.getAttribute("cell_index");

    if(options[cell_index] != "" || !running){
        return;
    }

    updateCell(this, cell_index);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = current_player;
    cell.textContent = current_player;
}
function changePlayer(){
    current_player = (current_player == "X") ? "O" : "X";
    status_text.textContent = `${current_player}'s turn`;
}
function checkWinner(){
    let round_won = false;

    for(let i = 0; i < win.length; i++){
        const condition = win[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            round_won = true;
            break;
        }
    }

    if(round_won){
        status_text.textContent = `${current_player} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        status_text.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    current_player = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    status_text.textContent = `${current_player}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}