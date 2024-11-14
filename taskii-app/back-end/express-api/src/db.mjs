import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' })

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

connection.connect()

export default connection;

// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })
// connection.end()

// npx nodemon db.mjs