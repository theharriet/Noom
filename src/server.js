import express from "express";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/")); 

const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);

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
