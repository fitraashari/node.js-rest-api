// mengimpor module express
const express = require('express')
// mengimport module boyd parser
const bodyParser = require('body-parser')
const { response } = require('express')
// membuat object express
const app = express()
//set port
const port = 2020
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))

// route index/root
app.get('/', (req, res)=>{
    //mengembalikan response pada halaman index
    res.send('Halo Dunia')
})
app.get('/test',(req,res)=>{
    res.send('Ini Adalah Route test Method GET')
})
app.post('/test',(req,res)=>{
    res.send('Ini Adalah Route test Method POST')
})

// restfull api
app.get('/endpoint',(req,res)=>{
    res.end('Ini Adalah Endpoint')
})
app.get('/endpoint/:param',(req,res)=>{
    let param = req.params.param
    res.end('Parameter yang dikirim adalah: '+param)
})
app.post('/endpoint',(req,res)=>{
    let nama = req.body.nama
    let umur = req.body.umur
    res.end("Nama: "+nama+", Umur: "+umur)
})
app.delete('/endpoint/:param',(req,res)=>{
    let param = req.params.param
    res.end("Data dengan id "+param+" akan dihapus!")
})
app.put('/endpoint/:param',(req,res)=>{
    let param = req.params.param
    let nama = req.body.nama
    let umur = req.body.umur
    res.end("Data dengan param "+param+" sudah di update")
})
// buka port
app.listen(port,()=>{
    console.log(`Aplikasi Berjalan Pada http://localhost:${port}`)
})