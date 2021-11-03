import http from "http";
import SocketIO from "socket.io"; //npm i socket.io
//import WebSocket from "ws";
import express from "express";

//https://socket.io/docs/v4/server-api/#flag-volatile-1

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/")); 

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

function publicRooms(){
    const {
        sockets: {
            adapter: {sids, rooms},
        },
    } = wsServer;
    //const {sockets: {adapter: {sids, rooms}}} = wsServer;
    // 아래 두줄을 위 한줄로 가능
    // const sids = wsServer.sockets.adapter.sids;
    // const rooms = wsServer.sockets.adapter.rooms;
    const publicRooms = [];
    rooms.forEach((_, key) => {
        if(sids.get(key) === undefined){
            publicRooms.push(key);
        }
    });
    return publicRooms;
}

wsServer.on("connection", (socket) => {
    //socket.socketJoin("announcement"); socket이 연결했을때 모든 socket이 announcement라는 방에 입장하게 만듬
    socket["nickname"] = "Anon"; //이제 누군가 입장하면 입장했다고 말해줄수있음
    socket.onAny((event) => {
        //console.log(wsServer.sockets.adapter);
        console.log(`Socket Event: ${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
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
    socket.on("nickname", nickname => socket["nickname"] = nickname)
    //nickname이벤트가 발생하면 nickname(object)을 가져와서 socket에 저장 
});

//console.log(wsServer.sockets.adapter); 서버에 있는 모든 방 리스트를 보고 private & public rooms 찾아보기
// map에서 room ID를 socket ID에서 찾을 수 있다면 그건 private room
// room ID를 socket ID에서 찾을 수 없다면 public room


// ***********Adapter
// DB를 사용하여 다른 서버들 사이에 실시간 어플리케이션을 동기화 하는것
// 같은 connection이어도 서버들은 같은 memory pool을 공유하지않음
// 사용자가 보는 화면이 같은 프론트엔드여도 서버는 다를수있음 (모든 클라이언트가 같은 서버에 연결되는게아냐)
// 서버1사용자가 서버2사용자에게 메세지를 보낼 수 있게 해주는게 adapter
// 클라이언트1 - 서버1 - adapter - db - adapter - 서버2 - 클라이언트2



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
