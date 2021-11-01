//user가 chat에 참가하고 싶으면 room을 먼저 만들도록. no public chat anymore
// socketIO가 이미 room 기능 갖고있음
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", { payload: input.value}, () => {
        console.log("Server is done!");
    }); //전에는 메시지만 보낼수 있었는데 object도 보낼수있음
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

//socket.emit()- 첫번째 arg: event 이름, 두번째 arg: payload(you want to send), 세번째 arg: 서버에서 호출하는 function

//1. 특정한 event(custom event)를 emit할수있음 (not only message)
//2. object 전송 가능
//3. callback : 서버로 부터 실행되는 function