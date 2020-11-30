// mengimpor module express
const express = require('express')
// mengimport module boyd parser
const bodyParser = require('body-parser')
const { response } = require('express')
// membuat object express
const app = express()
//set port
const port = 2020

// mongo db
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const DBUrl = "mongodb://127.0.0.1:27017/"
const DBName = "azure"

let dbo = null;
MongoClient.connect(DBUrl,(error, db)=>{
    if(error) throw error;
    dbo = db.db(DBName)
})

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
    dbo.collection('mahasiswa').find().toArray((error,data)=>{
        if(error) throw error
        res.json(data)
    })
})
app.get('/endpoint/:param',(req,res)=>{
    let id = req.params.param
    let id_object = new ObjectID(id)
    dbo.collection('mahasiswa').findOne({"_id": id_object},(error,result)=>{
        if(error) throw error
        res.json(result)
    })
})
app.post('/endpoint',(req,res)=>{
    let nama = req.body.nama
    let umur = req.body.umur
    dbo.collection("mahasiswa").insertOne({
        nama:nama,
        umur:umur
    },(error,result)=>{
        if(!error){
            res.json(result)
        }else{
            throw error
        }
    })
})
app.delete('/endpoint/:param',(req,res)=>{
    let id = req.params.param
    let id_object = new ObjectID(id)
    dbo.collection("mahasiswa").deleteOne({
        _id : id_object
    },(error,result)=>{
        if(error) throw error
        res.json(result)
    })
})
app.put('/endpoint/:param',(req,res)=>{
    let id = req.params.param
    let id_object = new ObjectID(id)
    let nama = req.body.nama
    let umur = req.body.umur
    dbo.collection('mahasiswa').updateOne({
        "_id":id_object
    },{$set:{
        nama:nama,
        umur:umur
    }},(error,result)=>{
        if(error) throw error
        res.json(result)
    })
})
// buka port
app.listen(port,()=>{
    console.log(`Aplikasi Berjalan Pada http://localhost:${port}`)
})