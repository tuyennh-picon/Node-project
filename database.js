const Test = require("mysql2")

const pool = Test.createPool({
    host: 'localhost',
    user: 'root',
    database: 'shop_dev',
    password: 'root',
    port: 33060
})

const batchSize =  10000;
const totalSize = 10_000_000;
let currentID = 1;
const insertBatch = async() => {
    const values = [];
    for(let i = 0 ; i < batchSize && currentID <= totalSize; i++) {
        const name = "Name" + currentID;
        const age = currentID;
        values.push([name, age]);
        currentID++;
    }

    if(values.length == 0) {
        pool.end(err => {
            if(err) {
                console.log('error')
            } else {
                console.log('success')
            }
        })
    
        return;
    }
    
    const sql = `INSERT INTO product (name, age) VALUES ?`;
    pool.query(sql,[values] , async function(err, results){
        if(err) throw err;
    
        console.log(`Insert ${results.affectedRows} records`);
    
        await insertBatch();
    })
}

insertBatch().catch(err => console.log(err))
