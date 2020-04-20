const mysql=require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wuhao123',
    database: 'db_out'
})
connection.connect(function (err) {
    if (err) {
        console.error('error connecting:' + err.stack)
    }
    console.log('connected as id ' + connection.threadId);
})
function query(sql) {
    let promise = new Promise(((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) throw reject(error);
            let dataString = JSON.stringify(results);
            let data = JSON.parse(dataString);
            resolve(data);
        });
    }))
    return promise;
}

exports.query = query;
