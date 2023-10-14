import express from "express";
import "./utils/dbconnect.js"
import config from "config"
import userRouter from "./controllers/Users/index.js"



let PORT = config.get("PORT");

let app = express();

app.set("view engine", "ejs");


app.use(express.json()); //  middleware built-in --> express.json()

app.get("/", (req, res)=> {
    res.send("Home Page")
})

app.use("/users", userRouter)

app.listen(PORT, () => {
  console.log("Server is Running in the 7000 port");
});
