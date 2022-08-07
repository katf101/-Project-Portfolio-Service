const express = require("express");

const { Image, User } = require("../models");
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

router.delete("/:UserId", isLoggedIn, async (req, res, next) => {
  // DELETE /post/10
  console.log("444");
  console.log("444", req.params.UserId);
  try {
    await Image.destroy({
      where: {
        UserId: req.params.UserId,
      },
    });
    res.status(200);
    // res.status(200).json({ PostId: parseInt(req.params.UserId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
