import { Request, Response } from 'express';
import { executeQuery } from '../database';

const postDataController = async (req: Request, res: Response) => {
  const { student_id, plan } = req.body;

  if (!student_id || !plan) {
    return res.status(400).json({ error: 'Missing student_id or plan' });
  }

  const query = `
    SELECT DISTINCT StudentScheduleList.year, StudentScheduleList.semester, StudentScheduleList.course_title
    FROM StudentScheduleList
    JOIN User ON StudentScheduleList.user_id = User.user_id
    JOIN PlanCreationInformation ON User.user_id = PlanCreationInformation.user_id AND StudentScheduleList.plan = PlanCreationInformation.plan
    WHERE PlanCreationInformation.user_id = ? AND PlanCreationInformation.plan = ?`;

  try {
    const results = await executeQuery(query, [student_id, plan]);
    res.json({ data: results });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ error: 'Database connection error' });
  }
};

export default postDataController;
