import * as dotenv from 'dotenv';
import { DataSource } from "typeorm";

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true, 
    entities: ['src/../entities/*{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}']
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })