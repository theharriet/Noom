const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

const socket = new WebSocket(`ws://${window.location.host}`);

//backend로 메세지를 보낼때 마다 string으로 전송해줄거야
//메세지를 보내고 싶으면 이 함수 불러주면됨
function makeMessage(type, payload){
    const msg = {type, payload}; // 메세지를 보내기 전에 object를 만들고
    return JSON.stringify(msg); //msg를 string으로 바꿔서 리턴
}

socket.addEventListener("open", () => {
    console.log("Connected to Server ✅")
}); 

socket.addEventListener("message", (message) => {
    //console.log("New message: ", message.data);
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
}); // now we don't know who people are --> form을 만들어서 nickname 정할수있도록 해주자

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌"); 
})


//backend로 메세지 보내줌
function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    //console.log(input.value);
    //socket.send(input.value);
    socket.send(makeMessage("new_message", input.value));
    input.value = ""; //input창 비워줌
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    //socket.send(input.value);
    // socket.send({
    //     type: "nickname",
    //     payload: input.value,
    // }); //text를 전송하는게 아닌 json object전체를 전송중 
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