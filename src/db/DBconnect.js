import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const DBConnect = async () => {
    try {
        const DBInstance = await mongoose.connect(`${process.env.MONDODB_URI}/${DB_NAME}`);
        console.log(`MONGODB CONNECTED SUCCESSFULLY ! HOST : ${DBInstance.connection.host}`);
    } catch (error) {
        console.log("Error connecting MongoDB", error);
        process.exit(1);
    }
}


export default DBConnect;