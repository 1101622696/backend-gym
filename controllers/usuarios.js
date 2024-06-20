import sedes from "../models/sedes.js";
import Usuario from "../models/usuarios.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/validar-jwt.js";

const httpUsuarios = {
  getUsuarios: async (req, res) => {
    const { busqueda } = req.query;
    const usuario = await Usuario.find({
      $or: [{ nombre: new RegExp(busqueda, "i") }],
    });
    res.json({ usuario });
  },

  getUsuariosID: async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    res.json({ usuario });
  },
  getUsuariosactivados: async (req, res) => {
    try {
      const activados = await Usuario.find({ estado: 1 });
      res.json({ activados });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuarios activados' });
  }
},


  getUsuariosdesactivados: async (req, res) => {
    try {
      const desactivados = await Usuario.find({ estado: 0 })
      res.json({ desactivados })
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuarios activados' });
  }
  },

  postUsuarios: async (req, res) => {
    try {
      const { id, nombre, email, telefono, password, rol, estado } = req.body;
      const usuario = new Usuario({
        id,
        nombre,
        email,
        telefono,
        password,
        rol,
        estado,
      });
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync(password, salt);
      await usuario.save();
      res.json({ usuario });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo crear el registro" });
    }
  },

  putUsuarios: async (req, res) => {
    const { id } = req.params;
    const { _id, codigo, estado, password, ...resto } = req.body;
    console.log(resto);

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
    res.json({ usuario });
  },

  putUsuariospassword: async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    console.log(password);

    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { password },
      { new: true }
    );
    res.json({ usuario });
  },

  putUsuariosActivar: async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 }, { new: true });
        if (!usuario) {
            return res.status(404).json({ error: "usuario no encontrado" });
        }
        res.json({ usuario });
    } catch (error) {
        console.error("Error al activar usuario", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
},

putUsuariosDesactivar: async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 }, { new: true });
        if (!usuario) {
            return res.status(404).json({ error: "usuario no encontrado" });
        }
        res.json({ usuario });
    } catch (error) {
        console.error("Error al desactivar usuario", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
},


login: async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usuario.findOne({ email });

    if (!user || user.estado == 0) {
      return res.status(401).json({ msg: "usuario o contraseña incorrecto" });
    }

    const validacionpassword = bcryptjs.compareSync(password, user.password);
    if (!validacionpassword) {
      return res.status(401).json({ msg: "usuario o contraseña incorrecto" });
    }

    const token = await generarJWT(user._id, user.rol);
    res.json({ usuario: user, token });
  } catch (error) {
    return res.status(500).json({ msg: "comuniquese con el admin." });
  }
},

  // login: async (req, res) => {
  //   const { email, password } = req.body;
  //   try {
  //     const user = await Usuario.findOne({ email });

  //     if (!user) {
  //       // console.log("hola");
  //       return res.status(401).json({
  //         msg: "usuario o contraseña incorrecto",
  //       });
  //     }

  //     if (user.estado == 0) {
  //       // console.log("hola1");
  //       return res.status(401).json({
  //         msg: "usuario o contraseña incorrecto",
  //       });
  //     }

  //     const validacionpassword = bcryptjs.compareSync(password, user.password);
  //     if (!validacionpassword) {
  //       // console.log("hola123213");
  //       return res.status(401).json({
  //         msg: "usuario o contraseña incorrecto",
  //       });
  //     }
  //     console.log(password);

  //     const token = await generarJWT(user._id);
  //     res.json({
  //       usuario: user,
  //       token,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       msg: "comuniquese con el admin.",
  //     });
  //   }
  // },
};
export default httpUsuarios;
