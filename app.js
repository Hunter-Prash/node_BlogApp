const express=require('express');
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const app=express()
const path=require('path')
require('dotenv').config();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs')
app.set('views' , path.join(__dirname,'views'));
app.use(express.static('public'));

//connect to database
const port=process.env.PORT || 5000;
const MONGO_URI = process.env.DB_URI;

const  connectDB=async()=>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected...');
    }
    catch(err){
        console.error(err.message);
        process.exit(1)
    }
}

connectDB();

//routes
const indexRoutes=require('./routes/index');
app.use('/',indexRoutes);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})