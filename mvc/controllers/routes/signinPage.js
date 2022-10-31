const express = require('express');
const mysql = require('mysql')
const db = require('../../../key-db/db');
const conn = mysql.createConnection(db)
const router = express.Router();

const login = () => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./signinPage.css">
    <title>Document</title>
  </head>
  <body>
    <div id="root">
      <!--? 각 모든 페이지가 공유하는 헤더 몇몇 필요없는 부분의 버튼을 제거하는것을 제외하고 값이 동일하다-->
      <header>
        <a href="http://localhost:7777" class="logo">Way Home</a>
      </header>
      <main>
        <!--? 글과 이미지가 출력되는 위치 main테그안에 위치한다-->
        <section id="loginImgSector">
          <img src="image/스핑크스.jpg" alt="" id="loginImg">
        </section>
        <form action="/signin" method="post" id="loginTextSector">
          <div id="loginText">
            <input type="text" name="id" class="userInfo" placeholder="아이디">
            <input type="text" name="password" class="userInfo" placeholder="비밀번호">
            <input type="submit" id="submit" value="로그인"></input>
            <div id="pageMove">
              <a href="http://localhost:7777/idfind"><div>아이디 찾기</div></a>
              <a href="http://localhost:7777/pwfind"><div>비밀번호 찾기</div></a>
              <a href="http://localhost:7777/signup"><div>회원 가입</div></a>
            </div>
          </div>
        </form>
      </main>
    </div>
  </body>
  </html>`
}

router.get('/', (req, res) => {
  res.send(login())
})

const session = {}

router.post('/', (req, res) => {
  const body = req.body
  const sql = "select id, password, name from user"
  conn.query(sql, body, (err, row) => {
    if(err) throw err;
    let [a] = row.filter((element) => body.id === element.id && body.password === element.password)
      if(a){
        const Key = Math.floor(Math.random()* 10000)
        session[Key] = a
        console.log(session)
        console.log(session[Key])
        res.setHeader('Set-Cookie', `userid = ${Key}; path=/`)
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        res.write(`<script>alert("환영합니다 ${a.name} 님"); window.location="/"</script>`)
        res.status(200)
      }else{
        res.write(`<script>alert("비밀번호를 틀리셧거나 존재하지 않는 회원입니다. 로그인 정보를 확인하세요"); window.location="/signin"</script>`)
      }
  })
})

module.exports = router;