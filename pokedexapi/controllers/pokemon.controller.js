const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.findAllPokemons = async (req, res) => {
    try {
        const pokemones = await db.pokemon.findAll(
            {
                include: [
                {
                    model: db.habilidad,
                    as: "habilidadUno",
                },
                {
                    model: db.habilidad,
                    as: "habilidadDos",
                },
                {
                    model: db.habilidad,
                    as: "habilidadTres",
                },
                {
                    model: db.tipo,
                    as: "tipoUno",
                },
                {
                    model: db.tipo,
                    as: "tipoDos",
                },
                {
                    model: db.pokemon,
                    as: "evPrevia",
                },
                {
                    model: db.pokemon,
                    as: "evSiguiente",
                }
                ]
            }
        );
        res.status(200).json(pokemones);
    } catch (error) {
        res.status(500).json({
            msg: "Error al obtener los pokemones"
        });
    }
}

exports.createPokemons = async (req, res) => {
    const requiredFields = [
        'numero', 'nombre',
        'descripcion', 'tipoUno',
        'habilidadUno', 'habilidadDos', 'lvlEvolucion',
        'hp', 'ataque', 'defensa',
        'spAtaque', 'spDefensa', 'velocidad'
    ]
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    } try {
        const pokemon = {
            numero: req.body.numero,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            tipoUno: req.body.tipoUno,
            habilidadUno: req.body.habilidadUno,
            habilidadDos: req.body.habilidadDos,
            hp: req.body.hp,
            ataque: req.body.ataque,
            defensa: req.body.defensa,
            spAtaque: req.body.spAtaque,
            spDefensa: req.body.spDefensa,
            velocidad: req.body.velocidad
        };
        if (req.body.tipoDos) {
            pokemon.tipoDos = req.body.tipoDos;
        }
        if (req.body.habilidadTres) {
            pokemon.habilidadTres = req.body.habilidadTres;
        }
        if (req.body.lvlEvolucion) {
            pokemon.lvlEvolucion = req.body.lvlEvolucion;
        }
        if (req.body.EvPrevia) {
            pokemon.evPrevia = req.body.evPrevia;
        }
        if (req.body.EvSiguiente) {
            pokemon.evSiguiente = req.body.evSiguiente;
        }

        const createPokemon = await db.pokemon.create(pokemon);
        res.status(201).json(createPokemon);
    }   catch (error) {
        sendError500(res);
    }
}

exports.findOnePokemon = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await db.pokemon.findByPk(id, {
            include: [
                {
                    model: db.habilidad,
                    as: "habilidadUno",
                },
                {
                    model: db.habilidad,
                    as: "habilidadDos",
                },
                {
                    model: db.habilidad,
                    as: "habilidadTres",
                },
                {
                    model: db.tipo,
                    as: "tipoUno",
                },
                {
                    model: db.tipo,
                    as: "tipoDos",
                },
                {
                    model: db.pokemon,
                    as: "evPrevia",
                },
                {
                    model: db.pokemon,
                    as: "evSiguiente",
                }
            ]
        });
        if (pokemon) {
            res.status(200).json(pokemon);
        } else {
            res.status(404).json({
                msg: `Pokemon no registrado en la pokedex`
            });
        }
    } catch (error) {
        sendError500(res);
    }
}

// Extraer la linea evolutiva de un pokemon
exports.getLineaEvolutiva = async (req, res) => {
    // primer caso: pokemon sin evolución
    let objPokemon = await db.pokemon.findByPk(req.params.id,
        {
            include: [
                {
                    model: db.pokemon,
                    as: "evPrevia",
                },
                {
                    model: db.pokemon,
                    as: "evSiguiente",
                }
            ]
        });
    if (!objPokemon.evPrevia === null && !objPokemon.evSiguiente === null) {
        res.status(200).json(objPokemon);
        return
    }
    // segundo caso: primera fase o inicial del pokemon es su estado actual
    if (objPokemon.evPrevia === null) {
        const respuesta = [];
        respuesta.push(objPokemon);
        while (objPokemon.evSiguiente !== null) {
            respuesta.push(objPokemon.evSiguiente);
            objPokemon = await db.pokemon.findByPk(objPokemon.evSiguiente,
                {
                    include: [
                        {
                            model: db.pokemon,
                            as: "evSiguiente",
                        }
                    ]
                }
            );
        }
        res.status(200).json(respuesta);
        return;
    }
    // tercer caso: segunda fase o intermedio del pokemon es su estado actual
    const respuesta = [];
        while (objPokemon.evPrevia !== null) {
        respuesta.push(objPokemon.evPrevia);
        objPokemon = await db.pokemon.findByPk(objPokemon.evPrevia,
            {
                include: [
                    {
                        model: db.pokemon,
                        as: "evPrevia",
                    },
                    {
                        model: db.pokemon,
                        as: "evSiguiente",
                    }
                ]
            }
        );
    }
    respuesta.reverse();
    while (objPokemon.evSiguiente !== null) {
        respuesta.push(objPokemon.evSiguiente);
        objPokemon = await db.pokemon.findByPk(objPokemon.evSiguiente,
            {
                include: [
                    {
                        model: db.pokemon,
                        as: "evSiguiente",
                    },
                    {
                        model: db.pokemon,
                        as: "evSiguiente",
                    }
                ]
            }
        );
    }
    res.status(200).json(respuesta);
    // cuarto caso: tercera fase o final del pokemon es su estado actual
    if (objPokemon.evPrevia === null) {
        const respuesta = [];
        while (objPokemon.evPrevia !== null) {
            respuesta.push(objPokemon);
            objPokemon = await db.pokemon.findByPk(objPokemon.evPrevia,
                {
                    include: [
                        {
                            model: db.pokemon,
                            as: "evPrevia",
                        }
                    ]
                }
            );
        }
        respuesta.push(objPokemon);
        respuesta.reverse();
        res.status(200).json(respuesta);
        return;
    }
}

exports.updatePokemons = async (req, res) => {
    const requiredFields = ['numero', 'nombre',
        'descripcion', 'tipoUno',
        'habilidadUno', 'habilidadDos',
        'hp', 'ataque', 'defensa',
        'spAtaque', 'spDefensa', 'velocidad'
    ];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const pokemon = {
            numero: req.body.numero,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            tipoUno: req.body.tipoUno,
            habilidadUno: req.body.habilidadUno,
            habilidadDos: req.body.habilidadDos,
            hp: req.body.hp,
            ataque: req.body.ataque,
            defensa: req.body.defensa,
            spAtaque: req.body.spAtaque,
            spDefensa: req.body.spDefensa,
            velocidad: req.body.velocidad
        };
        if (req.body.tipoDos) {
            pokemon.tipoDos = req.body.tipoDos;
        }
        if (req.body.habilidadTres) {
            pokemon.habilidadTres = req.body.habilidadTres;
        }
        if (req.body.lvlEvolucion) {
            pokemon.lvlEvolucion = req.body.lvlEvolucion;
        }
        if (req.body.EvPrevia) {
            pokemon.evPrevia = req.body.evPrevia;
        }
        if (req.body.EvSiguiente) {
            pokemon.evSiguiente = req.body.evSiguiente;
        }
        const updatePokemon = await db.pokemon.update(pokemon, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(updatedPokemon);
    } catch (error) {
        sendError500(error);
    }
}

exports.updatedPatch = async (req, res) => {
    try {
        const updatePokemon = await db.pokemon.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(updatedPokemon);
    } catch (error) {
        sendError500(error);
    }
}

exports.deletePokemons = async (req, res) => {
    try {
        const deletePokemon = await db.pokemon.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(deletePokemon);
    } catch (error) {
        sendError500(error);
    }
}

exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await db.pokemon.findByPk(id, res);
        if (!pokemon) {
            return;
        }
        if (req.files) {
            res.status(400).json({
                msg: "No se ha encontrado la imagen"
            });
            return;
        }
        const file = req.files.profilePicture;
        const fileName = pokemon.id + '.jpg';
        file.mv(`public/${fileName}`);
        await pokemon.save();
        res.json(pokemon);
    } catch (error) {
        sendError500(error);
    }
}
