import Cliente from "../models/clientes.js"
import Plan from "../models/planes.js"



const helpersClientes={
    validarExistaIdcliente:async (id)=>{
        const existe = await Cliente.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    },
    validaridPlan:async (idPlan)=>{
        const existe = await Plan.findById(idPlan)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    },
    validarTelefono: async (telefono) => {
        const telefonoRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!telefonoRegex.test(telefono)) {
            throw new Error("El teléfono debe tener el formato ###-###-####");
        }
    },
validarTelefono: async (telefono) => {
    const telefonoRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!telefonoRegex.test(telefono)) {
        throw new Error("El teléfono debe tener el formato ###-###-####");
    }
}
    
}

export default helpersClientes