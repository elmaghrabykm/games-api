import { Games } from "../models/games.model";
import { IGames } from "../interfaces/games.interface";
import { WELCOME_MSG } from "../constants/gamesapi.constants";

export class GamesService {
    public getWelcomeMessage() {
        return WELCOME_MSG;
    }

    public findAll(): Promise<IGames[]> {
        return Games.find({}).exec();
    }

    public async findById(id: string): Promise<IGames> {

        const retrievedGame = await Games.findById(id).exec()

        if (!retrievedGame) {
            throw new Error(`Game with id '${id}' not found`);
        }

        return retrievedGame;
    }

    public addGame(game: IGames): Promise<IGames> {
        const newGame = new Games(game);
        return newGame.save();

    }

    public async deleteGame(id: string): Promise<IGames> {

        const deletedGame = await Games.findByIdAndDelete(id).exec();

        if (!deletedGame) {
            throw new Error(`Game with id '${id}' not found`);
        }

        return deletedGame;
    }

    public async updateGame(id: string, game: IGames): Promise<IGames> {

        const updatedGame = await Games.findByIdAndUpdate(id, game).exec();

        if (!updatedGame) {
            throw new Error(`Game with id '${id}' not found`);
        }

        return updatedGame;
    }
}