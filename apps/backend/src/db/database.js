const { Client } = require('pg');

const client = new Client({
    user: 'avnadmin',
    host: 'sudeepdb-sudeepkudari0-c5ef.a.aivencloud.com',
    database: 'defaultdb',
    password: 'AVNS_VcEc6RAlUGOVSpBko6b',
    port: 19956,
    ssl: {
        rejectUnauthorized: false,
    },
})

module.exports = client;
   