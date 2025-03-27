const mongoose=require('mongoose')


const Productschema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please enter product name"],
        },
        quantity:{
            type:Number,
            required:true,
            default:0

        },

        Price:{
            type:Number,
            required:true,
            default:0
        },
    },
    {
     Timestamp:true,
    }
)

const Product=mongoose.model("Product",Productschema)

module.exports=Product
