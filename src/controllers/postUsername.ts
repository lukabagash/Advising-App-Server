import { Request, Response } from 'express';
import { executeQuery } from '../database';

const addUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing user id' });
  }

  const query = 'INSERT INTO User (user_id) VALUES (?)';

  try {
    await executeQuery(query, [userId]);
    res.json({ message: 'User added' });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ error: 'Database connection error' });
  }
};

export default addUser;
