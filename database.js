var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text, 
            desc text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO todos (title, desc) VALUES (?,?)'
                db.run(insert, ["Watch","Watching netflix with friends"])
            }
        });  
    }
});


module.exports = db