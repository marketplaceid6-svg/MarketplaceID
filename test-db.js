require("dotenv").config();

const db = require("./database/postgres/db");

async function test() {
  try {
    const result = await db.query("SELECT NOW()");

    console.log("✅ PostgreSQL Connected");
    console.log(result.rows[0]);

    process.exit(0);
  } catch (err) {
    console.error("❌ Database Error");
    console.error(err.message);

    process.exit(1);
  }
}

test();
