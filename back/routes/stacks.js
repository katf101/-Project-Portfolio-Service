// const express = require("express");
// const { Op } = require("sequelize");
// const { Post, Image, User } = require("../models");

// const router = express.Router();

// router.get("/", async (req, res, next) => {
//   try {
//     const stacks = await Stack.findAll({
//       where,
//       //   order: [["createdAt", "DESC"]],
//       include: [
//         {
//           model: User,
//           attributes: ["id", "name"],
//         },
//       ],
//     });
//     console.log(stacks);
//     res.status(200).json(stacks);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// module.exports = router;
