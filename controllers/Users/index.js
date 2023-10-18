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

router.get("/getallusers", async (req, res) => {
  try {
    let myProfile = await userModel.find({});
    res.status(200).json(myProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getuserbyID/:id", async (req, res) => {
  try {
    // let id = req.params.id;
    // console.log(id);

    let { id } = req.params;
    console.log(id, typeof id);

    let getUserData = await userModel.findById(id); // Id doesn't use flower Brackect it has a define method.
    if (!getUserData) {
      return res.status(404).json({ Error: "User not Found" });
    }
    res.status(200).json(getUserData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/getUserbyEmail/:email", async (req, res) => {
  try {
    let userByEmail = req.params.email;
    console.log(userByEmail);
    let findByEmail = await userModel.findOne({ email: userByEmail });
    if (!findByEmail) {
      return res.status(404).json({ msg: " User Email not found" });
    }

    res.status(200).json(findByEmail);
  } catch (error) {
    res.status(404).json({ msg: "User not Found" });
  }
});

router.delete("/delete/:email", async (req, res) => {
  try {
     console.log("Hello");
    let email = req.params.email;
    console.log(email);
    let findemail = await userModel.findOneAndDelete({ email: email });
    if (!findemail) {
      res.status(404).json({ msg: "Email not found" });
    }

    res.status(200).json({ msg: "User deleted sucessfully" });
  } catch (error) {
    res.status(404).json({ msg: "Internal Server Error" });
  }
});

// router.delete("/deleteallUsers", async (req, res) => {
//   try {
//     await userModel.deleteMany({});
//     res.status(200).json({ msg: "All users are deleted" });
//   } catch (error) {
//     res.status(500).json({ msg: "Internal Server error" });
//   }
// });

export default router;
