import { Request, Response } from 'express';
import { executeQuery } from '../database';

const getDegreeRequirementController = async (req: Request, res: Response) => {
    const { trgt_dept, degree } = req.query;
  
    if (!trgt_dept || !degree) {
      return res.status(400).json({ error: 'Missing trgt_dept or degree' });
    }
  
    const query = `
      SELECT 
          DegreeRequirementList.set_id,
          GROUP_CONCAT(CONCAT(Course.course_dept, ' ', Course.course_number)) as course_details
      FROM 
          DegreeRequirementList
      JOIN 
          CourseSet ON DegreeRequirementList.set_id = CourseSet.set_id
      JOIN 
          Course ON CourseSet.course_id = Course.course_id
      WHERE 
          DegreeRequirementList.trgt_dept = ? AND DegreeRequirementList.degree = ?
      GROUP BY 
          DegreeRequirementList.set_id`;
  
    try {
      const results = await executeQuery(query, [trgt_dept, degree]);
      res.json({ data: results });
    } catch (err) {
      console.error('Database connection error:', err);
      res.status(500).json({ error: 'Database connection error' });
    }
  };

  export default getDegreeRequirementController;