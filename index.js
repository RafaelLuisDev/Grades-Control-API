import express from 'express';
import { promises } from 'fs';
import gradesRouter from './routes/grades.js';
import winston from 'winston';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './doc.js';
import cors from 'cors';

const app = express();
const port = 3000;
const readFile = promises.readFile;
const writeFile = promises.writeFile;

global.fileName = 'grades.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: 'silly',
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'my-bank-api.log' })],
    format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

app.use(express.json());
app.use('/grades', gradesRouter);
app.use(cors());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, async () => {
    logger.info('API Started');
});
