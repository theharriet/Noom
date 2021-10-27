import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/")); 

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app); //express.js를 이용해 http서버 만듬. 이제 서버에서 websocket을 만들수있음
const wss = new WebSocket.Server({ server }); //http서버 위에 websocket서버 만듬. (server를 꼭 넣어줄 필요는 없음)

wss.on("connection", (socket) => {
    //console.log(socket);

    // ** socket에 있는 메서드로 브라우저에 "Welcome to Chat" 메세지를 보내보자
    console.log("Connected to Browser ✅")
    socket.send("hello~");
    //connection이 생겼을 때 socket으로 즉시 메세지(hello)를 보낼거고
    // app.js에서 세개의 이벤트(open, message, close) 작동

}); // 커넥션이 생기면 sokcet을 받는 다는게 직관적으로 보임

//function handleConnection(socket){console.log(socket); // server.js의 socket은 브라우저와의 연결}
//wss.on("connection", handleConnection);
//Nico doesn't like this way. 하나의 큰 function안에 기능들을 넣는걸 선호.
// connection안에 같은 역할을 하는 익명 함수를 만들거임 -> socket이 지금 어떤 상태인지 알기 더 쉬움


server.listen(3000, handleListen);

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
