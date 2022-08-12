const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const hpp = require("hpp");
const helmet = require("helmet");

const path = require("path");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const stackRouter = require("./routes/stack");
const imageRouter = require("./routes/image");
// const stacskRouter = require("./routes/stacks");

const db = require("./models");
const passportConfig = require("./passport");

// ################################################################# //

dotenv.config();
const app = express();

//######### 채팅 #########//
// const io = require("socket.io")(app, {
//   cors: {
//     origin: "http://localhost:3001",
//     methods: ["GET", "POST"],
//   },
// });
// io.on("connection", () => {
//   console.log("user baru terkoneksi");
// });

//######### 채팅 #########//

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: ["http://localhost:3000", "semifoli.site", "http://semifoli.site"],
    // origin: "*",
    // origin: true,
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json()); // 프론트에서 data를 json으로 보냈을때 req.body 안에 넣어줌
app.use(express.urlencoded({ extended: true })); // 프론트에서 form(form 은 url)으로 data를 보냇을때 req.body 안에 넣어줌
// app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/posts", postsRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/stack", stackRouter);
app.use("/image", imageRouter);
// app.use("/stacks", stacskRouter);

app.listen(80, () => {
  console.log("서버 실행 중!");
});
