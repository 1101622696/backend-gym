import mongoose from "mongoose";

const planesSchema=new mongoose.Schema({
 codigo:{type:String, require: true, unique:true},
 descripcion:{type:String,required:true},
total: { type: Number, require: true },
valor:{ type: Number, require: true },
dias:{ type: String,required:true},
estado:{type:Number,default:1},

})

export default mongoose.model("Plan", planesSchema)


