"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = require("../models");
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'riwi2024',
    database: 'repaso_filtro',
    models: [models_1.User, models_1.Product], // Añade todos tus modelos aquí es lo mismo que el nombre de las tablas
});
exports.default = sequelize;
