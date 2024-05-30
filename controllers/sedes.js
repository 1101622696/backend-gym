import Sede from "../models/sedes.js"

const httpSedes = {

    getSedes: async (req, res) => {
        const {busqueda} = req.query
        const sede = await Sede.find()
        res.json({sede})
    },

    getSedesID: async (req, res) => {
        const { id } = req.params
        const sede = await Sede.findById(id)
        res.json({ sede })
    },
    getSedesactivados: async (req, res) => {
        const activados = await Sede.find(estado == 1)
        res.json({ activados })
    },

    getSedesdesactivados: async (req, res) => {
        const desactivados = await Sede.find(estado == 0)
        res.json({ desactivados })
    },

    postSedes: async (req, res) => {
        try {
        const {nombre,direccion,telefono,ciudad,codigo,horario,estado} = req.body
        const sede = new Sede({nombre,direccion,telefono,ciudad,codigo,horario,estado})
        await sede.save()
        res.json({ sede })
    }catch (error) {
        console.log(error);
        res.status(400).json({ error: "No se pudo crear el registro" })
    }
    },

    putSedes: async (req, res) => {
        const { id } = req.params
        const { _id, codigo,estado,  ...resto } = req.body
        console.log(resto);

        const sede = await Sede.findByIdAndUpdate(id, resto, { new: true })
        res.json({ sede })
    },

    putSedesActivar: async (req, res) => {
        const { id } = req.params
        const sede = await Plan.findByIdAndUpdate(id, { estado: 1 }, { new: true })
        res.json({ sede })
    },

    putSedesDesactivar: async (req, res) => {
        const { id } = req.params
        const sede = await Plan.findByIdAndUpdate(id, { estado: 0 }, { new: true })
        res.json({ sede })
    }
}
export default httpSedes