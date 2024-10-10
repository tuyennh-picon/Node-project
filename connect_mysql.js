const Test = require("mysql2")

const pool = Test.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    datbase: 'shop_dev',
    port: 33060
})