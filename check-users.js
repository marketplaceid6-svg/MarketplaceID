require("dotenv").config();

const db = require("./database/postgres/db");

(async()=>{

const result =
await db.query(
"SELECT id,username,email FROM users ORDER BY id"
);

console.table(result.rows);

process.exit();

})();
