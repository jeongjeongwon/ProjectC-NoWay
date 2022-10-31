const express = require('express')
const mysql = require('mysql')
const conn = require("../../../key-db/db")
const db = mysql.createConnection(conn)
const router = express.Router();

const signup = () => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./signupPage.css">
    <title>Document</title>
  </head>
  <body>
    <div id="root">
      <!--? 각 모든 페이지가 공유하는 헤더 몇몇 필요없는 부분의 버튼을 제거하는것을 제외하고 값이 동일하다-->
      <header>
        <a href="http://localhost:7777" class="logo">Way Home</a>
        <div class="sign">
            <a href="http://localhost:7777/signin" class="sign-in"><div>로그인</div></a>
        </div>
    </header>
      <main>
        <!--? 글과 이미지가 출력되는 위치 main테그안에 위치한다-->
        <section id="signupImgSector">
          <img src="image/스핑크스.jpg" alt="" id="signupImg">
        </section>
        <!--? 정보 작성 공간 form태그로 input테그에서 작성된 정보를 전송 DB에 저장하는 역할을 진행한다 각 name은 DB에 저장된 데이터의 이름이고 placeholder을 통해 어떤 정보를 적고 어떤 데이터 안에 저장될지 알 수 있다.-->
        <form action="/" method="post" id="signupTextSector">
          <div id="signupText">
            <input type="text" name="id" class="userInfo" placeholder="아이디">
            <input type="text" name="password" class="userInfo" placeholder="비밀번호">
            <input type="text" name="name" class="userInfo" placeholder="이름">
            <input type="text" name="phone" class="userInfo" placeholder="전화번호">
            <input type="text" name="adress" class="userInfo" placeholder="주소">
            <input type="text" name="email" class="userInfo" placeholder="이메일">
            <input type="submit" id="submit" value="회원 가입"></input>
          </div>
        </form>
      </main>
    </div>
  </body>
  </html>`
}

router.get('/', (req, res) => {
  res.send(signup())
})

router.post('/signup', (req, res) => {
  const sql = "insert into user values (?, ?, ?, ?, ?, ?)"
  let id = req.body.id;
  let password = req.body.password
  let name = req.body.name
  let address = req.body.address;
  let phone = req.body.phone
  let email = req.body.email
  let result = [id, password, name, address, phone, email]
  db.query(sql, result, (err, row) => {
    if(err) throw err;
    console.log(row)
    res.send("회원가입 완료")
  })
})

module.exports = router