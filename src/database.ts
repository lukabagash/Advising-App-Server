import { Client } from 'ssh2';
import { createConnection } from 'mysql2/promise';
import { sshConfig, dbConfig } from './config';

export const executeQuery = async (query: string, params: any[]) => {
  const conn = new Client();

  return new Promise((resolve, reject) => {
    conn.on('ready', async () => {
      console.log('SSH connection established');

      try {
        const dbConnection = await createConnection(dbConfig);
        console.log('Database connection successful');

        const [results] = await dbConnection.execute(query, params);
        console.log('Database query successful');

        await dbConnection.end();
        conn.end();

        resolve(results);
      } catch (error) {
        console.error('Database connection or query execution error:', error);
        reject(error);
      }
    }).on('error', (error) => {
      console.error('SSH connection error:', error);
      reject(error);
    });

    conn.connect(sshConfig);
  });
};
