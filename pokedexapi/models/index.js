const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, 
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);

const db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize;

db.habilidad = require("./habilidad.model.js")(sequelize, Sequelize);
db.tipo = require("./tipo.model.js")(sequelize, Sequelize);
db.pokemon = require("./pokemon.model.js")(sequelize, Sequelize);

// Tipos

db.pokemon.belongsTo(db.tipo, { as: "tipoUnoFK", foreignKey: "tipoUno" });
db.pokemon.belongsTo(db.tipo, { as: "tipoDosFK", foreignKey: "tipoDos" });

// 

db.pokemon.belongsTo(db.habilidad, { as: "habilidadUnoFK", foreignKey: "habilidadUno" });
db.pokemon.belongsTo(db.habilidad, { as: "habilidadDosFK", foreignKey: "habilidadDos" });
db.pokemon.belongsTo(db.habilidad, { as: "habilidadTresFK", foreignKey: "habilidadTres" });

//Evoluciones

db.pokemon.hasMany(db.pokemon, { as: "evPreviaFK", foreignKey: "evPrevia" });
db.pokemon.hasMany(db.pokemon, { as: "evSiguienteFK", foreignKey: "evSiguiente" });

module.exports = db;