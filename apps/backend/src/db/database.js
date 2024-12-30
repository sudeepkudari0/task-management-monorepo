const { Client } = require("pg");

const client = new Client({
  user: "",
  host: "",
  database: "",
  password: "",
  port: 19956,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = client;
