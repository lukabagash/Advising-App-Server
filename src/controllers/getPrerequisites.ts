import { Request, Response } from 'express';
import { executeQuery } from '../database';

const getPrerequisitesController = async (req: Request, res: Response) => {
    const { trgt_dept, degree } = req.query;
  
    if (!trgt_dept || !degree) {
      return res.status(400).json({ error: 'Missing trgt_dept or degree' });
    }
  
    const query = `
    SELECT 
    Course.course_dept, 
    Course.course_number, 
    GROUP_CONCAT(DISTINCT CONCAT(PrereqCourse.course_dept, ' ', PrereqCourse.course_number)) as prerequisites
    FROM 
        DegreeRequirementList
    JOIN 
        CourseSet ON DegreeRequirementList.set_id = CourseSet.set_id
    JOIN 
        Course ON CourseSet.course_id = Course.course_id
    LEFT JOIN 
        Prereq ON Course.course_id = Prereq.course_id
    LEFT JOIN 
        CourseSet as PrereqCourseSet ON Prereq.set_id = PrereqCourseSet.set_id
    LEFT JOIN 
        Course as PrereqCourse ON PrereqCourseSet.course_id = PrereqCourse.course_id
    WHERE 
        DegreeRequirementList.trgt_dept = ? AND DegreeRequirementList.degree = ?
    GROUP BY 
        Course.course_id
    
    `;
  
    try {
      const results = await executeQuery(query, [trgt_dept, degree]);
      res.json({ data: results });
    } catch (err) {
      console.error('Database connection error:', err);
      res.status(500).json({ error: 'Database connection error' });
    }
};

export default getPrerequisitesController;
