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

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//sort of fake database
const sockets = []; //누군가 우리 서버에 연결하면 그 connection을 여기에 넣어줌

wss.on("connection", (socket) => {
    sockets.push(socket); //크롬(socket)연결하면 sockets array에 크롬을 넣어준다는 뜻
    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log("Disconnected from Browser ❌")); 
    socket.on("message", msg => {
        //console.log(message); //이 메세지는 string
        const message = JSON.parse(msg);
        //console.log(message, msg.toString('utf-8'));
        switch (message.type){
            case "new_message" : sockets.forEach(aSocket => aSocket.send(message.payload.toString('utf-8')));
            case "nickname" : console.log(message.payload.toString('utf-8'));
        }

        // if문을 switch문으로 바꿨음
        // if(message.type === "new_message"){
        //     sockets.forEach(aSocket => aSocket.send(message.payload.toString('utf-8')));
        // }else if(message.type === "nickname"){
        //     console.log(message.payload.toString('utf-8'));
        // }
        
    }); 
    
    
}); 
//backend는 message들을 구분하지 못하기 때문에 (nickname인지 채팅메세지인지) json으로 보내자
//그치만 app.js socket.send는 string만 보낼수 있어
// JSON.stringify() , JSON.parse()
//JSON.stringify() : Javascript object -> String
//JSON.parse() : String -> Javascript object


//backend에서 socket으로 메세지를 전송하고 싶다면 object를 가져와서 string으로 만들어줘야함
//frontend는 그 string을(new message) 가져와서 object로 다시 바꿔줘야함

//backend에서 string으로 온 메세지를 javascript object로 바꿔주자


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
