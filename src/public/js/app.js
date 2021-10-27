const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

const socket = new WebSocket(`ws://${window.location.host}`);

//지금 frontend에서 backend로 보내고 싶은 메세지가 두가지 타입이 있음

//backend로 메세지를 보낼때 마다 string으로 전송해줄거야
//메세지를 보내고 싶으면 이 함수 불러주면됨
function makeMessage(type, payload){
    const msg = {type, payload}; // 메세지를 보내기 전에 object를 만들고
    return JSON.stringify(msg); //msg를 string으로 바꿔서 리턴
}
//javascript object를 string으로 바꾸는 이유!
// 연결하고 싶은 backend서버가 javascript가 아닐수 있기 때문. java서버일수도 Go서버일수도
//서버를 javascript로 만들었는데 누군가가 Go를 이용해 서버에 접속할수 있기 때문
// %%% 이런 것들은 websocket이 브라우저에 있는 API이기 때문
// backend에서 다양한 프로그래밍 언어를 사용할수 있기에 이 API는 판단하면 안돼

socket.addEventListener("open", () => {
    console.log("Connected to Server ✅")
}); 

socket.addEventListener("message", (message) => {
    //console.log("New message: ", message.data);
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌"); 
})


//backend로 보내는 메시지 (chat message)
function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = ""; 
}

//이 메시지는 nickname을 변경하고 싶을때 backend로 보내지는 메시지
function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
}
//javascript object를 string으로 만드는 방법 그리고 string을 javascript object로 바꾸는 방법
// -------------> JSON.stringify()
// JSON.stringify({
//     type: "nickname",
//     payload: "edge"
// })
// '{"type":"nickname","payload":"edge"}'

// JSON.parse('{"type":"nickname","payload":"edge"}')
// {type: 'nickname', payload: 'edge'}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);