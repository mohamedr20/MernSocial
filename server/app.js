'use strict'
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
mongoose.Promise = global.Promise;
const config = require('./config/config');
const expressConfig = require('./config/express');
const app = express();
const port = process.env.port || 8000;
const server = http.createServer(app);

mongoose.connect(config.db_uri,{
    useNewUrlParser:true
})
.then(()=>console.log(`Connected to MongoDB`))
.catch((err)=>err);

mongoose.connection.on('error',(err)=>{
    console.log(`MongoDB connection Error: ${err}`);
    process.exit(-1);
})
expressConfig(app);
function startServer(){
    server.listen(config.port,config.ip,function(){
        console.log(`Express server listening on %d, in %s mode`,config.port,app.get('env'));    })
}
setImmediate(startServer);
module.exports = app