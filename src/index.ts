import express, { Application, Request, Response } from 'express'
import apiRouter from './router'
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
const app: Application = express()

dotenv.config();
app.use(bodyParser.json());
app.use('/', apiRouter);

app.listen(3000)