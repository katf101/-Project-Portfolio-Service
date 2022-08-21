const express = require("express");
const { Op } = require("sequelize");
const { Post, Image, User } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // const id = req.query.id;
  const searchBool = isNaN(req.query.search);
  let pageNum = req.query.page ? req.query.page : 1;
  // let pageNum = req.query.page ? req.query.page : req.query.search;
  let offset = 0;
  if (pageNum > 1) {
    offset = 5 * (pageNum - 1);
  }
  // console.log("쿼리", id);
  // const page = parseInt(req.query.page) || 0;
  // const pageSize = 10;
  try {
    // if (typeof req.query.search === "string") {
    // if (isNaN(req.query.id) === true) {
    // if (isNaN(req.query.search) === true && req.query.search !== undefined) {
    if (searchBool === true && req.query.search !== undefined) {
      const posts = await Post.findAll({
        // where: { position: req.query.search },
        where: {
          position: {
            [Op.like]: "%" + req.query.search + "%",
          },
        },
        limit: 5,
        offset: offset,
        //   offset: 100,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["id", "name", "email"],
          },
        ],
      });
      let numbering = await Post.findAll({
        where: {
          position: {
            [Op.like]: "%" + req.query.search + "%",
          },
        },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["id", "name", "email"],
          },
        ],
      });

      return res.status(200).json({ posts: posts, numbering: numbering });
    } else {
      const posts = await Post.findAll({
        // where,
        limit: 5,
        offset: offset,
        //   offset: 100,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["id", "name", "email"],
          },
        ],
      });
      let numbering = await Post.findAll({
        // where,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["id", "name", "email"],
          },
        ],
      });
      // console.log("콘솔", posts);
      // console.log("콘솔", Math.ceil(numbering.length / 5));
      // numbering = Math.ceil(numbering.length / 5);

      res.status(200).json({ posts: posts, numbering: numbering });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
