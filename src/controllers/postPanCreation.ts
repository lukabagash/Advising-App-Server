import { Request, Response } from 'express';
import { executeQuery } from '../database';

const addPlanCreationInfo = async (req: Request, res: Response) => {
  const { userId, plan, creation_day, creation_month, creation_year } = req.body;


  const query = 'INSERT INTO PlanCreationInformation (user_id, plan, creation_day, creation_month, creation_year) VALUES (?, ?, ?, ?, ?)';

  try {
    
    const result = await executeQuery(query, [userId, plan, creation_day, creation_month, creation_year]);
    res.json({ message: 'Plan creation information added' });
  } catch (err) {
    // Log the error message
    console.error('Error:', err);

    res.status(500).json({ error: 'Database connection error' });
  }
};

export default addPlanCreationInfo;
