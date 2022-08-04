const express = require("express");
const { Op } = require("sequelize");
const { isLoggedIn } = require("./middlewares");

const { Post, Stack, Image, User } = require("../models");

const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const stakc = await Stack.create({
      stack: req.body.stack,
      UserId: req.user.id,
    });
    const fullStack = await Stack.findAll({
      where: { UserId: req.user.id },
      include: [
        {
          model: User, // 스택의 게시글
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(201).json(fullStack);
  } catch (error) {
    console.log("에러 반환");
    console.error(error);
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  // GET /post/1
  try {
    const stack = await Stack.findAll({
      where: { UserId: req.params.userId },
      // include: [
      //   {
      //     model: Stack,
      //     attributes: ["UserId"],
      //   },
      // ],
    });
    if (!stack) {
      return res.status(404).send("존재하지 않는 게시글입니다.");
    }
    const fullPost = await Stack.findAll({
      where: { UserId: req.params.userId },
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json(fullPost);
  } catch (error) {
    console.log("에러 반환");
    console.error(error);
    next(error);
  }
});

router.delete("/:stackId", isLoggedIn, async (req, res, next) => {
  // DELETE /post/10
  try {
    await Stack.destroy({
      where: {
        id: req.params.stackId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ StackId: parseInt(req.params.stackId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
