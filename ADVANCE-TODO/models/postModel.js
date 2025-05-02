const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
    title:{
        type:string,
        required:[true,'title is required'],
        trim:true,
    },

    description:{
        type:string,
        required:[true,'description is required'],
        trim:true,
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }

},{
timestamps:true
});

module.exports=mongoose.model('post',postSchema);
