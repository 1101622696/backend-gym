import mongoose from "mongoose";

const ventasSchema=new mongoose.Schema({
    id:{type:mongoose.Schema.Types.ObjectId,ref:'Inventario',required:true},
fecha:{type:Date,default:Date.now()},
codigo:{type:String, require: true, unique:true},  
valorUnitario:{type:Number, require: true},
cantidad: { type: Number, require: true },
total: { type: Number, default:"" }
})

export default mongoose.model("Venta", ventasSchema)


