module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/tipo.controller.js")

    router.get('/', controller.findTipoPokemons);
    router.post('/', controller.createTipoPokemon);
    router.get('/:id', controller.findOneTipo);
    router.put('/actualizar/:id', controller.updateTipoPokemon);
    router.delete('/eliminar/:id', controller.deleteTipoPokemon);

    app.use('/tipo', router);

}