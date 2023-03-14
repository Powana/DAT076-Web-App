import { app } from "./start";
import { config } from "./config";
import {Poll} from "./models/poll.model"
import {TextChoice} from "./models/choice.model"
import { Comment } from "./models/comment.model";
import { Sequelize } from "sequelize-typescript";
import { sequelize } from "./models/db";


/**
* Server Activation
*/

if (!config.FAKE_DB) {
    (async () => {
        sequelize.authenticate().then(() => {
            console.log('DB Connection has been established successfully.');
        }).catch((error: any) => {
            throw Error('Unable to connect to the database: ' + error);
        });
        // force: true will wipe any existing tables, useful for dev.
        await sequelize.sync({ force: false }).catch((error: any) => {throw Error('Unable to sync to database: ' + error);});
    
        app.listen(config.PORT, () => {
            console.log(`listening on port ${config.PORT}`);
        });
    })();
}
else {
    (async () => {
        app.listen(config.PORT, () => {
            console.log(`listening on port ${config.PORT}`);
        });
    })();
}
