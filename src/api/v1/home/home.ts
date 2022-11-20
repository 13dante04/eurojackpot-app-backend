import express, { Router } from 'express';
import { getResults } from '../../../eurojackpot-results';
const homeRouter: Router = express.Router();


homeRouter.get("/", async (req, res) =>  {
  console.log('Home route')
  try {
    return res.json(await getResults());
  } catch (error) {
    console.error(error);
  }
});

export default homeRouter;