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
// http://localhost:3000/socket.io/socket.io.js
wsServer.on("connection", socket => {
    socket.on("enter_room", (msg, done) => {
        console.log(msg);
        setTimeout(() => {
            done();
        }, 10000);
    });
    //서버는 backend에서 function을 호출하지만 function은 frontend에서 실행
    
    //socket.on("enter_room", (msg) => console.log(msg));

    //console.log(socket); 
}); //이코드 세줄로 frontend에서 backend를 연결해주고 있음



/* function onSocketClose(){
    console.log("Disconnected from Browser ❌");
} */

/* 
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

//socketIO는 실시간, 양방향, event기반 통신을 제공하는 framework. websocket보다 틴력성이 뛰어남, 재연결같은 부가기능있음
// 프론트와 백엔드 간 실시간 통신을 가능하게 해주는 프레임워크 or 라이브러리
// websocket은 socketIO가  실시간, 양방향, event기반 통신을 제공하는 방법 중 하나
// 브라우저 또는 핸드폰이 websocket을 지원하지 않는다고 해도 socketIO는 다른방법으로 작동
// firewall, proxy가 있어도 socketIO 작동

//브라우저가 주는 webSocket은 socketIO와 호환이 안됨(socketIO가 더 많은 기능이 있어서) -> socketIo를 브라우저에 설치해야함
//그래서 http://localhost:3000/socket.io/socket.io.js 이 url을 준거임
// frontend에 import하기만 하면 frontends, backend에 설치될거임
// app.js 다 날림


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
