'use strict'

var express = require('express');
var PokemonsController = require('../controllers/pokemons');
var api = express.Router();

api.get('/prueba',PokemonsController.pruebas);
api.get('/pokemons',PokemonsController.pokemons);
api.post('/pokemon',PokemonsController.pokemon);

module.exports = api;