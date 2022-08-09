const express = require("express");
const { Op } = require("sequelize");
const { Post, Image, User } = require("../models");

const router = express.Router();

// router.get("/", async (req, res, next) => {
//   const id = req.query.id;
//   console.log("쿼리", id);
//   // let pageNum = req.query.id;
//   let offset = 0;
//   if (id > 1) {
//     console.log("ㅑ");
//     offset = 1 * (id - 1);
//   }
//   // console.log("쿼리", id);
//   // const page = parseInt(req.query.page) || 0;
//   // const pageSize = 10;
//   try {
//     const where = {};
//     // if (parseInt(req.query.lastId, 10)) {
//     if (parseInt(req.query.id, 10)) {
//       // 초기 로딩이 아닐 때
//       where.id = { [Op.lt]: parseInt(req.query.id, 10) };
//       console.log("where", where);
//       console.log("where.id", where.id);
//       console.log("where.id2", where.id[0]);
//       // where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
//     } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
//     const posts = await Post.findAll({
//       // where: { id: lastId },
//       // where: { id: id },
//       where,
//       limit: 2,
//       offset,
//       //   offset: 100,
//       order: [["createdAt", "DESC"]],
//       include: [
//         {
//           model: User,
//           attributes: ["id", "name"],
//         },
//       ],
//     });
//     console.log("콘솔", posts);
//     res.status(200).json(posts);
//     // res.status(200).json({ posts, hasMore: page < 9 });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

//###############//

router.get("/", async (req, res, next) => {
  // const id = req.query.id;
  console.log("querypage", req.query.page);
  console.log("querysearch", req.query.search);
  console.log("query", req.query);
  console.log("nanpage", isNaN(req.query.page));
  // console.log("난서치", isNaN(req.query.search));
  const searchBool = isNaN(req.query.search);
  console.log("아디타입", typeof +req.query.page === "number");
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
      // const where = {};
      // if (parseInt(req.query.lastId, 10)) {
      // if (parseInt(req.query.id, 10)) {
      //   // 초기 로딩이 아닐 때
      //   where.id = { [Op.lt]: parseInt(req.query.id, 10) };
      //   console.log("where", where);
      //   console.log("where.id", where.id);
      //   console.log("where.id2", where.id[0]);
      //   // where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
      // } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
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
      console.log("콘솔", posts);
      console.log("콘솔", Math.ceil(numbering.length / 5));
      // numbering = Math.ceil(numbering.length / 5);

      // res.status(200).json({ posts: posts, numbering: numbering });
      res.status(200).json({ posts: posts, numbering: numbering });
      // res.status(200).json(posts);
      // res.status(200).json({ posts, hasMore: page < 9 });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
