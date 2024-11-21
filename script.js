function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

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

    //add a getColumn function
    //add a get Diagonal function

    return { getBoard, drawSymbol, printBoard, getSymbol, getRow, getColumn, };
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

    const players = [
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

    const allEqual = (arr) => arr.every(val => val === arr[0]);

    const checkRow = () => {
        for (let eachRow = 0; eachRow < 3; eachRow ++){
            if (board.getRow(eachRow)[0] != 0 && allEqual(board.getRow(eachRow))) {
                console.log('row ', eachRow, ' is equal');
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
                //break if winning combination is found and declare Active Player has won. Do not switch player over.
            }
            else {
                console.log('column ', eachColumn, ' is not equal');
                //continue
            }
        }
    }
    
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    //add game over function

    const playRound = (row, column) => {
        if (board.getSymbol(row, column).getValue() != 0){
            console.log('Invalid move, please choose another square');
            return;
        }
        console.log(
            `${getActivePlayer().name} plays in row ${row} and column ${column}`
        );
        board.drawSymbol(row, column, getActivePlayer().symbol);
//insert function here to check for win condition
        checkRow();
        checkColumn();
        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        board, 
    };
}

const game = GameController();

/*DOM Cache?*/