import express, { Express } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from 'http';
import { handleError } from '../middlewares/handle-error.middleware';
import { appConfig } from '../config/app.config';
import mainRouter from '../routes/main.route';

export class WebService {
    protected static app: Express = express();
    protected static port: string | number = appConfig.port || 4000;

    static async start(): Promise<void> {
        this.useMiddleware([
            express.json(), 
            cors({ origin: '*'}),
            helmet(), 
            compression(),
            morgan('dev'),
            handleError,
            mainRouter
        ]);
        const server = createServer(this.app);
        server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        })
    }

    static useMiddleware(middleware: any): void {
        for (const m of middleware) {
            this.app.use(m);
        }
    }
}

