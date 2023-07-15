import express, { Request, Response } from 'express';
import postDataController from './controllers/postDataController';
import getDegreeRequirementController from './controllers/getDegreeRequirementController';
import getPrerequisitesController from './controllers/getPrerequisites';
import getOffering from './controllers/getOffering';
import addUser from './controllers/postUsername';
import getPlanCreationInfo from './controllers/getPlans';
import addPlanCreationInfo from './controllers/postPanCreation';
import addCourseToSchedule from './controllers/postAddCourses';
const app = express();

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  res.header('Access-Control-Allow-Origin', 'http://localhost:19006'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json()); // To handle JSON input

app.post('/data', (req: Request, res: Response) => {
  postDataController(req, res);
}); //keep it as post for user info retrieval (but endpoint should be modified)

app.get('/degree-requirement', (req: Request, res: Response) => {
  getDegreeRequirementController(req, res);
});

app.get('/preequisites', (req: Request, res: Response) => {
  getPrerequisitesController(req, res);
});

app.get('/getOffering', (req: Request, res: Response) => {
  getOffering(req, res);
});

app.get('/getPlan/:uuid', (req: Request, res: Response) => {
  getPlanCreationInfo(req, res);
});

app.post('/addUser', (req: Request, res: Response) => {
  addUser(req, res);
});

app.post('/addPlan', (req: Request, res: Response) => {
  addPlanCreationInfo(req, res);
});

app.post('/addCourseToSchedule', (req: Request, res: Response) => {
  addCourseToSchedule(req, res);
  console.log("tableData saved")
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
