import dotenv from "dotenv";
import DBConnect from "./db/DBconnect.js";

dotenv.config({
    path: "./env"
})

DBConnect();