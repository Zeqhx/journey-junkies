import mysql from "mysql";

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "journy_junkies",
});
export default pool;
