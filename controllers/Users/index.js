import express from "express";
import userModel from "../../models/usersSchema/Users.js";

let router = express.Router(); // creating a new router

router.post("/addUsers", async (req, res) => {
  try {
    let userData = req.body;
    await userModel.create(userData);
    res.status(200).json({ msg: "User added sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/Loginpage", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.log("Internal Error at Login Page");
  }
});

router.get("/getAllProfile", async (req, res) => {
  try {
    let myProfile = await userModel.find({});
    res.status(200).json(myProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getuserbyID/:id", async (req, res) => {
  try {
    let { id } = req.params;
    console.log(typeof id);
    let getUserData = await userModel.find(id); // Id doesn't use flower Brackect it has a define method.
    if (!getUserData) {
       return res.status(404).json({ Error: "User not Found" });
    }
    res.status(200).json(getUserData);
  } catch (error) {
    console.log("Error in the try block");
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/getUserbyEmail/:email", async (req, res) => {
  try {
    let userByEmail = req.params.email;
    console.log(typeof (userByEmail));

  } catch (error) {
    res.status(404).json({msg : "User not Found"})
  }
})

export default router;
