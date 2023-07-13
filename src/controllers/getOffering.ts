import { Request, Response } from 'express';
import { executeQuery } from '../database';

const getOffering = async (req: Request, res: Response) => {
    const { start_year, end_year } = req.query;
  
    if (!start_year || !end_year) {
      return res.status(400).json({ error: 'Missing start and end years' });
    }
  
    const query = `
            SELECT 
            c.course_dept, 
            c.course_number, 
            o.year, 
            o.semester, 
            o.status
        FROM 
            Offering o
        JOIN 
            Course c ON o.course_id = c.course_id
        WHERE 
            o.year BETWEEN ? AND ?
        ORDER BY 
            c.course_dept, 
            c.course_number, 
            o.year, 
            o.semester;
        `;
  
    try {
      const results = await executeQuery(query, [start_year, end_year]);
      res.json({ data: results });
    } catch (err) {
      console.error('Database connection error:', err);
      res.status(500).json({ error: 'Database connection error' });
    }
  };

  export default getOffering;