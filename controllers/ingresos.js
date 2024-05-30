import Ingreso from "../models/ingresos.js"

const httpIngresos = {

    getIngresos: async (req, res) => {
        const ingreso = await Ingreso.find()
        res.json({ingreso})
    },

    getIngresosID: async (req, res) => {
        const { id } = req.params
        const ingresos = await Ingreso.findById(id)
        res.json({ ingresos })
    },

    postIngresos: async (req, res) => {
        try {
        const {idSede, idCliente} = req.body
        const ingreso = new Ingreso({idSede ,idCliente})
        await ingreso.save()
        res.json({ ingreso })
    }catch (error) {
        res.status(400).json({ error: "No se pudo crear el registro" })
    }
    },

    putIngresos: async (req, res) => {
        const { id } = req.params
        const { _id, fecha, ...resto } = req.body
        console.log(resto);

        const ingreso = await Ingreso.findByIdAndUpdate(id, resto, { new: true })
        res.json({ ingreso })
    },

}
export default httpIngresos