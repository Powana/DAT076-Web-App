import { app } from "./start";
import { config } from "./config";
import {TextChoice} from "./model/choice.model"
import {Poll} from "./model/poll.model"
import { Comment } from "./model/comment.model";
import { Sequelize } from "sequelize-typescript";


/**
 * App Variables
*/

// Copy vars here as simple reminder that they need to be set
const PORT : number = config.PORT;
const DB_HOST = config.DB_HOST;
const DB_NAME = config.DB_NAME;
const DB_USER = config.DB_USER;
const DB_PASS = config.DB_PASS;

/**
* Server Activation
*/

if (!config.FAKE_DB) {
    const sequelize = new Sequelize(
        {
            host: DB_HOST,
            database: DB_NAME,
            username: DB_USER,
            password: DB_PASS,
            dialect: 'postgres',
        
            models: [Poll, TextChoice, Comment]  // Relative path to our models could be used instead
        }
        );
        (async () => {
            sequelize.authenticate().then(() => {
                console.log('DB Connection has been established successfully.');
            }).catch((error: any) => {
                throw Error('Unable to connect to the database: ' + error);
            });
            // force: true will wipe any existing tables, useful for dev.
            await sequelize.sync({ force: false }).catch((error: any) => {throw Error('Unable to sync to database: ' + error);});
        
            app.listen(PORT, () => {
                console.log(`listening on port ${PORT}`);
            });
        })();
}
else {
    (async () => {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    })();
}
