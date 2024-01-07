import 'dotenv/config';
import * as child_process from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(child_process.exec);

const databaseUrls = ['customdomain'];

async function migrateDatabase(databaseUrl: string) {
  process.env.DATABASE_URL = databaseUrl;
  try {
    const { stdout, stderr } = await exec('npx prisma migrate dev');
    console.log(stdout);
    console.error(stderr);
  } catch (error) {
    console.error(`Failed to migrate database at ${databaseUrl}`, error);
    throw error;
  }
}

async function main() {
  let schema = 'public';

  for (const database of databaseUrls) {
    if (!database) {
      console.warn('A database URL is missing. Skipping...');
      continue;
    }

    const url = process.env.DATABASE_URL.replace(schema, database);

    schema = database;

    await migrateDatabase(url);
  }

  schema = 'public';
}

main()
  .then(() => console.log('Migration completed successfully.'))
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
