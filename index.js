const http = require("http");
const WebSocketServer = require("websocket").server;
let connection = null;

const httpserver = http.createServer((req, res) => {
    console.log("Recieved Request")
})

// Pass in the http server so we can use the underlying TCP connection as the medium for our websocket
const websocket = new WebSocketServer({
    "httpServer": httpserver
})

// on "request", call the function after the comma
websocket.on("request", request => {
    connection = request.accept(null, request.origin)

    connection.on("open", e => console.log("Opened!"))
    connection.on("close", e => console.log("Closed!"))
    connection.on("message", message => {
        console.log(`Recieved message:\n${message.utf8Data}`)
    })

})

httpserver.listen(8080, () => console.log("Server is LIVE on port 8080!"))


/* CLIENT SIDE CODE 

    let ws = new WebSocket("ws://localhost:8080")

    ws.onmessage = message => console.log(`Server Message:\n${message.data})

    ws.send("Hi!")

*/

