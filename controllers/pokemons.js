'use strict'
var fs = require('fs');
const axios = require('axios').default;

const URLPOKEAPI = 'https://pokeapi.co/api/v2/pokemon';

function pruebas(req, res) {
	res.status(200).send({
		message: 'Probando una accion del controlador de Pokemons'
	});
}

async function pokemons(req, res) {
    let params = req.body;
    const page =  params.page;
    const limit =  params.limit;
    const search =  params.search;
    const parametros="?limit=100000&offset=0";

    let pokemons = null;
    pokemons = await axios.get(URLPOKEAPI+parametros).then(res => res.data);
    pokemons.results.sort( (a,b) => a.name.localeCompare( b.name ) );
   
    if(search){
        //console.log("Con parametro search: "+search);
        pokemons.results = pokemons.results.filter( item => item.name.includes(search) );
    } 
    
    if(page && limit){
      // console.log("Con parametros page: "+page+" limit: "+limit);
      //Se revisa si se puede paginar con los parametros dados.
        let pageMax = pokemons.results.length/limit;
        
        if(pokemons.results.length%limit != 0){
            pageMax++;
        }
        if(page<=0 || page>pageMax || limit<=0){
            return  res.status(404).send({
                 message: "Los parametros no son validos para paginar"
             });
         }
    
       let ini = (page-1)*limit;
       let fin = ini+(limit-1);
       console.log("Parametros para paginacion inicio: "+ini+" final: "+fin);
       pokemons.results = pokemons.results.filter( (item,index) => index>=ini && index<=fin );
     } 
   
	res.status(200).send({
		pokemons:pokemons.results
	});
}

async function pokemon(req, res) {
    let params = req.nombre;
    const parametros="?limit=100000&offset=0";

    let pokemons = null;
    pokemons = await axios.get(URLPOKEAPI+parametros).then(res => res.data);
    pokemons.results.sort( (a,b) => a.name.localeCompare( b.name ) );
   
    if(search){
        //console.log("Con parametro search: "+search);
        pokemons.results = pokemons.results.filter( item => item.name.includes(search) );
    } 
    
    if(page && limit){
      // console.log("Con parametros page: "+page+" limit: "+limit);
      //Se revisa si se puede paginar con los parametros dados.
        let pageMax = pokemons.results.length/limit;
        
        if(pokemons.results.length%limit != 0){
            pageMax++;
        }
        if(page<=0 || page>pageMax || limit<=0){
            return  res.status(404).send({
                 message: "Los parametros no son validos para paginar"
             });
         }
    
       let ini = (page-1)*limit;
       let fin = ini+(limit-1);
       console.log("Parametros para paginacion inicio: "+ini+" final: "+fin);
       pokemons.results = pokemons.results.filter( (item,index) => index>=ini && index<=fin );
     } 
   
	res.status(200).send({
		pokemons:pokemons.results
	});
}



module.exports = {
	pruebas,
    pokemons,
    pokemon
}