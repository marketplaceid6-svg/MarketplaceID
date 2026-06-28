require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.get("/", (req, res) => {
  res.send("MarketplaceID V3 Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `MarketplaceID Running On Port ${PORT}`
  );
});
