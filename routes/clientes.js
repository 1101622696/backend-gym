import {Router} from 'express'
import httpClientes from '../controllers/clientes.js'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import helpersClientes from '../helpers/clientes.js'
import {validarJWT} from '../middlewares/validar-jwt.js'


const router=Router()


// router.get("/listar",[validarJWT],httpClientes.getClientes)
router.get("/listar",httpClientes.getClientes)
router.get("/listarid/:id",httpClientes.getClientesID)
router.get("/seguimiento",httpClientes.getSeguimientoCliente)
router.get("/porplan",httpClientes.getClientesPorPlan)
router.get("/cumpleaños",httpClientes.getClientesPorCumpleaños)
router.get("/listaractivados",httpClientes.getClientesactivados)
router.get("/listardesactivados",httpClientes.getClientesdesactivados)


router.post("/escribir",[
    check('nombre','El documento no puede estar vacio.').notEmpty(),
    check('documento','Minimo 6 caracteres.').isLength({min:6}),
    check('idPlan','Se necesita un mongoid valido').isMongoId(),
    check('idPlan').custom(helpersClientes.validaridPlan),
    check('telefono', 'minimo 9 caracteres.').isLength({min:9}),
    check('telefono').custom(helpersClientes.validarTelefono),
    validarCampos
],httpClientes.postClientes)


router.put("/modificar/:id",[    
    check('nombre','El documento no puede estar vacio.').notEmpty(),
    check('documento','Minimo 6 caracteres.').isLength({min:6}),
    check('telefono', 'minimo 9 caracteres.').isLength({min:9}),
    check('telefono', 'en digitos.').isNumeric().notEmpty(),
    validarCampos
]
,httpClientes.putClientes)

router.put("/modificar/seguimiento/:id",[
  check('id','Se necesita un mongoid valido').isMongoId(),
  check('id').custom(helpersClientes.validarExistaIdcliente),
  validarCampos
],httpClientes.putClienteSeguimiento)



router.put("/activar/activados/:id",[
    check('id','Se necesita un mongoid valido').isMongoId(),
    check('id').custom(helpersClientes.validarExistaIdcliente),
    validarCampos
  ],httpClientes.putClientesActivar)
  
  router.put("/desactivar/desactivados/:id",[
    check('id','Se necesita un mongoid valido').isMongoId(),
    check('id').custom(helpersClientes.validarExistaIdcliente),
    validarCampos
  ],httpClientes.putClientesDesactivar)
  



export default router
