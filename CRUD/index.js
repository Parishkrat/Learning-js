const mongoose=require('mongoose')

const express = require('express')
const app = express()
//use  json format in express
app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Hello from node API");
})

//post request
app.post('/api/product',(req,res)=>{
    console.log(req.body);
    res.send(req.body);

})

//connect database with mongoodb
mongoose.connect("")
.then(()=>{
    console.log("connected to database")
    //connect with server
    app.listen(3000,()=>{
        console.log(`Server is running on port 3000`);
    });
})
//catch block for error
.catch(()=>{
    console.log("unable to connect")
})
