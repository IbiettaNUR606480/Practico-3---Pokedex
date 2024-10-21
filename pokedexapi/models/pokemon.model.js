module.exports = (sequelize, Sequelize) => {
    const Pokemon = sequelize.define("pokemon", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero: {
            type: Sequelize.INTEGER,
        },
        nombre: {
            type: Sequelize.STRING,
        },
        descripcion: {
            type: Sequelize.STRING,
        },
        tipoUno: {
            type: Sequelize.INTEGER,
        },
        tipoDos: {
            type: Sequelize.INTEGER,
        },
        habilidadUno: {
            type: Sequelize.INTEGER,
        },
        habilidadDos: {
            type: Sequelize.INTEGER,
        },
        habilidadTres: {
            type: Sequelize.INTEGER,
        },
        lvlEvolucion: {
            type: Sequelize.INTEGER,
        },
        evPrevia: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        evSiguiente: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        hp: {
            type: Sequelize.INTEGER,
        },
        ataque: {
            type: Sequelize.INTEGER,
        },
        defensa: {
            type: Sequelize.INTEGER,
        },
        spAtaque: {
            type: Sequelize.INTEGER,
        },
        spDefensa: {
            type: Sequelize.INTEGER,
        },
        velocidad: {
            type: Sequelize.INTEGER,
        }
    });

    return Pokemon;
}