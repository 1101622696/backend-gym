import {Router} from 'express'
import httpUsuarios from '../controllers/usuarios.js'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import helpersUsuarios from '../helpers/usuarios.js'
import {validarJWT} from '../middlewares/validar-jwt.js'

const router=Router()

// router.get("/listar",[validarJWT],httpUsuarios.getUsuarios)
router.get("/listar",httpUsuarios.getUsuarios)


router.get("/listarid/:id",httpUsuarios.getUsuariosID)
router.get("/listaractivados",httpUsuarios.getUsuariosactivados)
router.get("/listardesactivados",httpUsuarios.getUsuariosdesactivados)


router.post("/escribir",[
  check('id').custom(helpersUsuarios.validarIdSede),
    check('nombre','El nombre no puede estar vacio.').notEmpty(),
    check('email','El email no puede estar vacio.').notEmpty(),
    check('email','El email debe estar bien escrito.').isEmail(),
    check('telefono','Minimo 9 caracteres.').isLength({min:9}),
    check('email','El email debe estar bien escrito.').custom(helpersUsuarios.validarEmail),
    check('rol','debe especificar un rol').isString(),
    check('password', 'La contraseña debe contener al menos tres letras y tres números').custom(helpersUsuarios.validarPassword),
    validarCampos
],httpUsuarios.postUsuarios)

router.post("/login",[
  check('email','El email debe estar bien escrito.').isEmail(),
  check('email').custom(helpersUsuarios.Noexisteelcorreo),
],httpUsuarios.login
)

router.put("/modificar/:id",[
  check('id').custom(helpersUsuarios.validarIdUsuario),
  check('nombre','El nombre no puede estar vacio.').notEmpty(),
  check('email','El email no puede estar vacio.').notEmpty(),
  check('email','El email debe estar bien escrito.').isEmail(),
  check('telefono','Minimo 9 caracteres.').isLength({min:9}),
  check('rol','debe especificar un rol').isString(),
  check('password', 'Debe tener al menos 8 caracteres con al menos dos numeros incluidos.')
      .isStrongPassword({ minLength: 8, minNumbers: 2 }),
  validarCampos
],httpUsuarios.putUsuarios)

router.put("/password/porid/:id",[
  check('id','Se necesita un mongoid valido').isMongoId(),
  check('id').custom(helpersUsuarios.validarIdUsuario),
  validarCampos
],httpUsuarios.putUsuariospassword)

router.put("/activar/activos/:id",[
  check('id','Se necesita un mongoid valido').isMongoId(),
  check('id').custom(helpersUsuarios.validarIdUsuario),
  validarCampos
],httpUsuarios.putUsuariosActivar)

router.put("/desactivar/desactivados/:id",[
  check('id','Se necesita un mongoid valido').isMongoId(),
  check('id').custom(helpersUsuarios.validarIdUsuario),
  validarCampos
],httpUsuarios.putUsuariosDesactivar)
 

export default router