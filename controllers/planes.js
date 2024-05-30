import Plan from "../models/planes.js"

const httpPlanes = {

    getPlanes: async (req, res) => {
        const {busqueda} = req.query
        const plan = await Plan.find(
            {
                $or: [
                    { descripcion: new RegExp(busqueda, "i") },
                ]
            }
        )
        res.json({plan})
    },

    getPlanesID: async (req, res) => {
        const { id } = req.params
        const plan = await Plan.findById(id)
        res.json({ plan })
    },

    postPlanes: async (req, res) => {
        try {
        const {codigo,descripcion,total,valor,dias,estado} = req.body
        const plan = new Plan({codigo,descripcion,total,valor,dias,estado})
        await plan.save()
        res.json({ plan })
    }catch (error) {
        console.log(error);
        res.status(400).json({ error: "No se pudo crear el registro" })
    }
    },

    getPlanesactivados: async (req, res) => {
        const activados = await Cliente.find(estado == 1)
        res.json({ activados })
    },

    getPlanesdesactivados: async (req, res) => {
        const desactivados = await Cliente.find(estado == 0)
        res.json({ desactivados })
    },

    putPlanes: async (req, res) => {
        const { id } = req.params
        const { _id, codigo,estado,  ...resto } = req.body
        console.log(resto);

        const plan = await Plan.findByIdAndUpdate(id, resto, { new: true })
        res.json({ plan })
    },

    putPlanesActivar: async (req, res) => {
        const { id } = req.params
        const plan = await Plan.findByIdAndUpdate(id, { estado: 1 }, { new: true })
        res.json({ plan })
    },

    putPlanesDesactivar: async (req, res) => {
        const { id } = req.params
        const plan = await Plan.findByIdAndUpdate(id, { estado: 0 }, { new: true })
        res.json({ plan })
    }
}
export default httpPlanes