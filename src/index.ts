import express, { Express} from 'express';
import homeRouter from "./api/v1/home/home";
import bodyParser from "body-parser";
import  swaggerJsdoc from "swagger-jsdoc";
import  swaggerUi from "swagger-ui-express";
import { SWAGGER_OPTIONS } from './consts/swagger.options';

const PORT = 3000;

const app: Express = express();

const specs = swaggerJsdoc(SWAGGER_OPTIONS);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
app.use('/home', homeRouter);


app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

