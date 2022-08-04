const Connection = require('tedious').Connection;





const connection = new Connection({
    server: process.env.MSSQL_SERVER,  //update me
    authentication: {
        type: 'default',
        options: {
            userName: process.env.MSSQL_USERNAME, //update me
            password: process.env.MSSQL_PASSWORD  //update me
        }
    },
    options: {
        port: Number(process.env.MSSQL_PORT),
        // If you are on Microsoft Azure, you need encryption:
        encrypt: false,
        database: process.env.MSSQL_DATABASE
    }
});
const connectMSSQL = (SERVER, USER, PASSWORD, PORT, DATABASE) => {



    return new Promise((resolve, reject) => {
        
        connection.on('connect', function (err) {
            // If no error, then good to proceed.
            console.log("Connected");
            if(err){reject(err)}
            resolve();
        });

        connection.connect();
    })

}

module.exports = {connectMSSQL, connection};