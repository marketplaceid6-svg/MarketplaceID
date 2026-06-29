require("dotenv").config();

const db = require("./database/postgres/db");

async function migrate() {

  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

      title TEXT NOT NULL,
      description TEXT,
      category TEXT,
      price BIGINT NOT NULL,
      location TEXT,

      images TEXT[],

      status TEXT DEFAULT 'active',

      views INTEGER DEFAULT 0,
      favorites INTEGER DEFAULT 0,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log("✅ Products table created");

  process.exit();
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
