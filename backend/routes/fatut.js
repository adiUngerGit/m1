// const express = require("express");
// const ListsOrdered = require("../models/listsOrdered");

// const router = express.Router();

// router.post("/placeListOrder", async (req, res) => {
//   try {
//     if (!Array.isArray(req.body.names)) {
//       throw new Error("names must be an array");
//       // todo make sure all names exist in the database, else throw
//     }
//     const obj = new ListsOrdered({
//       names: req.body.names,
//       date: new Date(), // now
//     });
//     await obj.save();
//     return res.send({ id: obj._id });
//   } catch (err) {
//     return res.status(400).send(err.message);
//   }
// });

// module.exports = router;
