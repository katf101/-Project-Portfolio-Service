const express = require("express");

const db = require("./models");

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.get("/", (req, res) => {
  res.send("hello express");
});

app.listen(3060, () => {
  console.log("서버 실행 중!");
});
