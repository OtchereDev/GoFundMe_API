// import {SqliteConnectionOptions} from 'typeorm/driver/sqlite/SqliteConnectionOptions'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
// export const option:SqliteConnectionOptions={
//     type:'sqlite',
//     database:'db.sqlite3',
//     entities:["dist/**/*.entity{.ts,.js}"],
//     synchronize:true
// }

export const option:PostgresConnectionOptions={
    type:"postgres",
    url: process.env.DATABASE_URL,
    synchronize:false,
    entities:["dist/**/*.entity{.ts,.js}"],
    ssl: true,
    extra: {
        "ssl": {
        "rejectUnauthorized": false
        }
    },
    logging:true
}