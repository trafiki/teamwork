import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
let connect;

if (process.env.Node_ENV === 'test') {
  connect = {
    connectionString: process.env.TEST_DATABASE_URL,
  };
}
connect = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(connect);
export default pool;
