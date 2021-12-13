//import { times, range } from "lodash/fp" //Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.
import { Square } from './Models/square-class.js'

export class Board{
    constructor(BOARD_SIZE, NUMBER_OF_MINES) {
        this.BOARD_SIZE = BOARD_SIZE
        this.NUMBER_OF_MINES = NUMBER_OF_MINES
        this.squares2d = this.initBoard()
    }

    //A Board class contain squares that is a 2d array of divs, where each div contain a square object.
    initBoard(){
        let emptyBoard = this.createEmptyBoard()
        let minePositions = this.getMinePositions(this.BOARD_SIZE, this.NUMBER_OF_MINES)
        let boardWithMines = this.addMinesToBoard(emptyBoard, minePositions)
        let bordWithMinesAndNumbers = this.addNumbersToBoard(boardWithMines)
        return bordWithMinesAndNumbers;
    }

    addMinesToBoard(board, minePositions){
        minePositions.forEach(element => {
            let x = element[0]
            let y = element[1]
            let square = JSON.parse(board[x][y].dataset.square)
            square.isMINE = true
            board[x][y].dataset.square = JSON.stringify(square)
        })
        return board
    }

    addNumbersToBoard(board){
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++){
                let square = JSON.parse(board[i][j].dataset.square)
                if(!square.isMINE){
                    square.neighbouringMines = this.getNumberOfNeighbouringMines(board, square)
                    board[i][j].dataset.square = JSON.stringify(square)
                }
            }
        }
        return board
    }

    getNumberOfNeighbouringMines(board, square){
        //console.log(board)
        let numberOfNeighbouringMines = 0
        for (let i = square.xCord -1; i <= square.xCord + 1; i++) {
            for (let j = square.yCord - 1; j <= square.yCord + 1; j++){
                if(i >= 0 && i < this.BOARD_SIZE && j >= 0 && j < this.BOARD_SIZE){
                    let square = JSON.parse(board[j][i].dataset.square)
                    if(square.isMINE){
                        numberOfNeighbouringMines++
                    }
                }
            }
        }
        if (numberOfNeighbouringMines==0){
            return ""
        }
        return numberOfNeighbouringMines
    }


    getMinePositions(boardSize, numberOfMines) {
        const positions = []
        while (positions.length < numberOfMines) {
          const position = [
            Math.floor(Math.random() * boardSize),
            Math.floor(Math.random() * boardSize),
          ]
          if (positions.some(e => e.position === position)) {
            continue
          }
          positions.push(position)
        }
        //console.log(positions)
        return positions
        return [
            [1, 1],
            [2, 2],
            [3, 3],
            [4, 1],
            [5, 5],
            [1, 7],
            [1, 8],
            [1, 9],
            [9, 1],
            [9, 9]
          ];
      }

    createEmptyBoard(){
        var x = new Array(this.BOARD_SIZE);
        for (let i = 0; i < x.length; i++) {
            x[i] = new Array(this.BOARD_SIZE);
            for (let j = 0; j < x[i].length; j++){ //Fill board with square objects
                let newSquare = new Square();
                newSquare.xCord = j
                newSquare.yCord = i
                let squareDiv = document.createElement('div')
                squareDiv.dataset.square = JSON.stringify(newSquare)
                x[i][j] = squareDiv
            }
        }
        return x;
    }
}
