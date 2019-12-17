/* eslint-disable no-console */
import pool from '../connection';

const articlesTable = `
DROP TABLE IF EXISTS articles CASCADE;
  CREATE TABLE IF NOT EXISTS articles(
    articleid SERIAL PRIMARY KEY NOT NULL,
    authorid INTEGER NOT NULL,
    title VARCHAR(128) NOT NULL,
    article TEXT NOT NULL,
    createdon TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE
  )`;

/**
 * Function representing ArticlesTableHandler
 * @returns {object} representing sucess or failure
 */
async function createArticlesTable() {
  try {
    const create = await pool.query(articlesTable);
    console.log(`articlesTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(`articlesTable: ${error}`);
  }
}

export default createArticlesTable;
