const mongoose=require('mongoose')

const Schema=mongoose.Schema
const Model=mongoose.model

const todoSchmea=new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
title:{
    type:String,
    required: true,
},
constent:{
    type:String,
    required: false,
},
completed:{
    type:Boolean,
    required: false,
}
},{
    timestamps: true,
});


module.exports=Model('Todo',todoSchmea);