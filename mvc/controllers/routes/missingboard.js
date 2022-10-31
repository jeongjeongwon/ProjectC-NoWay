const express = require('express')
const router = express.Router();
const mysql = require('mysql')
const conn = require("../../../key-db/db")
const db = mysql.createConnection(conn)

const missingHTML = require("./missingHTML")
router.use = ("/missing", missingHTML)

router.get('/', (req, res) => {
  const sql = "select * from board2"
  db.query(sql, req.body, (err, row) => {
    if(err) throw err;
    let a = row.map((element) => {
      return `<div id=list>
      <img src="${element.image}" style="width:250px; height:350px;position:relative;">
      <div id=text>[${element.location}] ${element.breed} ${element.gender}</div>
    </div>`
    }).join("")
    res.send(missingHTML(a))
  })
})

module.exports = router