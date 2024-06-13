import Pago from "../models/pagos.js"

const httpPagos = {

    getPagos: async (req, res) => {
        const {busqueda} = req.query
        const pago = await Pago.find(
            {
                $or: [
                    { plan: new RegExp(busqueda, "i") },

                ]
            }
        )
        res.json({pago})
    },

    getPagosactivados: async (req, res) => {
        try {
            const activados = await Pago.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Pago activados' });
        }
    },

    getPagosdesactivados: async (req, res) => {
        try {
        const desactivados = await Pago.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener Pago activados' });
    }
    },

    getPagosID: async (req, res) => {
        const { id } = req.params
        const pago = await Pago.findById(id)
        res.json({ pago })
    },

    postPagos: async (req, res) => {
        try {
        const {id,plan,valor, estado} = req.body
        const pago = new Pago({id,plan,valor, estado})
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
        const { id } = req.params;
        try {
            const pago = await Pago.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!pago) {
                return res.status(404).json({ error: "pago no encontrado" });
            }
            res.json({ pago });
        } catch (error) {
            console.error("Error al activar pago", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    putPagosDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const pago = await Pago.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!pago) {
                return res.status(404).json({ error: "pago no encontrado" });
            }
            res.json({ pago });
        } catch (error) {
            console.error("Error al desactivar pago", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
}
export default httpPagos