import * as path from 'path';
import * as fs from 'fs/promises';
import { client } from './pg-connection';

(async () => {
  const sqlFilePath = path.resolve(
    __dirname,
    '../migrations/migrations_undo.sql',
  );
  const sqlScript = await fs.readFile(sqlFilePath, 'utf-8');
  await client.connect();
  await client.query(sqlScript);
  console.log(`Migrations undo done`);
  await client.end();
})();
