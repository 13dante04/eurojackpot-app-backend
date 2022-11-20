import express, { Express} from 'express';
import homeRouter from "./api/v1/home/home";
  

const PORT = 3000;

const app: Express = express();



// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/home', homeRouter);


app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

