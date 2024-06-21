import 'dotenv/config'
import  express  from "express"
import dbConexion from "./database/cnxmongoose.js"
import clientes from "./routes/clientes.js"
import ingresos from "./routes/ingresos.js"
import inventario from "./routes/inventario.js"
import mantenimiento from "./routes/mantenimiento.js"
import maquinas from "./routes/maquinas.js"
import pagos from "./routes/pagos.js"
import planes from "./routes/planes.js"
import sedes from "./routes/sedes.js"
import usuarios from "./routes/usuarios.js"
import ventas from "./routes/ventas.js"
import cors from 'cors'
const app = express()
app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use("/api/clientes",clientes)
app.use("/api/ingresos",ingresos)
app.use("/api/inventario",inventario)
app.use("/api/mantenimiento",mantenimiento)
app.use("/api/maquinas",maquinas)
app.use("/api/pagos",pagos)
app.use("/api/planes",planes)
app.use("/api/sedes",sedes)
app.use("/api/usuarios",usuarios)
app.use("/api/ventas",ventas)


app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    dbConexion()
})