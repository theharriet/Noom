import http from "http";
import SocketIO from "socket.io"; //npm i socket.io
//import WebSocket from "ws";
import express from "express";



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
    socket.onAny((event) => {
        console.log(`Socket Event: ${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome"); //나를 제외한 모든 사람에게 event emit
    }); 

    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => socket.to(room).emit("bye"));
    }); // disconnect(연결이 완전히 끊어짐)이랑은 다름. 접속을 중단할거지만 아직 완전히 room을 나가지는 안음
    //연결이 완전히 끊기기 전에 메시지를 보낼수 있다는 뜻
    //console.log(socket.rooms); 방의 id array가 나오는데 그걸로 forEach 돌림

    socket.on("new_message", (msg, room, done) => { 
        socket.to(room).emit("new_message", msg);
        done(); //위 모든게 끝나면 addMessage funciton이 호출됨
    })
    //msg : app.js의handleMessageSubmit에서 오는 input.value
    //room: 어떤 방으로 메시지를 보내야할지 모르니까.. roomName
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
