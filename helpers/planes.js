import Plan from "../models/planes.js"
import Sede from "../models/sedes.js"


const helpersPlanes={
    validarIdPlan:async (id)=>{
        const existe = await Plan.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    },
}

export default helpersPlanes