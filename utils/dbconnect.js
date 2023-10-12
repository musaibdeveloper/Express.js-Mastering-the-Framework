import mongoose from "mongoose"
import config from "config"

let dbconnnect = async () => {
    try {
        await mongoose.connect(config.get("DB_URI"));
        console.log("DB is connnected successfully")
    } catch (error) {
        console.log(error);
    }
}

dbconnnect();