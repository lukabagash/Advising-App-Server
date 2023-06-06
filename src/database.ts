import { createConnection } from 'mysql2/promise';
import { dbConfig } from './config';

export const executeQuery = async (query: string, params: any[]): Promise<any> => {
  try {
    const dbConnection = await createConnection(dbConfig);
    console.log('Database connection successful');

    const [results] = await dbConnection.execute(query, params);
    console.log('Database query successful');

    await dbConnection.end();

    return results;
  } catch (error) {
    console.error('Database connection or query execution error:', error);
    throw error;
  }
};
