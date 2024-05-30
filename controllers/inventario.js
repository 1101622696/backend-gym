import Inventario from "../models/inventario.js"

const httpInventario = {

    getInventario: async (req, res) => {
        const {busqueda} = req.query
        const inventario = await Inventario.find(
            {
                $or: [
                    { descripcion: new RegExp(busqueda, "i") },
                ]
            }
        )
        res.json({inventario})
    },

getInventarioID: async (req, res) => {
        const { id } = req.params
        const inventario = await Inventario.findById(id)
        res.json({ inventario })
    },

    postInventario: async (req, res) => {
        try {
        const {codigo,descripcion,valor,cantidad} = req.body
        const inventario = new Inventario({codigo,descripcion,valor,cantidad})
        await inventario.save()
        res.json({ inventario })
    }catch (error) {
        res.status(400).json({ error: "No se pudo crear el registro" })
    }
    },

    putInventario: async (req, res) => {
        const { id } = req.params
        const { _id, codigo,  ...resto } = req.body
        console.log(resto);

        const inventario = await Inventario.findByIdAndUpdate(id, resto, { new: true })
        res.json({ inventario })
    },

}
export default httpInventario