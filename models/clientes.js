import mongoose from "mongoose";

const clientesSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  fechaIngreso: { type: Date, default: Date.now()},
  documento: { type: String, required: true, unique: true },
  direccion: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  telefono: { type: String, required: true},
  estado: { type: Number, default: 1 },
  idPlan:{type:mongoose.Schema.Types.ObjectId,ref:'Plan',required:true},
  fechavencimiento: { type: Date, default:"" },
  foto: { type: String, required: true },
  seguimiento: [
    {
      fecha: { type: Date, default: Date.now() },
      peso: { type: Number, require: true },
      imc: { type: Number, require: true },
      brazo: { type: Number, require: true },
      pierna: { type: Number, require: true },
      edad: { type: Number, require: true },
    },
  ],
});

export default mongoose.model("Cliente",clientesSchema);
