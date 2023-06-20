const {createPool} = require('mysql2');

const pool = createPool (
    {
        host : "127.0.0.1",
        port : process.env.db_port,
        user : "root",
        password : process.env.db_password,
        database : process.env.db_db
    }
)

module.exports = pool;