const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const { Post, Image, User, Stack } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.accessSync("uploads");
  console.log("uploads 폴더 있음");
} catch (error) {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});
const upload = multer({
  //########### dev (삭제 x) ################//
  // storage: multer.diskStorage({
  //   destination(req, file, done) {
  //     done(null, "uploads");
  //   },
  //   filename(req, file, done) {
  //     // image.png
  //     const ext = path.extname(file.originalname); // 확장자 추출(.png)
  //     const basename = path.basename(file.originalname, ext); // image
  //     done(null, basename + "_" + new Date().getTime() + ext); // image20220726.png
  //   },
  // }),
  //############################################//
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "semifoli",
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post("/image", isLoggedIn, upload.array("image"), (req, res, next) => {
  res.json(req.files.map((v) => v.location)); // aws s3
  // res.json(req.files.map((v) => v.filename)); // dev
  // res.json(req.body.image);
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      introduce: req.body.introduce,
      position: req.body.position,
      career: req.body.career,
      job: req.body.job,
      portfolio: req.body.portfolio,
      github: req.body.github,
      blog: req.body.blog,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User, // 게시글 작성자
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post(
  "/addImage",
  isLoggedIn,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const image = await Image.create({
        src: req.body.image,
        UserId: req.user.id,
      });
      console.log(JSON.stringify(image));
      res.status(201).json(JSON.stringify(image));
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// router.patch("/", isLoggedIn, async (req, res, next) => {
// router.patch("/:userId", isLoggedIn, async (req, res, next) => {
router.put("/:postId", isLoggedIn, async (req, res, next) => {
  // PATCH /post/10
  try {
    await Post.update(
      {
        introduce: req.body.introduce,
        position: req.body.position,
        career: req.body.career,
        job: req.body.job,
        portfolio: req.body.portfolio,
        github: req.body.github,
        blog: req.body.blog,
      },
      {
        where: {
          id: req.params.postId,
          UserId: req.user.id,
        },
      }
    );
    const post = await Post.findOne({ where: { id: req.params.postId } });
    res.status(200);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// router.get("/", async (req, res, next) => {
router.get("/:postId", async (req, res, next) => {
  // GET /post/1
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
    });
    if (!post) {
      return res.status(404).send("존재하지 않는 게시글입니다.");
    }
    const image = await Image.findOne({
      where: { UserId: post.UserId },
    });
    res.status(200).json({ post, image });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/resume/:userId", async (req, res, next) => {
  // GET /post/1
  try {
    const post = await Post.findOne({
      where: { UserId: req.params.userId },
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
    });
    if (!post) {
      return res.status(404).send("존재하지 않는 게시글입니다.");
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  // DELETE /post/10
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/image", async (req, res, next) => {
  // GET /post/1
  try {
    const image = await Image.findOne({
      where: { UserId: req.query.userId },
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

    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
