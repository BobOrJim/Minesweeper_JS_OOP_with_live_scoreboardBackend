
export class HttpService{
    constructor(){
        this.dataFromBackend
    }

    send(playerName, myTime){
        console.log("send in httpservice")
        fetch('https://minesweeper2021.azurewebsites.net/api/HighScore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playerName,
                time: myTime
            })
        })
        .then( (data) => console.log(data) )
        .catch(error => console.log("NETWORK ERROR, CANT CONNECT TO BACKEND"))
    }

    recieve(){
        fetch('https://minesweeper2021.azurewebsites.net/api/HighScore')
        .then( (result) => result.json())
        .then( (data) => this.dataFromBackend = data)
        .catch(error => console.log("NETWORK ERROR, CANT CONNECT TO BACKEND"))
    }
}



