const express = require("express");

const { Image, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET /post/1
  try {
    const image = await Image.findOne({
      where: { UserId: req.query.info },
      // include: [
      //   {
      //     model: User,
      //     attributes: ["id", "name"],
      //   },
      // ],
    });
    if (!image) {
      res.status(404).send("존재하지 않는 이미지입니다.");
      return res.status(404).send(image);
    }

    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:UserId", isLoggedIn, async (req, res, next) => {
  // DELETE /post/10
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
