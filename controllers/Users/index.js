import express from "express";
import userModel from "../../models/users/Users.js";

let router = express.Router();

router.post("/addUsers", async (req, res) => {
  try {
    let userData = req.body;
    await userModel.create(userData);
    res.status(200).json({ msg: "User added sucessfully" });
  } catch (error) {
      console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
