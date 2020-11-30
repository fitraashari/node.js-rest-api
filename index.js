// mengimpor module express
const express = require('express')
// membuat object express
const app = express()
const port = 2020

// route index/root
app.get('/', (req, res)=>{
    //mengembalikan response pada halaman index
    res.send('Halo Dunia')
})

// buka port
app.listen(port,()=>{
    console.log(`Aplikasi Berjalan Pada http://localhost:${port}`)
})