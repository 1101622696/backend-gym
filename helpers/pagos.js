import Pago from "../models/pagos.js"
import Cliente from "../models/clientes.js"


const helpersPagos={
    validarIdCliente:async (id)=>{
        const existe = await Cliente.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    },
    validarIdPago:async (id)=>{
        const existe = await Pago.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    },
    validarFechaPago: (fecha) => {
        if (isNaN(Date.parse(fecha))) {
            throw new Error("Fecha no valida");
        }
    }
};

export default helpersPagos