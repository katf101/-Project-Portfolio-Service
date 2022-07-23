const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, Image, User, Stack } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      src: req.body.src,
      introduce: req.body.introduce,
      position: req.body.position,
      career: req.body.career,
      job: req.body.job,
      portfolio: req.body.portfolio,
      github: req.body.github,
      blog: req.body.blog,
      UserId: req.user.id,
    });
    res.status(201).json(post);
  } catch (error) {
    console.log("에러 반환");
    console.error(error);
    next(error);
  }
});

module.exports = router;
