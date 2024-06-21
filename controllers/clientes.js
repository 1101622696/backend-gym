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

    getClientesPorPlan :async (req, res) => {
        try {
            const { id } = req.params; 
            const clientes = await Cliente.find({ idPlan: id }); 
            res.json({ clientes });
        } catch (error) {
            console.error("Error al obtener clientes por ID de plan:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    getClientesPorCumpleaños: async (req, res) => {
        try {
            const { dia, mes } = req.query; 

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
        try {
            const activados = await Cliente.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener clientes activados' });
        }
    },

    getClientesdesactivados: async (req, res) => {
        try {
        const desactivados = await Cliente.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener clientes activados' });
    }
    },

    postClientes: async (req, res) => {
        try {
        const {nombre, fechaIngreso, documento,direccion,fechaNacimiento,telefono,observaciones,estado,idPlan,fechavencimiento,foto, seguimiento} = req.body
        const cliente = new Cliente({nombre, fechaIngreso, documento,direccion,fechaNacimiento,telefono,observaciones,estado,idPlan,fechavencimiento,foto, seguimiento})
        await cliente.save()
        res.json({ cliente })
    }catch (error) {
        console.log(error);
        res.status(400).json({ error: "No se pudo crear el registro" })
    }
    },


    putClientes: async (req, res) => {
        const { id } = req.params
        const { _id, estado,  ...resto } = req.body
        console.log(resto);

        const cliente = await Cliente.findByIdAndUpdate(id, resto, { new: true })
        res.json({ cliente })
    },
  
    // putClienteSeguimiento: async (req, res) => {
    //     const { id } = req.params;
    //     const { seguimiento } = req.body;
    
    //     try {
    //         console.log("ID del cliente recibido:", id);
    //         console.log("Datos de seguimiento recibidos:", seguimiento);
    
    //         const cliente = await Cliente.findById(id);
    //         if (!cliente) {
    //             return res.status(404).json({ error: "Cliente no encontrado" });
    //         }
    
    // // Calcula el IMC y agrega al seguimiento
    // const seguimientoConIMC = seguimiento.map(entry => {
    //     const alturaEnMetros = entry.altura / 100; // Convertir altura de cm a metros
    //     const imc = entry.peso / (alturaEnMetros * alturaEnMetros);
    //     return { ...entry, imc: imc.toFixed(2) };
    //   });
  
    //   cliente.seguimiento.push(...seguimientoConIMC);
  
    //   await cliente.save();
    
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
            console.log("ID del cliente recibido:", id);
            console.log("Datos de seguimiento recibidos:", JSON.stringify(req.body, null, 2));
            console.log("Tipo de seguimiento:", typeof seguimiento);
            console.log("¿Es seguimiento un array?:", Array.isArray(seguimiento));
        
            if (!Array.isArray(seguimiento)) {
              console.log("Formato recibido no es un array");
              return res.status(400).json({ error: "Formato de seguimiento incorrecto" });
            }
        
            const cliente = await Cliente.findById(id);
            if (!cliente) {
              return res.status(404).json({ error: "Cliente no encontrado" });
            }
        
            const seguimientoConIMC = seguimiento.map(entry => {
              const alturaEnMetros = entry.altura / 100;
              const imc = entry.peso / (alturaEnMetros * alturaEnMetros);
              return { ...entry, imc: imc.toFixed(2) };
            });
        
            cliente.seguimiento.push(...seguimientoConIMC);
        
            await cliente.save();
        
            res.status(200).json({ message: "Seguimiento actualizado", cliente });
          } catch (error) {
            console.error("Error al actualizar el seguimiento", error);
            res.status(500).json({ error: "Error interno del servidor" });
          }
        },    

    putClienteActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!cliente) {
                return res.status(404).json({ error: "Cliente no encontrado" });
            }
            res.json({ cliente });
        } catch (error) {
            console.error("Error al activar cliente", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    putClienteDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!cliente) {
                return res.status(404).json({ error: "Cliente no encontrado" });
            }
            res.json({ cliente });
        } catch (error) {
            console.error("Error al desactivar cliente", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

}
export default httpClientes