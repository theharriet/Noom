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