require("dotenv").config();

const db = require("./database/postgres/db");

async function migrate() {
  try {

    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id BIGSERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        avatar TEXT DEFAULT '/uploads/profiles/default-avatar.png',
        role VARCHAR(20) DEFAULT 'user',
        verified BOOLEAN DEFAULT false,
        blocked BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Users table created");

    process.exit();

  } catch (err) {

    console.error(err);

    process.exit(1);

  }
}

migrate();
