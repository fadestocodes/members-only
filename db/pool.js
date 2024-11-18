const {Pool} = require('pg');

module.exports = new Pool({
    host : 'localhost',
    user : "drew",
    database : "drew",
    password : 'andrew604',
    port : 5432
});