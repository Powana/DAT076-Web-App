import { Sequelize } from 'sequelize-typescript';
import { config } from "../config";

import {Poll} from "./poll.model"
import {TextChoice} from "./choice.model"
import { Comment } from "./comment.model";

// Copy vars here as simple reminder that they need to be set
const PORT : number = config.PORT;
const DB_HOST = config.DB_HOST;
const DB_NAME = config.DB_NAME;
const DB_USER = config.DB_USER;
const DB_PASS = config.DB_PASS;

const sequelize = new Sequelize({
        host: DB_HOST,
        database: DB_NAME,
        username: DB_USER,
        password: DB_PASS,
        dialect: 'postgres',
    
        models: [Poll, TextChoice, Comment]  // Relative path to our models could be used instead
    });

export {sequelize}