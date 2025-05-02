const dotenv = require('dotenv')
const express=require('express')
const cors =require('cors');
const  helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { Mongoose, default: mongoose } = require('mongoose');
const authRouter=require('./routers/authRouter')

dotenv.config();
const PORT = process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL

const app=express()
app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))


app.use('/api/auth',authRouter)
app.get('/',(req,res)=>{
     res.json({message:'hello world'})   // create response on web page 
})


mongoose.connect(DATABASE_URL)
  .then(async () => {
    console.log('Connected to database');

    // Drop the "username_1" index if it exists
    try {
      const indexes = await mongoose.connection.db.collection('users').indexes();
      const hasUsernameIndex = indexes.some(index => index.name === 'username_1');
      if (hasUsernameIndex) {
        await mongoose.connection.db.collection('users').dropIndex('username_1');
        console.log('Dropped index: username_1');
      } else {
        console.log('No username_1 index found');
      }
    } catch (err) {
      console.error('Error checking/dropping index:', err.message);
    }

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });

