import {ServerWebSocket} from "bun";

const server = Bun.serve({
    port: 3000,
    fetch(request, server){
        if (server.upgrade(request)){
            return;
        }

        return new Response("Helloooooo World");
    },
    websocket:{
        open(ws){
            const welcomeMessage = "Welcome to the Time Server!!!  Ask 'What's the time' and I will answer.";
            ws.send(welcomeMessage);
            console.log("connection opened");
        },
        message(ws,message){
            console.log(`incoming message: ${message}`);

            const messageString = typeof message === 'string' ? message : new TextDecoder().decode(message);

            if (messageString.trim().toLowerCase() === "what's the time?"){
                const currentTime = new Date().toLocaleTimeString();

                ws.send(`The time is ${currentTime}`);
                return;
            }

            ws.send("i'm just a silly timebot, i can only tell the time");
        },
        close(ws){
            console.log("connection closed");
        }
    }
});

console.log(`Listening on Localhost:${server.port}`);