import { Request, Response } from 'express';
import { executeQuery } from '../database';

const deletePlanController = async (req: Request, res: Response) => {
  const { user_id, plan } = req.query;

  if (!user_id || !plan) {
    return res.status(400).json({ error: 'Missing user_id or plan' });
  }

  console.log(user_id, plan);

  const deleteFromStudentScheduleListQuery = `
    DELETE FROM StudentScheduleList
    WHERE user_id = ? AND plan = ?`;

  const deleteFromPlanCreationInformationQuery = `
    DELETE FROM PlanCreationInformation
    WHERE user_id = ? AND plan = ?`;

  try {
    await executeQuery(deleteFromStudentScheduleListQuery, [user_id, plan]);
    await executeQuery(deleteFromPlanCreationInformationQuery, [user_id, plan]);
    res.json({ message: 'Plan deleted successfully' });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ error: 'Database connection error' });
  }
};

export default deletePlanController;
