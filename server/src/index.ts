import { app } from "./start";
import { config } from "./config";


/**
 * App Variables
*/
const Sequelize = require("sequelize");

// Copy vars here as simple reminder that they need to be set
const PORT : number = config.PORT;
const DB_HOST = config.DB_HOST;
const DB_NAME = config.DB_NAME;
const DB_USER = config.DB_USER;
const DB_PASS = config.DB_PASS;

/**
* Server Activation
*/

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: DB_HOST,
        dialect: 'mysql',
    
        models: ["./models"]  // Relative path to our models
    }
);
sequelize.authenticate().then(() => {
        console.log('DB Connection has been established successfully.');
    }).catch((error: any) => {
        console.error('Unable to connect to the database: ', error);
 });

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});