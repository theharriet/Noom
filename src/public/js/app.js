//user가 chat에 참가하고 싶으면 room을 먼저 만들도록. no public chat anymore
const socket = io(); //이러면 끝. port, ws를 쓸 필요 없음
//이제 이러면 브라우저 콘솔에 io를 찍어보면
/* ƒ lookup(uri, opts) {
    if (_typeof(uri) === "object") {
      opts = uri;
      uri = undefined;
    }

    opts = opts || {};
    var parsed = url(uri, opts.path || "/socket.io");
    var source = … */
//io는 자동적으로 backend socket.io와 연결해주는 function
//io function은 알아서 socket.io를 실행하고 있는 서버를 찾음