const mongoose=require('mongoose')
const Product=require("./Productmodel.js")
const express = require('express')
const app = express()
//use  json format in express
app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Hello from node API");
})

//get request (View the data)


app.get('/api/product',async(req,res)=>{
    try{
        const product=await Product.find(req.query);
        res.status(200).json(product)
       }catch(error){
        res.status(500).json({message:error.message})
       }
})

//pagination-------------------------------->//

app.get('/api/product', async (req, res) => {
    try {
        // Get the page and limit from query parameters
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 3;

        // Calculate the number of documents to skip
        let skip = (page - 1) * limit;

        // Find products with pagination
        const filter = { ...req.query };
        const products = await Product.find(filter)
            .skip(skip) // Skip the first `skip` documents
            .limit(limit); // Limit the number of results to `limit`

        // Send paginated products as response
        res.status(200).json({
            page,
            limit,
            total: products.length,  // This can be improved to show the total number of products
            data: products
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



//pagination
// app.get('/api/product',(req, res) => {
// let page=Number(req.query.page) || 1;
// let limit=Number(req.query.limit) || 2;

// let skip=(page-1) * limit

// Product=Product.skip(skip).limit(limit)

// })




// find by id
app.get('/api/product/:id',async(req,res)=>{
    console.log(req.params.id)
    try{
        const product=await Product.findById(req.params.id);
        res.status(200).json(product)
       }catch(error){
        res.status(500).json({message:error.message})
       }
})

//update a product

app.put('/api/product/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const product=await Product.findByIdAndUpdate(id,req.body)
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }

        const updatedProduct=await Product.findById(id);
        res.status(200).json(updatedProduct);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})


//delete
app.delete('/api/product/:id',async(req,res)=>{
    try {
        const {id} =req.params
        const product=await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
        res.status(200).json({message:"Product successfully deleted"})
       

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//post request (store data)
app.post('/api/product',async(req,res)=>{
   try{
    const product=await Product.create(req.body);
    res.status(200).json(product)
   }catch(error){
    res.status(500).json({message:error.message})
   }

})

//connect database with mongoodb
mongoose.connect("mongodb://admin:6nDzGlKWQuKGqUPD@backened-shard-00-00.19alv.mongodb.net:27017,backened-shard-00-01.19alv.mongodb.net:27017,backened-shard-00-02.19alv.mongodb.net:27017/?replicaSet=atlas-qubt49-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Backened")
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
