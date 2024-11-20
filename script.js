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
        for (let column = 0; column < 3; column ++){
            singleRow[column] = board[row][column].getValue();
        };
        return singleRow;
    }

    return { getBoard, drawSymbol, printBoard, getSymbol, getRow, };
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

    const checkRow = () => {

    }
    
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

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