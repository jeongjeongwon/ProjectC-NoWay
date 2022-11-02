const express = require('express')
const router = express.Router();
const mysql = require("mysql")
const conn = require("../../../key-db/db")
const db = mysql.createConnection(conn)
const mailer = require("nodemailer")
const crypto = require("crypto")

const findPW = () => {
return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        #root{
            width: 1920px;
            height: 1080px;
            background-color: #FFFFF0;
        }

        #root > header{
            width: inherit;
            height: 8vh;
            background-color: rgba(210, 105, 30, 0.6);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #root > header > .logo{
            color: white;
            font-size: 48px;
            margin-left: 20px;
            text-decoration: none;
        }

        #root > header > .sign{
            display: flex;
            flex-direction: row;
        }
        #root > header > .sign > a{
            margin-right: 20px;
            text-decoration: none;
            color: #000;
        }
        #root > header > .sign > a > div{
            width: 130px;
            height: 50px;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50px;
        }
        #root> main {
            width: inherit;
            height: 92vh;
            display: flex;
            
        }
        #root> main > div{
            width: 50vw;
            height: 92vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #root > main > .text-box > .form-box{
            display: flex;
            flex-direction: column;
        }

        #root > main > .text-box > .form-box > .text-name{
            background-color: transparent;
            border: none;
            border-bottom: 1px solid #CCC;
            width: 600px;
            height: 50px;
            margin-top: 50px;
            font-size: 24px;
        }

        #root > main > .text-box > .form-box > .text-id{
            background-color: transparent;
            border: none;
            border-bottom: 1px solid #CCC;
            width: 600px;
            height: 50px;
            margin-top: 50px;
            font-size: 24px;
        }

        #root > main > .text-box > .form-box > .text-email{
            background-color: transparent;
            border: none;
            border-bottom: 1px solid #CCC;
            width: 600px;
            height: 50px;
            margin-top: 50px;
            font-size: 24px;
        }

        #root > main > .text-box > .form-box > .sbm{
            all : unset;
            margin-top: 150px;
            display: flex;
            justify-content: center;
            width: 600px;
            height: 100px;
            border: 1px solid #000;
            border-radius: 50px;
            background-color: #fff;
        }
        #root > main > .text-box > .form-box > a{
            all : unset;
            margin-top: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 600px;
            height: 100px;
            border: 1px solid #000;
            border-radius: 50px;
            background-color: #fff;
        }
        #root > main > .img-box > img{
            width: 700px;
            height: 800px;
        }
    </style>
    <title>Document</title>
</head>
<body>
    <div id="root">
        <header>
            <a href="http://localhost:7777" class="logo">Way Home</a>
            <div class="sign">
                <a href="http://localhost:7777/signin" class="sign-in"><div>로그인</div></a>
                <a href="http://localhost:7777/signup" class="sign-up"><div>회원가입</div></a>
            </div>
        </header>
        <main>
            <div class="img-box">
                <img src="find/9983F3405BAF176612.png" alt="" class="main-img">
            </div>
            <div class="text-box">
                <form action="/pwFind" method="post" class="form-box">
                    <input type="text" name="name" placeholder="이름" class="text-name">
                    <input type="text" name="id" placeholder="아이디" class="text-id">
                    <input type="text" name="email" placeholder="이메일 주소" class="text-email">
                    <input type="submit" value="비밀번호 찾기" class="sbm">
                    <a href="http://localhost:7777/idfind">아이디 찾기 페이지</a>
                </form>
            </div>
        </main>
    </div>
</body>
</html>`
}

router.get('/', (req, res) => {
    res.send(findPW())
})

const mail = mailer.createTransport({
    service : "Gmail",
    auth : {
        user : "je970311@gmail.com",
        pass : "",
    },
})

//router.post('/', (req, res) => {
//    const sql = "select * from user"
//    const body = req.body
//    db.query(sql, body, (err, row) => {
//        res.setHeader("Content-Type", "text/html; charset=utf-8")
//        if(err) throw err;
//        let info = row.map((element) => {
//            if(body.name === element.name && body.id === element.id && body.email === element.email){
//                const message = {
//                    from: `${element.name}`,
//                    to : `${element.email}`,
//                    subject : "고객님이 잃어버리신 비밀번호 입니다",
//                    text : `고객님이 잃어버린 비밀번호는 다음과 같습니다 : ${element.password}`
//                }
//                mail.sendMail(message, (err, row) => {
//                    if(err) throw err;
//                    console.log(row, "완료")
//                })
//                res.write(`<script>alert("유저님의 pw를 등록된 이메일을 통해 발송하였습니다."); window.location="/signin"</script>`)
//            } else {
//                res.write(`<script>alert("입력 정보가 틀리셨거나 가입되어 있지 않은 정보입니다 다시 한번 확인하여 주시기 바랍니다.");window.location="/pwFind"</script>`)
//            }
//        })
//    })
//})



module.exports = router;