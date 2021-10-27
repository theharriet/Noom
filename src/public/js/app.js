alert("hi");

//app.js를(user에게 보여지는 화면-Frontend) 저장할때마다 nodemon이 restart되고 있어
// 그치만 이걸 원하는게 아냐
// views나 server.js를(or 모든 자바스크립트파일들이) 수정될때만 nodemon이 재시작하길 바람
//(Frontend 자바스크립트를 수정할때는 제외하고)
// --> nodemon.json가서 폴더하나를 무시하도록 설정
// "ignore"를 입력하고 src/public 폴더안에 모든 파일들 무시하도록.
