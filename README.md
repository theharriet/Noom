#Noom

Zoom Clone using NodeJS, WebRTC and Websockets


------NodeJS 속성, 서버 설정
C:\CODE\nomadcoder>mkdir zoom

C:\CODE\nomadcoder>cd zoom

C:\CODE\nomadcoder\zoom>npm init -y
Wrote to C:\CODE\nomadcoder\zoom\package.json:

{
  "name": "zoom",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

C:\CODE\nomadcoder\zoom>code .

- vsc 실행
- terminal 
    touch README.md
- npm i nodemon -D

-make babel.config.json, nodemon.json, server.js

- git init .
- npm i @babel/core @babel/cli @babel/node @babel/preset-env -D

- gitignore만들고 /node_modules -> github에 node_modules 폴더는 업로드 안할거다

- json 파일들 이것저것 작성
- npm i express
- npm i pug


- npm run dev


화면이 좀 더 괜찮아 보이기 위해 MVP CSS를 사용
MVP CSS - 프로젝트에 포함시킬 수 있는 하나의 css파일, 기본적인 html tag들을 예쁘게 바꿔줌


**** 개발 환경 구축 recap ****
 - nodemon을 설정하기 위해 nodemon.json을 생성
    - nodemon: 우리의 프로젝트를 살펴보고 변경사항이 있을시 서버를 재시작해주는 프로그램
 - "exec": "babel-node src/server.js" : 서버를 재시작하는 대신, babel-node를 실행
    - babel-node : 우리가 작성한 코드를 일반NodeJS코드로 컴파일.
                  그걸 server.js에 해줌
 - server.js에서는 express를 import하고 application을 구성
    view engine을 pug로 설정, views와 public파일들의 디렉토리 설정
    public 파일들은 Frontend에서 구동되는 코드
   app.use("/public", express.static(__dirname + "/public")) -> public 폴더를 유저에게 공개
   <서버내의 모든 폴더를 유저가 보게되면 보안상 좋지않으므로 유저가 볼수있는 폴더를 지정해줌>
 -app.js => Frontend / server.js => Backend