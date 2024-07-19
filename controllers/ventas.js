

import Venta from "../models/ventas.js";
import Inventario from "../models/inventario.js";
import Contador from "../models/contador.js";
import helpersVentas from "../helpers/ventas.js";

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
      const { idInventario, valorUnitario, cantidad } = req.body;
      const total = valorUnitario * cantidad;
      const codigo = await obtenerSiguienteCodigo();

      const venta = new Venta({ idInventario, codigo, valorUnitario, cantidad, total });
      await venta.save();

      const inventario = await Inventario.findById(idInventario);
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

  // putVentas: async (req, res) => {
  //   const { id } = req.params;
  //   const { _id, codigo, fecha, total, ...resto } = req.body;
  //   console.log(resto);

  //   const venta = await Venta.findByIdAndUpdate(id, resto, { new: true });
  //   res.json({ venta });
  // },
  putVentas: async (req, res) => {
    try {
        const { id } = req.params;
        const { valorUnitario, idInventario, cantidad } = req.body;

        await helpersVentas.validarIdInventario(idInventario);
        await helpersVentas.validarCantidadDisponible(idInventario, cantidad);

        const ventaOriginal = await Venta.findById(id);
        if (!ventaOriginal) {
            throw new Error("Venta no encontrada");
        }

        const diferencia = cantidad - ventaOriginal.cantidad;

        const ventaActualizada = await Venta.findByIdAndUpdate(id, { valorUnitario, idInventario, cantidad }, { new: true });

        await helpersVentas.ajustarInventario(idInventario, diferencia);

        res.json({ venta: ventaActualizada });
    } catch (error) {
        console.error("Error updating ventas:", error);
        res.status(400).json({ error: error.message || "No se pudo actualizar la venta" });
    }
}
};

export default httpVentas;
