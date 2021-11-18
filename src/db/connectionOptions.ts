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
    synchronize:true,
    entities:["dist/**/*.entity{.ts,.js}"],
}