const express = require('express')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const userrouter=require('./Routes/userroute.js')
const bookrouter=require('./Routes/bookroute.js')
const app =new express();
app.use(bodyparser.json())

const url="mongodb://127.0.0.1:27017/Users"
const connectdb= async()=>{
 try {
    mongoose.set('strictQuery',false)
    mongoose.connect(url)
    console.log('connected to db');
    
 } catch (error) {
    console.log('there is error : '+error);
    process.exit();
 }
}
connectdb()

app.use('/',userrouter)
app.use('/',bookrouter)


app.listen(5000)