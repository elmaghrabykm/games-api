import { Request, Response, Router } from "express";
import { GamesService } from "./services/gamesapi.service";

export class GamesController {
    public router = Router();
    private gamesService: GamesService;

    constructor(gamesService: GamesService) {
        this.gamesService = gamesService;
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route("/").get(this.sayHi);
        this.router.route("/").post(this.addGame);
        this.router.route("/all").get(this.findAll);
        this.router.route("/:id").get(this.findById);
        this.router.route("/:id").delete(this.deleteGame);
        this.router.route("/:id").put(this.updateGame);
    }

    private sayHi = (req: Request, res: Response) => {
        const welcomeMessage = this.gamesService.getWelcomeMessage();
        return res.send(welcomeMessage);
    };

    private findAll = async (req: Request, res: Response) => {
        try {
            const games = await this.gamesService.findAll();
            res.send(games);
        } catch (error: any) {
            res.status(500).send(error.message);
        }

    }

    private findById = async (req: Request, res: Response) => {
        try {
            const games = await this.gamesService.findById(req.params.id);
            res.send(games);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }


    private addGame = async (req: Request, res: Response) => {
        try {
            const addNewGame = await this.gamesService.addGame(req.body);
            res.send(addNewGame);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    private updateGame = async (req: Request, res: Response) => {

        try {
            const updatedGame = await this.gamesService.updateGame(req.params.id, req.body);
            res.send(updatedGame);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    private deleteGame = async (req: Request, res: Response) => {
        try {
            const deleteExistGame = await this.gamesService.deleteGame(req.params.id);
            res.send(deleteExistGame);

        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
}
