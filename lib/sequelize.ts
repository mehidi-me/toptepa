// lib/sequelize.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASSWORD as string, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    benchmark:true
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to MySQL has been established successfully.');
        await sequelize.sync({alter: true});
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

export default sequelize;
