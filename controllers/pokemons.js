'use strict'
const PDFDocument = require('pdfkit');
var fs = require('fs');

const axios = require('axios').default;

const URLPOKEAPI = 'https://pokeapi.co/api/v2/pokemon';

function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando una accion del controlador de Pokemons'
    });
}

async function pokemons(req, res) {
    const page = req.query.page;
    const limit = req.query.limit;
    const search = req.query.search;
    const parametros = "?limit=100000&offset=0";

    let pokemons = null;
    pokemons = await axios.get(URLPOKEAPI + parametros).then(res => res.data);
    pokemons.results.sort((a, b) => a.name.localeCompare(b.name));

    if (search) {
        //console.log("Con parametro search: "+search);
        pokemons.results = pokemons.results.filter(item => item.name.includes(search));
    }

    if (page && limit) {
        // console.log("Con parametros page: "+page+" limit: "+limit);
        //Se revisa si se puede paginar con los parametros dados.
        let pageMax = pokemons.results.length / limit;

        if (pokemons.results.length % limit != 0) {
            pageMax++;
        }
        if (page <= 0 || page > pageMax || limit <= 0) {
            return res.status(404).send({
                message: "Los parametros no son validos para paginar"
            });
        }

        let ini = (page - 1) * limit;
        let fin = ini + (limit - 1);
        console.log("Parametros para paginacion inicio: " + ini + " final: " + fin);
        pokemons.results = pokemons.results.filter((item, index) => index >= ini && index <= fin);
    }

    res.status(200).send({
        pokemons: pokemons.results
    });
}

async function pokemon(req, res) {
    let params = req.body;
    const name = params.name;
    let url = URLPOKEAPI + '/' + name;
    //Pertición de la información del pokemon
    const pokemon = await axios.get(url).then(res => res.data)
        .catch(err => err.response.status);

    if (pokemon != 404) {
        //Si hay respuesta se empieza a construir el PDF
        const doc = new PDFDocument({ bufferPage: true });
        const filename = 'Informacion-' + pokemon.name + '.pdf';
        const stream = res.writeHead(200, {
            'Content-Type': 'aplication/pdf',
            'Content-disposition': 'attachment;filename=' + filename
        });
        doc.on('data', (data) => { stream.write(data) });
        doc.on('end', () => { stream.end() });
        let pngBuffer = null;
        //Obtener la imagen del pokemon
        await axios.get(pokemon.sprites.other.home.front_default, { responseType: 'arraybuffer' }).then(response => {
            pngBuffer = Buffer.from(response.data);
        });
        doc.font('Times-Bold').fontSize(25)
            .text(pokemon.name.toUpperCase(), 240, 35);

        doc.image(pngBuffer, 230, 40, {
            fit: [150, 150],
            align: 'center',
            valign: 'center'
        });

        doc.font('Times-Bold').fontSize(21)
            .text('Hp: ' + pokemon.stats[0].base_stat, 240, 200);
        doc.font('Times-Bold').fontSize(21)
            .text('Experiencia: ' + pokemon.base_experience, 240, 225);
        doc.font('Times-Bold').fontSize(21)
            .text('Ataque: ' + pokemon.stats[1].base_stat, 240, 250);
        doc.font('Times-Bold').fontSize(21)
            .text('Defensa: ' + pokemon.stats[2].base_stat, 240, 275);
        doc.font('Times-Bold').fontSize(21)
            .text('Especial: ' + pokemon.stats[3].base_stat, 240, 300);

        doc.end();
    }
    else {
        res.status(404).send({
            message: "No se encontro el pokemon especificado: " + name
        });
    }
}

module.exports = {
    pruebas,
    pokemons,
    pokemon
}