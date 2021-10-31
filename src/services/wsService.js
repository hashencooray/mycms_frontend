import {WS_URL} from '../config/appConfig'

var socket;

export const createConnnection =   () => {
    
    socket = new WebSocket(WS_URL);

    socket.onopen = () => {
        let msg = "Connected";
        socket.send(msg+ ` ${msg.length}`) 
        console.log("Connection Open")
    }

    socket.onmessage = (event) => {
        console.log(event.data)
    }

    socket.onclose = () => {
        console.log("Connection close")
    }

    socket.onerror = () => {
        console.log("Error")
    }
    return socket;
}

export const sendMessage = (msg) => {
    socket.send(msg);
}

// document.addEventListener("load", createConnnection);