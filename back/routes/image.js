const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, Image, User, Stack } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET /post/1
  console.log("3131");
  console.log("인포", req.query.info);
  console.log("둘둘", req.query.userId);
  console.log("삼삼", req.body);
  // console.log("아디", req.params.postId);
  try {
    const image = await Image.findOne({
      where: { UserId: req.query.info },
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
    });
    if (!image) {
      return res.status(404).send("존재하지 않는 게시글입니다.");
    }
    // const fullPost = await Post.findOne({
    //   where: { id: post.id },
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["id", "name"],
    //     },
    //   ],
    // });
    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
