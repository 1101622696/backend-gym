import Cliente from "../models/clientes.js"

const httpClientes = {


    getClientes: async (req, res) => {
        const {busqueda} = req.query
        const cliente = await Cliente.find(
            {
                $or: [
                    { nombre: new RegExp(busqueda, "i") },
// {seguimiento: { peso: new RegExp(busqueda, "i")}}

                ]
            }
        )
        res.json({cliente})
    },

    getClientesID: async (req, res) => {
        const { id } = req.params
        const clientes = await Cliente.findById(id)
        res.json({ clientes })
    },

    
    getSeguimientoCliente: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findById(id);
            if (!cliente) {
                return res.status(404).json({ error: "Cliente no encontrado" });
            }
            const seguimiento = cliente.seguimiento;
            res.json({ seguimiento });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

        getClientesPorPlan: async (req, res) => {
            try {
                const { idPlan } = req.params; 
                const clientes = await Cliente.find({ idPlan }); 
                res.json({ clientes });
            } catch (error) {
                console.error("Error al obtener clientes por ID de plan:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        },


    getClientesPorCumpleaños: async (req, res) => {
        try {
            const { dia, mes } = req.params; 

            const day = parseInt(dia);
            const month = parseInt(mes);

            if (isNaN(day) || isNaN(month) || day < 1 || day > 31 || month < 1 || month > 12) {
                return res.status(400).json({ error: "Día y mes inválidos" });
            }

            const clientes = await Cliente.find({
                $expr: {
                    $and: [
                        { $eq: [{ $dayOfMonth: "$fechaNacimiento" }, day] }, 
                        { $eq: [{ $month: "$fechaNacimiento" }, month] } 
                    ]
                }
            });

            res.json({ clientes });
        } catch (error) {
            console.error("Error al obtener clientes por día y mes de cumpleaños:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    getClientesactivados: async (req, res) => {
        const activados = await Cliente.find(estado == 1)
        res.json({ activados })
    },

    getClientesdesactivados: async (req, res) => {
        const desactivados = await Cliente.find(estado == 0)
        res.json({ desactivados })
    },

    postClientes: async (req, res) => {
        try {
        const {nombre, fechaIngreso, documento,direccion,fechaNacimiento,telefono,estado,idPlan,fechavencimiento,foto, seguimiento} = req.body
        const cliente = new Cliente({nombre, fechaIngreso, documento,direccion,fechaNacimiento,telefono,estado,idPlan,fechavencimiento,foto, seguimiento})
        await cliente.save()
        res.json({ cliente })
    }catch (error) {
        console.log(error);
        res.status(400).json({ error: "No se pudo crear el registro" })
    }
    },
    //     postSeguimiento: async (req, res) => {
    //         try {
    //             const {clienteId} = req.params; 
    //             const cliente = await Cliente.findById(clienteId); 
    
    //             if (!cliente) {
    //                 return res.status(404).json({ error: "Cliente no encontrado" });
    //             }
    
    //             const { fecha, peso, imc, brazo, pierna, edad } = req.body;
    //             const nuevoSeguimiento = { fecha, peso, imc, brazo, pierna, edad };
    
    //             cliente.seguimiento.push(nuevoSeguimiento);
    //             await cliente.save(); 
    
    //             res.json({ cliente }); 
    //         } catch (error) {
    //             console.error(error);
    //             res.status(400).json({ error: "No se pudo crear el seguimiento" });
    //         }
    
    // },

    putClientes: async (req, res) => {
        const { id } = req.params
        const { _id, estado,  ...resto } = req.body
        console.log(resto);

        const cliente = await Cliente.findByIdAndUpdate(id, resto, { new: true })
        res.json({ cliente })
    },
    // putClienteSeguimiento: async (req, res) => {
    //     const { id } = req.params;
    //     const validar=[]
    //     const seguimiento={peso, imc, brazo, pierna, edad}= req.body
    //     validar.push=seguimiento
    //     try {
    //         const cliente = await Cliente.findById(id);
    //         console.log(cliente);
    //         if (!cliente) {
    //             return res.status(404).json({ error: "Cliente no encontrado" });
    //         }

    //         cliente.seguimiento = seguimiento;
    //         await cliente.save();

    //         res.json({ message: "Seguimiento actualizado ", cliente });
    //     } catch (error) {
    //         console.log(error);
    //         console.error("Error al actualizar el seguimiento", error);
    //         res.status(500).json({ error: "Error interno del servidor" });
    //     }
    // },


    // este de abajo es el que sirve
    // putClienteSeguimiento: async (req, res) => {
    //     const { id } = req.params;
    //     const { seguimiento } = req.body;
    
    //     try {
    //         const cliente = await Cliente.findById(id);
    //         if (!cliente) {
    //             return res.status(404).json({ error: "Cliente no encontrado" });
    //         }

    //         cliente.seguimiento = seguimiento;
    
    //         await cliente.save();
    
    //         res.json({ message: "Seguimiento actualizado", cliente });
    //     } catch (error) {
    //         console.error("Error al actualizar el seguimiento", error);
    //         res.status(500).json({ error: "Error interno del servidor" });
    //     }
    // },


    putClienteSeguimiento: async (req, res) => {
        const { id } = req.params;
        const { seguimiento } = req.body;
    
        try {
            const cliente = await Cliente.findById(id);
            if (!cliente) {
                return res.status(404).json({ error: "Cliente no encontrado" });
            }
    
            cliente.seguimiento.push(...seguimiento);
    
            await cliente.save();
    
            res.json({ message: "Seguimiento actualizado", cliente });
        } catch (error) {
            console.error("Error al actualizar el seguimiento", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    
    
    
    

    putClientesActivar: async (req, res) => {
        const { id } = req.params
        const cliente = await Cliente.findByIdAndUpdate(id, { estado: 1 }, { new: true })
        res.json({ cliente })
    },

    putClientesDesactivar: async (req, res) => {
        const { id } = req.params
        const cliente = await Cliente.findByIdAndUpdate(id, { estado: 0 }, { new: true })
        res.json({ cliente })
    },


}
export default httpClientes