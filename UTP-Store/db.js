const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "utp_store",
    password: "andree2020",
    port: 5432,
});

module.exports = pool;