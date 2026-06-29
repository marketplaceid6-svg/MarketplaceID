require("dotenv").config();

const fs = require("fs");
const path = require("path");
const db = require("./database/postgres/db");

async function importUsers() {

  try {

    const file =
      path.join(
        __dirname,
        "database",
        "users.json"
      );

    const json =
      JSON.parse(
        fs.readFileSync(file, "utf8")
      );

    const users =
      json.users || [];

    console.log("Total User :", users.length);

    for (const user of users) {

      await db.query(
        `INSERT INTO users
        (
          username,
          email,
          password,
          avatar,
          role,
          verified,
          blocked,
          created_at,
          last_active
        )

        VALUES
        (
          $1,$2,$3,$4,$5,$6,$7,NOW(),NOW()
        )

        ON CONFLICT(email)
        DO NOTHING`,
        [

          user.username,

          user.email,

          user.password,

          user.avatar ||
          "/uploads/profiles/default-avatar.png",

          user.role ||
          "user",

          user.verified ||
          false,

          user.blocked ||
          false

        ]
      );

    }

    console.log("✅ Import Users Selesai");

    process.exit();

  } catch (err) {

    console.error(err);

    process.exit(1);

  }

}

importUsers();
