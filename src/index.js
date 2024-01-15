import dotenv from "dotenv";
import DBConnect from "./db/DBconnect.js";
import  app  from "./app.js";

dotenv.config({
    path: "./.env"
})

DBConnect()
.then(
    app.on("Error", (err)=> {console.log("Express connection to DB failed", err);throw err}),
    app.listen(process.env.PORT || 9000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`)
    }))
.catch(
    (err)=>{console.log(`MongoDB connection error: ${err}`)}
    )