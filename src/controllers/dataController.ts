import { Request, Response } from 'express';
import { executeQuery } from '../database';

export const postDataController = async (req: Request, res: Response) => {
  const { student_id, plan } = req.body;

  if (!student_id || !plan) {
    return res.status(400).json({ error: 'Missing student_id or plan' });
  }

  const query = `
    SELECT DISTINCT Offering.year, Offering.semester, Course.course_dept, Course.course_number
    FROM Offering
    JOIN Course ON Offering.course_id = Course.course_id
    JOIN Schedule ON Offering.offering_id = Schedule.offering_id
    JOIN Plan ON Schedule.student_id = Plan.student_id AND Schedule.plan = Plan.plan
    WHERE Plan.student_id = ? AND Plan.plan = ?`;

  try {
    const results = await executeQuery(query, [student_id, plan]);
    res.json({ data: results });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ error: 'Database connection error' });
  }
};
