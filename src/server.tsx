import express, { Request, Response } from 'express';
import postDataController from './controllers/postDataController';
import getDegreeRequirementController from './controllers/getDegreeRequirementController';
const app = express();

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

app.use(express.json()); // To handle JSON input

app.post('/data', (req: Request, res: Response) => {
  postDataController(req, res);
}); //keep it as post for user info retrieval (but endpoint should be modified)

app.get('/degree-requirement', (req: Request, res: Response) => {
  getDegreeRequirementController(req, res);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
