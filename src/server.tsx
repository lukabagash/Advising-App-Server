import express, { Request, Response } from 'express';
import { postDataController } from './controllers/dataController';

const app = express();

app.use(express.json()); // To handle JSON input

app.post('/data', (req: Request, res: Response) => {
  postDataController(req, res);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
