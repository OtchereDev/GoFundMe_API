import {SqliteConnectionOptions} from 'typeorm/driver/sqlite/SqliteConnectionOptions'

export const option:SqliteConnectionOptions={
    type:'sqlite',
    database:'db.sqlite3',
    entities:["dist/**/*.entity{.ts,.js}"],
    synchronize:true
}