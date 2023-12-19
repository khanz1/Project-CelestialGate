import * as path from 'path';
import * as fs from 'fs/promises';
import { client } from './pg-connection';
import * as process from 'process';

(async () => {
  const sqlFilePath = path.resolve(__dirname, '../migrations/migrations.sql');
  const sqlScript = await fs.readFile(sqlFilePath, 'utf-8');
  await client.connect();

  const result = await client.query<[]>(sqlScript);
  console.log(`Migrations applied: ${(result as unknown as []).length}`);

  await client.end();
  process.exit(0);
})();
