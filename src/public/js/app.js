const socket = new WebSocket(`ws://${window.location.host}`);
//app.js의 socket은 서버로의 연결

socket.addEventListener("open", () => {
    console.log("Connected to Server ✅")
}); //sokcet이 오픈되었다면 콘솔에 서버와 연결이 되었다고 출력

socket.addEventListener("message", (message) => {
    console.log("Just got this: ", message.data, " from the Server");
});
//console.log("Just got this: ", message, " from the Server"); 이렇게 보내면 message 쫙 열어볼수있음 그안에 timestamp도 있고 다있음

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌"); //서버와 연결이 끊어졌다
})

//const socket = new WebSocket("http://localhost:3000"); 이렇게 하면 http protocol이 아니라고 뜸
//const socket = new WebSocket("ws://localhost:3000"); 이렇게 하면 되긴함