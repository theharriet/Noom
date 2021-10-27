import express from "express";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));


//console.log("Hello");
//여기서 express로 할일은 views를 정해주고 render해주는것
// 나머지는 websocket에서 실시간으로 일어날거임
app.get("/", (req, res) => res.render("home")); //여기서 필요한 유일한 route

const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);

//line5: pug로 view enging을 설정하고
//line6: express에 template이 어디있는지 지정
//line7: public url을 생성해서 유저에게 파일을 공유해주고
//line13: home.pug를 render해주는 route handler를 만들었음

//app.js를(user에게 보여지는 화면-Frontend) 저장할때마다 nodemon이 restart되고 있어
// 그치만 이걸 원하는게 아냐
// views나 server.js를(or 모든 자바스크립트파일들이) 수정될때만 nodemon이 재시작하길 바람
//(Frontend 자바스크립트를 수정할때는 제외하고)
// --> nodemon.json가서 폴더하나를 무시하도록 설정
// "ignore"를 입력하고 src/public 폴더안에 모든 파일들 무시하도록.