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
// ws://localhost:3000도 처리할수있게됨
// 이제 이 localhost는 동일한 포트에서 http, ws request 두개를 다 처리할수 있음

const server = http.createServer(app); //express.js를 이용해 http서버 만듬. 이제 서버에서 websocket을 만들수있음
const wss = new WebSocket.Server({ server }); //http서버 위에 websocket서버 만듬. (server를 꼭 넣어줄 필요는 없음)

server.listen(3000, handleListen);

//http와 wss 반드시 합칠필요는 없어 websocket만 필요하다면 websocket만 만들면돼
//여기서 http가 필요한 이유는 views,static files, home, redirection을 원하기 때문



//express는 http를 다루지만(ws지원안해) ws를 써볼게(합친대)
//expree로 같은 서버에 ws기능을 설치 -> 같은 서버에서 http, websocket 둘다 작동시킬거임
//app.listen(3000, handleListen); 이걸 바꿔줘야해
// 모든 node.js에 내장되어있는 http package를 사용

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
