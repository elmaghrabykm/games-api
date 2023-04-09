import { Application } from "express";
import { GamesController } from "./gamesapi.controller";
import { GamesService } from "./services/gamesapi.service";
import { MONGO_URI } from "./constants/gamesapi.constants";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.setConfig();
        this.setMongoConfig();
        this.setControllers();
    }

    private setConfig() {
        // Allows us to receive requests with data in json format
        this.app.use(bodyParser.json({ limit: "50mb" }));
        // Allows us to receive requests with data in x-www-form-urlencoded format
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        // Enables cors
        this.app.use(cors());
    }

    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(MONGO_URI)
            .then(() => console.log("Database connected!"))
            .catch((error: any) => console.log(error));
            
        mongoose.set("toJSON", {
            virtuals: true,
            transform: (_: any, converted: any) => {
                delete converted._id;
            },
        })
    }

    private setControllers() {
        //create a new instance of our games controller
        const gamesController = new GamesController(new GamesService());

        // Telling express to use our Controller's routes
        this.app.use("/games", gamesController.router)
    }

}

export default new App().app;