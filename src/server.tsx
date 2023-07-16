import express, { Request, Response } from 'express';
import postDataController from './controllers/postDataController';
import getDegreeRequirementController from './controllers/getDegreeRequirementController';
import getPrerequisitesController from './controllers/getPrerequisites';
import getOffering from './controllers/getOffering';
import addUser from './controllers/postUsername';
import getPlanCreationInfo from './controllers/getPlans';
import addPlanCreationInfo from './controllers/postPanCreation';
import addCourseToSchedule from './controllers/postAddCourses';
import deletePlanController from './controllers/postDeletePlanController'; // Import the controller
const app = express();

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  res.header('Access-Control-Allow-Origin', 'http://localhost:19006'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json()); // To handle JSON input

app.post('/data', postDataController);
app.get('/degree-requirement', getDegreeRequirementController);
app.get('/preequisites', getPrerequisitesController);
app.get('/getOffering', getOffering);
app.get('/getPlan/:uuid', getPlanCreationInfo);
app.post('/addUser', addUser);
app.post('/addPlan', addPlanCreationInfo);
app.post('/addCourseToSchedule', addCourseToSchedule);
app.delete('/deletePlan', deletePlanController);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
