module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/habilidad.controller.js")

    router.get('/', controller.findAllPokemons);
    router.post('/', controller.createPokemons);
    router.get('/:id', controller.findOnePokemon);
    router.put('/actualizar/:id', controller.updatePokemons);
    router.delete('/eliminar/:id', controller.deletePokemons); 
    app.use('/habilidad', router);

}