import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pmb_fikes_app'
})

export default pool.promise();