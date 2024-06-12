import mongoose from "mongoose";

const inventarioSchema=new mongoose.Schema({
 codigo:{type:String, require: true, unique:true},
 descripcion:{type:String,required:true},
 valor:{ type: Number, require: true },
 cantidad: { type: Number, require: true },
 estado: { type: Number, default: 1 },

})

export default mongoose.model("Inventario",inventarioSchema)
