import 'reflect-metadata';
import './controllers/log-user.controller';
import './controllers/profile.controller';
import './controllers/token.controller';

import { Application } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Ioc } from './ioc/ioc';
import bodyParser from 'body-parser';
import cors from 'cors';

class Main {
    start() {
        const container: Container = Ioc.register();

        const server: InversifyExpressServer = new InversifyExpressServer(container);
        server.setConfig((app: Application) => {
            app.use(cors());
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false, limit: '100kb' }));
        })
        const app: Application = server.build();

        app.listen(3010, () => {
            console.log('Welcome to Card game (Sso Server). Started on port 3010');
        })
    }
}


const main: Main = new Main();
main.start();
