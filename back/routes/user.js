const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models");

const router = express.Router();

// post /user/login
router.post("/login", (req, res, next) => {
  // 미들웨어 확장, passport는 req, res,next를 사용하지 못하기 때문에 미들웨어 확장하여 사용
  passport.authenticate("local", (err, user, clientErr) => {
    // 서버에러
    if (err) {
      console.error(err);
      return next(err);
    }
    if (clientErr) {
      // 허가되지 않음
      return res.status(401).send(clientErr.reason);
    }
    // 성공
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.json(user);
    });
  })(req, res, next);
});

// POST /user/
router.post("/", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용 중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

module.exports = router;
