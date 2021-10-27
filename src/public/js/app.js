const socket = new WebSocket(`ws://${window.location.host}`);
//app.js의 socket은 서버로의 연결

//const socket = new WebSocket("http://localhost:3000"); 이렇게 하면 http protocol이 아니라고 뜸
//const socket = new WebSocket("ws://localhost:3000"); 이렇게 하면 되긴함