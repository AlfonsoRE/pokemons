'use strict'

var express = require('express');
var PokemonsController = require('../controllers/pokemons');
var api = express.Router();

api.get('/prueba',PokemonsController.pruebas);
api.get('/pokemons',PokemonsController.pokemons);

module.exports = api;