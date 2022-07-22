const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/user");
// const upostRouter = require("./routes/post");
const db = require("./models");

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json()); // 프론트에서 data를 json으로 보냈을때 req.body 안에 넣어줌
app.use(express.urlencoded({ extended: true })); // 프론트에서 form(form 은 url)으로 data를 보냇을때 req.body 안에 넣어줌

app.get("/", (req, res) => {
  res.send("hello express");
});

// app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3060, () => {
  console.log("서버 실행 중!");
});
