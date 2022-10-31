const express = require('express')
const router = express.Router();
const mysql = require('mysql')
const conn = require('../../../key-db/db')
const db = mysql.createConnection(conn)

const board = require("./missingHTML")
router.use('/search', board)

router.get('/', (req, res) => {
  const sql = `select location, breed, gender, image from board2 where location like "${req.query.result}" or breed like "${req.query.result}" or gender like "${req.query.result}"`
  db.query(sql, (err, row) => {
    if(err) throw err
    let a = row.map((element) => {
      return `<div id=list>
      <img src="${element.image}" style="width:250px; height:350px;position:relative;">
      <div id=text>[${element.location}] ${element.breed} ${element.gender}</div>
    </div>`
    }).join("")
    res.send(board(a))
  })
})

module.exports = router;