//user가 chat에 참가하고 싶으면 room을 먼저 만들도록. no public chat anymore
// socketIO가 이미 room 기능 갖고있음
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone(msg){
    console.log(`The backend says: `, msg);
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, backendDone);
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

//socket.emit()- 첫번째 arg: event 이름, 두번째 arg: payload(you want to send), 세번째 arg: 서버에서 호출하는 function

//1. 특정한 event(custom event)를 emit할수있음 (not only message) (단, socket.on()과 같은 이름)
//2. object 전송 가능 (한가지만 전송해야한다는 제약이 없음 )
//3. last arg: callback -서버로 부터 실행되는 function 
//              (처리비용이 크거나 시간이 오래걸리는 작업할때. 그리고나서 frontend에 작업완료를 알리고 싶을때 좋음)
//                backend에서는 frontend에서 오는 코드를 실행하면 안됨(보안문제) - 사람들이 아무코드를 쓰면 backend가 실행해버리니까
//              서버는 backend에서 function을 호출하지만 function은 frontend에서 실행