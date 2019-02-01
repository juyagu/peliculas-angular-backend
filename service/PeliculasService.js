'use strict';
var Conexion = require('./../connections/connection.js');

/**
 * insertar una nueva pelicula
 * Adds an item to the system
 *
 * peliculaItem PeliculaItem Pelicula item to add (optional)
 * no response value expected for this operation
 **/
exports.addPelicula = function (peliculaItem) {
  return new Promise(function (resolve, reject) {
    var sqlQuery = "insert into peliculas set ?";
    Conexion.execute(sqlQuery, peliculaItem).then(function (response) {
      resolve(response);
    }).catch(function (connection, error) {
      reject('Error al querer guardar la pelicula');
    })
  });
}


/**
 * obtener peliculas
 * Obetener la totalidad de las películas guardadas en la base de datos 
 *
 * id Integer  (optional)
 * returns List
 **/
exports.getPeliculas = function (id) {
  return new Promise(function (resolve, reject) {
    var sqlQuery = 'select id,titulo,director,genero,foto from peliculas where habilitado = 1';
    var sqlParams = [];
    if (typeof id !== 'undefined') {
      sqlQuery += ' where id = ?';
      sqlParams.push(id);
    }
    Conexion.execute(sqlQuery, sqlParams).then(function (response) {
      resolve(response);
    }).catch(function (connection, error) {
      reject({
        code: 500,
        payload: error
      });
    });
  });
}

exports.getPeliculasxId = function (id) {
  return new Promise(function (resolve, reject) {
    if (typeof id !== 'undefined') {
      var sqlQuery = "select id,titulo,director,genero,foto from peliculas where habilitado = 1 and id = :id";
      var sqlParams = {
        id: id
      };
      Conexion.execute(sqlQuery, sqlParams).then(function (response) {
        //console.log(response[0]);
        resolve(response[0]);
      }).catch(function (connection, error) {
        reject({
          code: 500,
          payload: error
        });
      });
    } else {
      reject("Debe pasar un id correcto");
    }
  });
}

exports.eliminarPelicula = function (id) {
  return new Promise(function (resolve, reject) {
    if (typeof id !== 'undefined') {
      var sqlQuery = "update peliculas set habilitado = 0 where id = ?";
      var sqlParams = [];
      sqlParams.push(id);
      Conexion.execute(sqlQuery, sqlParams).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject({code:500,payload:"Error en la ejecución del script: " + error});
      });
    } else {
      reject("Debe pasar un id correcto");
    }
  })
}

exports.updatePelicula = function(id,peliculaItem){
  return new Promise(function (resolve, reject) {
    var sqlQuery = "update peliculas set titulo = :titulo, director = :director, genero = :genero where id = :id";
    var sqlParams = {
      id: id,
      titulo: peliculaItem.titulo,
      genero : peliculaItem.genero,
      director: peliculaItem.director
    };
    Conexion.execute(sqlQuery, sqlParams).then(function (response) {
      resolve(response);
    }).catch(function (error) {
      reject({code:500,payload:"Error en la ejecución del script: " + error});
    });
  })
}