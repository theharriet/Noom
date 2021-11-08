import http from "http";
import SocketIO from "socket.io"; //npm i socket.io
import express from "express";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/")); 

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);


// Javascript
// socketIo를 이용해서  video call 코딩 만들기
// first of all, 유저로부터 비디오를 가져와 화면에 보여줘야함
// second, 마이크 음소거 설정&해제 하는 버튼, 카메라 on/off버튼, 카메라 전면후면선택 버튼 만들거.
