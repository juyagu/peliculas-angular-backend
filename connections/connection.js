const mysql = require('mysql');
var mysql_pool = mysql.createPool({
    connectionLimit: 5,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'angular5'
});

var ConexionMysql = function () {
    this.execute = function (query, sqlParams) {
        if(typeof sqlParams === 'undefined'){
            sqlParams = [];
        }
        return new Promise(function (resolve, reject) {
            mysql_pool.getConnection(function (err, connection) {
                if (err) {
                    console.log('Ocurrió un error');
                    //throw error;
                    reject(connection, err);
                }
                connection.config.queryFormat = function (query, values) {
                    if (!values) return query;
                    return query.replace(/\:(\w+)/g, function (txt, key) {
                      if (values.hasOwnProperty(key)) {
                        return this.escape(values[key]);
                      }
                      return txt;
                    }.bind(this));
                  };
                connection.query(query,sqlParams, function (error, result,fields) {
                    if (error) {
                        console.log(error.sqlMessage);
                        console.log('Ocurrió un error');
                        //throw error;
                        reject(error.sqlMessage);
                    }
                    console.log('Conexion a la base de datos generada correctamente');
                    resolve(result);
                });
                connection.release();//release the connection
            });
        });
    },
    this.getConexionesAbiertas = function(){
        return new Promise(function(resolve,reject){
            var conexiones = mysql_pool._allConnections.length;
            console.log(conexiones);
            resolve();
        })
    }
}

module.exports = new ConexionMysql();