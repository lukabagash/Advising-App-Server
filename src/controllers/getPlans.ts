import { Request, Response } from 'express';
import { executeQuery } from '../database';

const getPlanCreationInfo = async (req: Request, res: Response) => {
    const user_id = req.params.uuid;
  
    if (!user_id) {
      return res.status(400).json({ error: 'Missing user_id' });
    }
  
    const query = `
            SELECT 
            plan, 
            creation_year
        FROM 
            PlanCreationInformation
        WHERE 
            user_id = ?
        ORDER BY 
            creation_year;
        `;
  
    try {
      const results = await executeQuery(query, [user_id]);
      res.json({ data: results });
    } catch (err) {
      console.error('Database connection error:', err);
      res.status(500).json({ error: 'Database connection error' });
    }
};

export default getPlanCreationInfo;
