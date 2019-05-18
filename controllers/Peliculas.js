'use strict';

var utils = require('../utils/writer.js');
var Peliculas = require('../service/PeliculasService');

module.exports.addPelicula = function addPelicula (req, res, next) {
  var peliculaItem = req.swagger.params['peliculaItem'].value;
  Peliculas.addPelicula(peliculaItem)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPeliculas = function getPeliculas (req, res, next) {
  var id = req.swagger.params['id'].value;
  Peliculas.getPeliculas(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPeliculasxId = function getPeliculasxId (req,res,next){
  var id = req.swagger.params['id'].value;
  Peliculas.getPeliculasxId(id)
    .then(function(response){
      utils.writeJson(res,response);
    })
    .catch(function(response){
      utils.writeJson(res,response);
    })
};

module.exports.eliminarPelicula = function eliminarPelicula (req,res,next){
  var id = req.swagger.params['id'].value;
  Peliculas.eliminarPelicula(id)
    .then(function(response){
      utils.writeJson(res,response);
    })
    .catch(function(response){
      console.log(response);
      utils.writeJson(res,response,500);
    })
}

module.exports.updatePelicula = function updatePelicula (req,res,next){
  var id = req.swagger.params['id'].value;
  var peliculaItem = req.swagger.params['peliculaItem'].value;
  Peliculas.updatePelicula(id,peliculaItem)
    .then(function(response){
      utils.writeJson(res,response);
    })
    .catch(function(response){
      console.log(response);
      utils.writeJson(res,response,500);
    })
}

module.exports.obtenerGeneros = function obtenerGeneros (req,res,next){
  Peliculas.obtenerGeneros()
    .then(function(response){
      utils.writeJson(res,response);
    })
    .catch(function(response){
      console.log(response);
      utils.writeJson(res,response,500);
    })
}

