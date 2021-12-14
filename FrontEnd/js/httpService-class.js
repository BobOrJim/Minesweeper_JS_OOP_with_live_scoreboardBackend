
export class HttpService{
    constructor(){
        this.dataFromBackend
    }


    send(){
        console.log("send in httpservice")

        //fetch('https://reqres.in/api/users', {
        fetch('https://localhost:44338/api/HighScore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Dude1'
            })
        })
        .then( (result) => {
            return result.json() 
        })
        .then( (data) => console.log(data) )
        .catch(error => console.log("NETWORK ERROR, CANT CONNECT TO BACKEND"))

        //console.log(this.dataFromBackend);
    }

    recieve(){
        fetch('https://localhost:44338/api/HighScore')
        .then( (result) => result.json())
        .then( (data) => this.dataFromBackend = data)
        .catch(error => console.log("NETWORK ERROR, CANT CONNECT TO BACKEND"))
        console.log(this.dataFromBackend);
    }
}



