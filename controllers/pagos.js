import Pago from "../models/pagos.js"

const httpPagos = {

    getPagos: async (req, res) => {
        const {busqueda} = req.query
        const pago = await Pago.find()
        res.json({pago})
    },

    getPagosactivados: async (req, res) => {
        const activados = await Pago.find(estado == 1)
        res.json({ activados })
    },

    getPagosdesactivados: async (req, res) => {
        const desactivados = await Pago.find(estado == 0)
        res.json({ desactivados })
    },

    getPagosID: async (req, res) => {
        const { id } = req.params
        const pago = await Pago.findById(id)
        res.json({ pago })
    },

    postPagos: async (req, res) => {
        try {
        const {id,plan,fecha,valor, estado} = req.body
        const pago = new Pago({id,plan,fecha,valor, estado})
        await pago.save()
        res.json({ pago })
    }catch (error) {
        res.status(400).json({ error: "No se pudo crear el registro" })
    }
    },

    putPagos: async (req, res) => {
        const { id } = req.params
        const { _id, estado,  ...resto } = req.body
        console.log(resto);

        const pago = await Pago.findByIdAndUpdate(id, resto, { new: true })
        res.json({ pago })
    },

    putPagosActivar: async (req, res) => {
        const { id } = req.params
        const pago = await Pago.findByIdAndUpdate(id, { estado: 1 }, { new: true })
        res.json({ pago })
    },

    putPagosDesactivar: async (req, res) => {
        const { id } = req.params
        const pago = await Pago.findByIdAndUpdate(id, { estado: 0 }, { new: true })
        res.json({ pago })
    }
}
export default httpPagos