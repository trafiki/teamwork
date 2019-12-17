/* eslint-disable no-console */
import dotenv from 'dotenv';
import pool from '../connection';
import Helper from '../../utils/Utils';

dotenv.config();

const password = process.env.PASSWORD;
const hashedPassword = Helper.hashPassword(password);

const addAllsqlTableQueries = `
      INSERT INTO users(username, firstname, lastname, email, password, gender, jobrole, department, address)
      VALUES ('trafiki' ,'Babatunde', 'Akerele', 'trafiki@teamwork.com', '${hashedPassword}', 'male', 'admin', 'HR', 'oko oba gra, lagos'),
             ( 'anu' ,'Anuoluwapo', 'Shittu', 'anu@teamwork.com', '${hashedPassword}', 'female', 'employee', 'Engineering' ,'Oko Oba, Lagos');
      `;

/**
 * Function representing UserTableHandler
 * @returns {object} representing success or failure
 */
async function insertAllToTables() {
  try {
    const create = await pool.query(addAllsqlTableQueries);
    console.log(`addAllsqlTableQueries: ${create.command}ED`);
  } catch (error) {
    console.log(`addAllsqlTableQueries: ${error}`);
  }
}

export default insertAllToTables;

// INSERT INTO gifs(gifownerId, title, imageUrl)
// VALUES ( 2, 'cat developer', 'http://res.cloudinary.com/marusofteamwork/image/upload/v1573995345/b2j6f4ascsrvvm76ebje.gif'),
//        ( 1, 'cat developer', 'http://res.cloudinary.com/marusofteamwork/image/upload/v1573995345/b2j6f4ascsrvvm76ebje.gif');
