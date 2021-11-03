import http from "http";
import SocketIO from "socket.io"; //npm i socket.io
//import WebSocket from "ws";
import express from "express";

//https://socket.io/docs/v4/server-api/#flag-volatile-1
//코드챌린지 - 방 입장전에 nickname을 받아 입장시 "00님이 입장하였습니다" 메시지 뿌리기

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/")); 

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
    //socket.socketJoin("announcement"); socket이 연결했을때 모든 socket이 announcement라는 방에 입장하게 만듬
    //socket["nickname"] = "Anon"; //이제 누군가 입장하면 입장했다고 말해줄수있음
    socket.onAny((event) => {
        console.log(`Socket Event: ${event}`);
    });
    socket.on("enter_room", (roomName, nickname, done) => {
        socket.join(roomName);
        socket["nickname"] = nickname;
        done();
        socket.to(roomName).emit("welcome", socket.nickname);
    }); 
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => socket.to(room).emit("bye", socket.nickname));
    }); 
    socket.on("new_message", (msg, room, done) => { 
        socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
        done();
    })
    //socket.on("nickname", nickname => socket["nickname"] = nickname)
    //nickname이벤트가 발생하면 nickname(object)을 가져와서 socket에 저장 
});


/* function onSocketClose(){
    console.log("Disconnected from Browser ❌");
} */

/*  메세지 타입이 많아지면 곤란..
const wss = new WebSocket.Server({ server });
const sockets = []; 
wss.on("connection", (socket) => {
    sockets.push(socket); 
    socket["nickname"] = "Anon"; 
    console.log("Connected to Browser ✅");
    socket.on("close", onSocketClose); 
    socket.on("message", msg => {
        const message = JSON.parse(msg);
        switch (message.type){
            case "new_message" : sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${message.payload.toString('utf-8')}`));
            case "nickname" : socket["nickname"] = message.payload;
        }
    }); 
    
    
});  */

httpServer.listen(3000, handleListen);


//실시간 채팅 프로그램
// 1. 메세지 주고 받기
// 2. 닉네임 설정
// 3. 방만들기
// 4. event : %%님이 입장하였습니다 or 실시간으로 채팅방에 몇명있는지

//http 프로토콜 : 브라우저 request <-> 서버 response. https://nomadcoder.co
//              서버가 response후에는 네가 누구인지 잊어버림 -> stateless : 그래서 req할때 cookie를 같이 보내야해 그럼 서버가 일치하는 profile로 응답
//              서버는 오직 request받을때만 응답해줌
//              real-time으로 일어나지 않음

//webSocket 프로토콜 : (ws://nomadcoder.co) 브라우저에 webSocket API가 내장되어있음
//      connect - like handshake. 브라우저가 서버로 websocket request보내면 서버는 받거나 거절
//              서버가 받으면 the connection is established
//  서버가 연결되어있기 때문에 네가 누구인지 기억할수있음. 원한다면 서버가 유저에게 메세지 보낼수있음
//  the server doesn't have to wait for a request. bi-directional connection 
