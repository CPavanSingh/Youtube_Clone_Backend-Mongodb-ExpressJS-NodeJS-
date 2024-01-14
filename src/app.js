import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));
app.use(express.json({limit: "16kb", extended: true}));
app.use(express.urlencoded({limit: "16kb", extended: true}));
app.use(cookieParser());
app.use(express.static("public"));


export {app};