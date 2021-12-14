
export class GameEngine{
    constructor(board, stopWatch, httpService) {
        this.board = board
        this.stopWatch = stopWatch
        this.httpService = httpService
        this.gameIsEnded
    }

    leftClick(e){
        if(this.gameIsEnded) return
        let e_Square_xCord = JSON.parse(e.target.dataset.square).xCord
        let e_Square_yCord = JSON.parse(e.target.dataset.square).yCord
        let divElement = this.board.squares2d[e_Square_yCord][e_Square_xCord]
        let square = JSON.parse(divElement.dataset.square)
        if (square.isMARKED) return
        if (square.isMINE){
            this.endGameWithLoss()
            return
        }
        this.revealSquare(e_Square_xCord, e_Square_yCord)
        this.checkIfWin()
    }

    rightClick(e){
        if(this.gameIsEnded) return
        let e_Square_xCord = JSON.parse(e.target.dataset.square).xCord
        let e_Square_yCord = JSON.parse(e.target.dataset.square).yCord
        let divElement = this.board.squares2d[e_Square_yCord][e_Square_xCord]
        let square = JSON.parse(divElement.dataset.square)
        square.isMARKED = !square.isMARKED
        divElement.dataset.square = JSON.stringify(square)
        this.checkIfWin()
    }

    revealSquare(column, row) { //Recursion to reveal squares
        if (column < 0 || column >= this.board.squares2d[0].length || row < 0 || row >= this.board.squares2d.length)
            return
        let divElement = this.board.squares2d[row][column];
        let square = JSON.parse(divElement.dataset.square)
        if (square.isMINE){
            return
        }
        if(square.isHIDDEN){
            square.isHIDDEN = false
            divElement.dataset.square = JSON.stringify(square)
            if (square.neighbouringMines == ""){
                this.revealSquare(column-1, row-1);
                this.revealSquare(column-1, row);
                this.revealSquare(column-1, row+1);
                this.revealSquare(column, row-1);
                this.revealSquare(column, row+1);
                this.revealSquare(column+1, row-1);
                this.revealSquare(column+1, row);
                this.revealSquare(column+1, row+1);
            }
        }
    }

    checkIfWin(){
        for (let i = 0; i < this.board.BOARD_SIZE; i++) {
            for (let j = 0 ; j < this.board.BOARD_SIZE; j++){
                let divElement = this.board.squares2d[i][j]
                let square = JSON.parse(divElement.dataset.square)
                if (square.isMINE && !square.isMARKED) return
            }
        }
        this.gameIsEnded = true
        this.endGameWithWin()
    }

    endGameWithLoss(){
        this.stopWatch.stop()
        this.gameIsEnded = true
    }

    endGameWithWin(){
        this.stopWatch.stop()
        let myTime = this.stopWatch.getDuration()
        const playerName = prompt(`Victory. Your time is ${myTime}. Please enter your name`);
        this.httpService.send(playerName, myTime)
    }

}
