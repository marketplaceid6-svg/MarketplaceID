const db = require("./db");
const bcrypt = require("bcryptjs");

async function registerUser(username, email, password) {

  const hash = await bcrypt.hash(password, 10);

  const result = await db.query(
    `
    INSERT INTO users
    (username,email,password)
    VALUES($1,$2,$3)
    RETURNING id,username,email
    `,
    [username, email, hash]
  );

  return result.rows[0];
}

async function findUser(login) {

  const result = await db.query(
    `
    SELECT *
    FROM users
    WHERE username=$1
       OR email=$1
    `,
    [login]
  );

  return result.rows[0];
}

async function userExists(username, email) {

  const result = await db.query(
    `
    SELECT id
    FROM users
    WHERE username=$1
       OR email=$2
    LIMIT 1
    `,
    [username, email]
  );

  return result.rows.length > 0;
}

module.exports = {
  registerUser,
  findUser,
  userExists,
updateLastActive
};

async function registerUser(username, email, password) {

  console.log("Register PostgreSQL:", username, email);

  const hash = await bcrypt.hash(password, 10);

  const result = await db.query(
    `
    INSERT INTO users
    (username,email,password)
    VALUES($1,$2,$3)
    RETURNING id,username,email
    `,
    [username, email, hash]
  );

  console.log("Insert berhasil:", result.rows[0]);

  return result.rows[0];
}

async function updateLastActive(userId) {

  await db.query(
    `
    UPDATE users
    SET last_active = NOW()
    WHERE id = $1
    `,
    [userId]
  );

}
