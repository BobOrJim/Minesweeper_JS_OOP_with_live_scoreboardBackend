import { Board } from './board-class.js'
//import { Square } from './Models/square-class.js'
import { GameEngine } from './gameEngine-class.js'
import { Presentation } from './presentation-class.js'
import { StopWatch } from './stopWatch-class.js'
import { HttpService } from './httpService-class.js'


const BOARD_SIZE = 10
const NUMBER_OF_MINES = 1
const httpService = new HttpService()

document.addEventListener("DOMContentLoaded", () => {
    init();
    console.clear();
});


function init() {
    let board = new Board(BOARD_SIZE, NUMBER_OF_MINES)
    let stopWatch = new StopWatch()
    let gameEngine = new GameEngine(board, stopWatch)
    let presentation = new Presentation(gameEngine, httpService);

    presentation.render()
    presentation.addEventListners()
}


document.getElementById("send").addEventListener("click", send)
function send(){
    httpService.send()
}

document.getElementById("recieve").addEventListener("click", recieve)
function recieve(){
    httpService.recieve()
}



//göra klass för highScore
//namn på class = highScoreService-class

//Vid behov kolla de 5 delarna i async grejen, så scoreboard blir automatisk.