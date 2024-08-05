import { Sequelize } from 'sequelize-typescript';
import { User, Product } from '../models';

const sequelize: Sequelize = new Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'riwi2024',
    database: 'repaso_filtro',
    models: [User, Product], // Añade todos tus modelos aquí es lo mismo que el nombre de las tablas
});

export default sequelize;
