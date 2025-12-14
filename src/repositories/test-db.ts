import db from './database'

db.all('SELECT * FROM itens', [], (_err, rows) => {
  console.log(rows)
})
