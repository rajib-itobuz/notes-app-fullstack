import express from "express";
import { connectDb } from "./dbConnect/connectDb.js";
import { config } from "./config/index.js";
import cors from 'cors'
import manageRoute from "./route/index.js";
import { timeLog } from "./middleware/logger.js";


const app = express();

connectDb(config.mongoURl);


app.use(express.json());
app.use(cors());
app.use(timeLog);
app.use(manageRoute());
app.use((err, req, res, next) => {
    if (err) {
        return res.status(400).send({
            status: 400,
            message: err.message,
            data: null
        })
    }
});


app.listen(config.port, () => {
    console.log(`Server connected at : ${config.port}`);
})