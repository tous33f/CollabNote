
import { configDotenv } from "dotenv";
import app from "./app.js";

configDotenv()

app.listen(8080,()=>{
    console.log("app listening")
})
