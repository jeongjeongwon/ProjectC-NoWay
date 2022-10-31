const express = require('express')
const router = express.Router();
const mysql = require('mysql')
const conn = require("../../../key-db/db")
const multer = require('multer')
const path = require('path')
const db = mysql.createConnection(conn)
/**
 * *enctype에 multipart는 일반 데이터와 함께 파일등을 웹서버에 전송하기위해 만든 표준
 */
const createboard = () => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./createboard.css">
    <title>Document</title>
  </head>
  <body>
    <div id="root">
      <!--? 각 모든 페이지가 공유하는 헤더 몇몇 필요없는 부분의 버튼을 제거하는것을 제외하고 값이 동일하다-->
      <header>
        <a href="http://localhost:7777" class="logo">Way Home</a>
      </header>
      <main>
        <!--? 정보 작성 공간 form태그로 input테그에서 작성된 정보를 전송 DB에 저장하는 역할을 진행한다. 드래그인 드롭으로 이미지를 삽입할 공간의 할당과 등록된 이미지의 이름을 출력할 장소 구현-->
        <form action="/createboard" method="post" enctype="multipart/form-data">
          <section id="createImgSector">
            <div id="createImg">
              <input id="drag" type="file" name="image">
              드래그하여 올려놓으십시오 (최대 3장)
              <div id="imgText">그림 이름.jpg</div>
              <div id="imgText">그림 이름.jpg</div>
              <div id="imgText">그림 이름.jpg</div>
            </div>
          </section>
        <!--? 각 name은 DB에 저장된 데이터의 이름이고 placeholder을 통해 어떤 정보를 적고 어떤 데이터 안에 저장될지 알 수 있다.-->
          <div id="createTextSector">
            <div id="createText">
              <input type="text" name="name" class="infoA" placeholder="이름">
              <input type="text" name="gender" class="infoA" placeholder="성별">
              <input type="text" name="breed" class="infoA" placeholder="견종">
              <input type="text" name="age" class="infoA" placeholder="나이">
              <input type="text" name="inNeutering" class="infoA" placeholder="중성화 유무">
              <input type="text" name="location" class="infoA" placeholder="잃어버린 곳">
              <input type="text" name="uniqueness" class="infoB" placeholder="특이사항">
              <input type="submit" id="submit" value="작성하기"></input>
            </div>
          </div>
        </form>
      </main>
    </div>
  </body>
  </html>`
}

router.get('/', (req, res) => {
  res.send(createboard())
})

const storage = multer.diskStorage ({
  destination : (req, file, data) => {
    data(null, "mvc/upload/")
  },
  filename : (req, file, data) => {
    const ex = path
    data(null, file.originalname)
  }
})

const upload = multer({storage:storage})

router.post('/', upload.single("image"), (req, res) => {
  const sql = `insert into board2 values (?, ?, ?, ?, ? ,?, ?, ?)`
  let location = req.body.location;
  let breed = req.body.breed;
  let gender = req.body.gender;
  let age = req.body.age;
  let inNeutering = req.body.inNeutering;
  let name = req.body.name;
  let uniqueness = req.body.uniqueness;
  let image = req.file.filename
  let result = [location, breed, gender, age, inNeutering, name, uniqueness, image]
  console.log(req.body)
  db.query(sql, result, (err, row) => {
    if(err) throw err;
    res.send("완료")
  })
})



module.exports = router;


//const obj = {
//  key : "눈누난나"
//}
//
//let ggggaa = "ghfjdhdl"
//
//const primaryKey = Math.floor((Math.random()+1) * 1000000)
//obj[primaryKey] =  ggggaa
//console.log(obj[primaryKey])
//console.log(obj)

/**
 * * obj의 배열안에 Key로 '눈누난나' 선언되어있음
 * * primaryKey 내부에는 랜덤으론 선언된 값이 들어가는데 중복을 방지하기위해 random()+1이 들어감
 * * obj의 key값의 객체안에 primaryKey값이 들어가고
 */