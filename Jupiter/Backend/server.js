// const express = require('express')
// const mysql = require('mysql')
// const cors = require('cors')    

// const app = express()
// app.use(cors())
// const db = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : 'root',
//     database : 'posts'})

// app.post('/Employee', (req, res) => {
//     const sql = "select * from Employee Where username = req.body.username and password = req.body.password"})
//     db.query(sql,[values] ,(err, result) => {
//         if(err) return res.json("Login Failed");
//         return res.json(data);
//     })

// app.listen(4000, () => {
//     console.log('Go to http://localhost:4000/posts to see posts')
// })

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
