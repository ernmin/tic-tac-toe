function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    let gameOver = false;
    let moveCount = 0;

    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell())
        }
    }

    const getBoard = () => board;
    //check IIFE for the board

    const drawSymbol = (row, column, player) => {

        board[row][column].addMove(player);
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }

    const getSymbol = (row, column) => {
        return board[row][column];
    }

    const getRow = (row) => {
        let singleRow = [];
        for (let column = 0; column < 3; column++){
            singleRow[column] = board[row][column].getValue();
        };
        return singleRow;
    }

    const getColumn = (column) => {
        let singleColumn = [];
        for (let row = 0; row < 3; row++){
            singleColumn[row] = board[row][column].getValue();
        };
        return singleColumn;
    }

    const getFirstDiagonal = () => {
        let firstDiagonal = [];
        for( let i = 0; i < 3; i++){
            firstDiagonal[i] = board[i][i].getValue();
        };
        
        return firstDiagonal;
    }
    const getSecondDiagonal = () => {
        let secondDiagonal = [];
        for(let i = 0; i < 3; i++){
            secondDiagonal[i] = board[i][2 - i].getValue();    
        };
        
        return secondDiagonal;
    }

    const reset = () => {
        for(let i = 0; i < rows; i++){
            board[i] = [];
            for(let j = 0; j < columns; j++){
                board[i].push(Cell())
            }
        }
        printBoard();


       //Why is this not working? Something wrong with hasChildNodes()
    }

    return { getBoard, drawSymbol, printBoard, getSymbol, getRow, getColumn, getFirstDiagonal, getSecondDiagonal, gameOver, reset, moveCount};
}

function Cell() {
    let value = 0;

    const addMove = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addMove,
        getValue,
    };
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();

    let players = [
        {
            name: playerOneName,
            symbol: 1
        },
        {
            name: playerTwoName,
            symbol: 2
        }
    ];

    let activePlayer = players[0];
    

    const updatePlayerNames = () => {
        players[0].name = prompt("Enter Player One's Name: ", "Player One");
        while(players[0].name == '' || (players[0].name == null )){
            players[0].name = prompt("Enter Player One's Name: ", "Player One");
        }
        players[1].name = prompt("Enter Player Two's Name: ", "Player Two");
        while(players[1].name == '' || (players[1].name == null)){
            players[1].name = prompt("Enter Player Two's Name: ", "Player Two");
        }
    }

    const allEqual = (arr) => arr.every(val => val === arr[0]);

    const checkRow = () => {
        for (let eachRow = 0; eachRow < 3; eachRow ++){
            if (board.getRow(eachRow)[0] != 0 && allEqual(board.getRow(eachRow))) {
                console.log('row ', eachRow, ' is equal');
                return true;
                //break if winning combination is found and declare Active Player has won. Do not switch player over.
            }
            else {
                console.log('row ', eachRow, ' is not equal');
                //continue
            }
        }
        
    }

    const checkColumn = () => {
        for (let eachColumn = 0; eachColumn < 3; eachColumn ++){
            if (board.getColumn(eachColumn)[0] != 0 && allEqual(board.getColumn(eachColumn))) {
                console.log('column ', eachColumn, ' is equal');
                return true;
                //break if winning combination is found and declare Active Player has won. Do not switch player over.
            }
            else {
                console.log('column ', eachColumn, ' is not equal');
                //continue
            }
        }
    }

    const checkDiagonal = () => {
        if(board.getFirstDiagonal()[0]!= 0 && allEqual(board.getFirstDiagonal())){
            console.log('first diagonal is equal');
            return true;
        }
        else{
            console.log('first diagonal is not equal');
        }

        if(board.getSecondDiagonal()[0]!= 0 && allEqual(board.getSecondDiagonal())){
            console.log('second diagonal is equal');
            return true;
        }
        else{
            console.log('second diagonal is not equal');
        }

    }
    
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const resetActivePlayer = () => activePlayer = players[0];

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    //add game over function

    const winner = () => {
        let row = checkRow();
        let column = checkColumn();
        let diagonal = checkDiagonal();
        if(row || column || diagonal) {
            console.log('Game Over ', getActivePlayer().name, ' wins!');
            return true;
        }
        else{
            return false;
        }
    }

    const playRound = (row, column) => {
        if (board.getSymbol(row, column).getValue() != 0){
            console.log('Invalid move, please choose another square');
            return;
        }
        else if (board.gameOver == true){
            console.log('Game Over, move not allowed');
            return;
        }
        console.log(
            `${getActivePlayer().name} plays in row ${row} and column ${column}`
        );
        board.drawSymbol(row, column, getActivePlayer().symbol);
        board.moveCount = board.moveCount + 1;
//insert function here to check for win condition
        board.gameOver = winner();
        if (board.gameOver == true){
            return;
        }
        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        resetActivePlayer,
        updatePlayerNames,
        board, 
    };
}


function ScreenController() {
    const game = GameController();
    
    const playerTurnDiv = document.querySelector('#whose-turn');
    const resetButton = document.querySelector('#reset');
    
    const boxDiv = document.querySelectorAll('.box'); // just do for the first box first
    /*const boxDiv = document.querySelectorAll('.box');*/
    resetButton.addEventListener('click', () => {
        game.board.reset();
        game.resetActivePlayer();
        game.board.gameOver = false;
        game.board.moveCount = 0;
        game.updatePlayerNames();
        console.log(game.getActivePlayer(), ' is active player');
        for (let i = 0; i < boxDiv.length; i++){
            if (boxDiv[i].hasChildNodes()){
                boxDiv[i].removeChild(boxDiv[i].firstElementChild)
            }
        }

        updateScreen();
    })

    for(let i = 0; i < boxDiv.length; i++) {
        boxDiv[i].addEventListener('click', (e) => {
            const selectedRow = e.target.dataset.row;
            const selectedColumn = e.target.dataset.column;
            if(selectedRow === undefined || selectedColumn === undefined){
                return;
            }
            appendSymbol(selectedRow,selectedColumn);
            game.playRound(selectedRow,selectedColumn);
            /*const activePlayer = game.getActivePlayer();
            let image = document.createElement("img");
            if (activePlayer.symbol == 1) {
                image.src = "o-mark.png"
                appendChild(image);
            }*/
            
            updateScreen();
        })
    }

    //Add event listener for each box (done)
    //AppendChild upon click using the updateScreen method (done)
    //Disable the grid if the gameOver variable is 'true' (done)
    //End game condition to reset the screen (done)
    //How to display 'It's a tie!'

    const updateScreen = () => {
        const activePlayer = game.getActivePlayer();
        if(game.board.gameOver == true){
            playerTurnDiv.textContent = `Game Over! ${activePlayer.name} Wins`
        }
        
        else if (game.board.moveCount == 9){
            playerTurnDiv.textContent = "It's a tie!"
        }
        else{
            playerTurnDiv.textContent = `${activePlayer.name}'s turn`
        }
        
    }
    game.updatePlayerNames();
    updateScreen();
    

    const appendSymbol = (selectedRow, selectedColumn) => {
        console.log('gameOver is', game.board.gameOver);
        if(game.board.getSymbol(selectedRow,selectedColumn).getValue() != 0 || game.board.gameOver == true){
            return;
        }
        let boxtoappend = Number(selectedRow * 3) + Number(selectedColumn);
        const activePlayer = game.getActivePlayer();
        let image = document.createElement("img");
        if (activePlayer.symbol == 1) {
            image.src = "o-mark.png"
            boxDiv[boxtoappend].appendChild(image);
        }
        else {
            image.src = "x-mark.png"
            boxDiv[boxtoappend].appendChild(image);
        }
    }

    
    
}

ScreenController();

/*DOM Cache?*/