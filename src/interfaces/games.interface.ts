import { Document } from "mongoose";

export interface IGames extends Document {
    name: string;
    genre: string;
    console: string;
}