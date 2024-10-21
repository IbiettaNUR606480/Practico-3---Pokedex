const { send } = require("process");
const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.findTipoPokemons = async (req, res) => {
    try {
        const tipos = await db.tipo.findAll();
        res.status(200).json(tipos);
    } catch (error) {
        res.status(500).json({
            msg: "Error en la base de datos"
        });
    }
}

// Encontrar un tipo por id
exports.findOneTipo = async (req, res) => {
    try {
        const tipo = await db.tipo.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(tipo);
    } catch (error) {
        sendError500(error);
    }
}

// Crear un tipo
exports.createTipoPokemon = async (req, res) => {
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const tipo = await db.tipo.create({
            nombre: req.body.nombre
        });
        res.status(201).json(tipo);
    } catch (error) {
        sendError500(error);
    }
}

// Actualizar un tipo
exports.updateTipoPokemon = async (req, res) => {
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const tipo = await db.tipo.update({
            nombre: req.body.nombre
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(tipo);
    } catch (error) {
        sendError500(error);
    }
}

// Eliminar un tipo
exports.deleteTipoPokemon = async (req, res) => {
    try {
        const tipo = await db.tipo.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(tipo);
    } catch (error) {
        sendError500(error);
    }
}