const socket = io();

const myFace = document.getElementById("myFace");
// stream : 비디오와 오디오가 결합된것 
let myStream;

async function getMedia(){
    try {
        myStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        console.log(myStream);
    } catch (e) {
        console.log(e);
    }
}

getMedia();
//navigator.mediaDevices.getUserMedia(constraints)는 유저의 유저미디어 string을 줄거임
// constraints - 우리가 얻고싶은것
//https://developer.mozilla.org/ko/docs/Web/API/MediaDevices/getUserMedia

//#3.0 4:00 plz.. why not? when

