const { Client } = require("pg");

const client = new Client({
  user: "a",
  host: ".com",
  database: "defaultdb",
  password: "",
  port: 19956,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = client;
