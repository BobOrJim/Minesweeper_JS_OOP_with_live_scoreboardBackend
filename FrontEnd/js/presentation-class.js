export class Presentation{
  constructor(gameEngine, httpService) {
    this.gameEngine = gameEngine
    this.httpService = httpService
    this.gameEngine.stopWatch.start() //The game starts immediately
    this.myDivBoardId = document.getElementById("myDivBoardId")
    this.asyncPerpetualTimer100ms()
    this.asyncPerpetualTimer1000ms()
  }

  
  render() {
    let gameIsEnded = this.gameEngine.gameIsEnded
    for (let i = 0; i < this.gameEngine.board.squares2d.length; i++) {
      for (let j = 0; j < this.gameEngine.board.squares2d[0].length; j++){
        let divElement = this.gameEngine.board.squares2d[i][j]
        let square = JSON.parse(divElement.dataset.square)
        if (!square.isHIDDEN){
          divElement.innerHTML = square.neighbouringMines;
        }
        divElement.className = this.getSquareCSSStyle(square, gameIsEnded)
        myDivBoardId.appendChild(divElement)
      }
    }
    this.minesLeft()
  }

  scoreBoard(){
    let scoreBoardTable = document.getElementById("scoreBoard")

    // Create an empty <tr> element and add it to the 1st position of the table:
    let row = scoreBoardTable.insertRow(0);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    let positionCell = row.insertCell(0);
    let nameCell = row.insertCell(1);
    let timeCell = row.insertCell(1);

    // Add some text to the new cells:
    cell1.innerHTML = "NEW CELL1";
    cell2.innerHTML = "NEW CELL2";
    cell2.innerHTML = "NEW CELL2";

    
    //scoreBoardDiv.innerHTML += "haloj"
    //this.httpService.recieve()
    console.log(this.httpService.dataFromBackend)
    //minesLeftDiv.innerHTML = `Mines left: ${mines - markCounter}`

  }



















  addEventListners(){
    let squares = document.querySelectorAll(".square")
    squares.forEach(element => {
      element.addEventListener("click", e => { //leftClick
        this.gameEngine.leftClick(e)
        this.render()
      })
      element.addEventListener("contextmenu", e => { //rightClick
        e.preventDefault()
        this.gameEngine.rightClick(e)
        this.render()
      })
    });
  }


  getSquareCSSStyle(square, gameIsEnded){
    if (gameIsEnded){
      if (square.isMINE) { return "square mine" }
      return "square number"
    }
    else{
      if (square.isHIDDEN && !square.isMARKED){ return "square hidden" } 
      if (square.isHIDDEN && square.isMARKED){ return "square marked" }
      return "square number"
    }
  }


  minesLeft(){ //MinesLeft = TotalMines - markCounter.
    let mines = this.gameEngine.board.NUMBER_OF_MINES
    let markCounter = 0 
    for (let i = 0; i < this.gameEngine.board.BOARD_SIZE; i++) {
      for (let j = 0 ; j < this.gameEngine.board.BOARD_SIZE; j++){
          let divElement = this.gameEngine.board.squares2d[i][j]
          let square = JSON.parse(divElement.dataset.square)
          if (square.isMARKED) markCounter++
      }
    }
    let minesLeftDiv = document.getElementById("minesLeft")
    minesLeftDiv.innerHTML = `Mines left: ${mines - markCounter}`  
  }

  timePassed(){
    let timePassedDiv = document.getElementById("timePassed")
    timePassedDiv.innerHTML = this.gameEngine.stopWatch.getDuration()
  }


  //setInterval didnt do the trick when calling this.timePassed(). Problems with scope i think.
  //So i had to do a workaround with async/await. Where the setIntervall is just a dummy.
  asyncPerpetualTimer100ms = async () => {
    await new Promise((dummy) => setInterval(dummy, 100)); //dummy to pause function before calling itself again.
    this.timePassed()
    this.asyncPerpetualTimer100ms()
  }
  asyncPerpetualTimer1000ms = async () => {
    await new Promise((dummy) => setInterval(dummy, 2000)); //dummy to pause function before calling itself again.
    this.scoreBoard()
    this.asyncPerpetualTimer1000ms()
  }



}


