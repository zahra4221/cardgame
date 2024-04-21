import 'reflect-metadata';
import './implementations/controllers/cards.controller';
import './implementations/controllers/decks.controller';

import { Application } from 'express';
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { Ioc } from "./ioc/ioc";
import bodyParser from 'body-parser';
import cors from 'cors';

class Main {
    start() {
        const container: Container = Ioc.register();

        const server: InversifyExpressServer = new InversifyExpressServer(container);
        server.setConfig((app: Application) => {
            const corsOptions = {
                "origin": "*",
                "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
              }
            app.use(cors(corsOptions));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false, limit: '100kb' }));
        })
        const app: Application = server.build();

        app.listen(3000, () => {
            console.log('Welcome to Card game (Server). Started on port 3000');
        })
    }
}


const main: Main = new Main();
main.start();