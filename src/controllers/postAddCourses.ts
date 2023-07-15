import { Request, Response } from 'express';
import { executeQuery } from '../database';

const addCourseToSchedule = async (req: Request, res: Response) => {
  const { user_id, plan, course_title, semester, year } = req.body;


  const query = 'INSERT INTO StudentScheduleList (user_id, plan, course_title, semester, year) VALUES (?, ?, ?, ?, ?)';

  try {

    const result = await executeQuery(query, [user_id, plan, course_title, semester, year]);
    res.json({ message: 'Plan creation information added' });
  } catch (err) {
    // Log the error message
    console.error('Error:', err);

    res.status(500).json({ error: 'Database connection error' });
  }
};

export default addCourseToSchedule;
