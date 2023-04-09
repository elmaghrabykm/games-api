import { IGames } from "../interfaces/games.interface";
import {model, Schema} from "mongoose";

const GamesSchema = new Schema({
    name: {type: String, required:[true, "Field is required"]},
    genre:{type: String, required:[true, "Field is required"]},
    console:{type: String, required:[true, "Field is required"]},
},

{ versionKey: "customVersionKey" }
);

export const Games = model<IGames>("Games", GamesSchema);