

import Venta from "../models/ventas.js";
import Inventario from "../models/inventario.js";
import Contador from "../models/contador.js";

const obtenerSiguienteCodigo = async () => {
  const nombreContador = 'ventas';
  const contador = await Contador.findOneAndUpdate(
    { nombre: nombreContador },
    { $inc: { valor: 1 } },
    { new: true, upsert: true }
  );
  return contador.valor;
};

const httpVentas = {
  getVentas: async (req, res) => {
    const { busqueda } = req.query;
    const venta = await Venta.find();
    res.json({ venta });
  },

  getVentasID: async (req, res) => {
    const { id } = req.params;
    const venta = await Venta.findById(id);
    res.json({ venta });
  },

  postVentas: async (req, res) => {
    try {
      const { id, valorUnitario, cantidad } = req.body;
      const total = valorUnitario * cantidad;
c
      const venta = new Venta({ id, codigo, valorUnitario, cantidad, total });
      await venta.save();

      const inventario = await Inventario.findById(id);
      if (!inventario) {
        return res.status(404).json({ error: 'Inventario no encontrado' });
      }
      inventario.cantidad -= cantidad;
      await inventario.save();

      res.json({ venta });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message || "No se pudo crear el registro" });
    }
  },

  putVentas: async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    console.log(resto);

    const venta = await Venta.findByIdAndUpdate(id, resto, { new: true });
    res.json({ venta });
  },
};

export default httpVentas;
