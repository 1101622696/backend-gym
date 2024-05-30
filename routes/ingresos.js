import {Router} from 'express'
import httpIngresos from '../controllers/ingresos.js'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import helpersIngresos from '../helpers/ingresos.js'

const router=Router()

router.get("/listar",httpIngresos.getIngresos)

router.get("/listarid/:id",httpIngresos.getIngresosID)

router.post("/escribir",[
    check('idSede','Se necesita un mongoId valido').isMongoId(),
    check('idSede').custom(helpersIngresos.validarIdSede),
    check('idCliente','Se necesita un mongoId valido').isMongoId(),
    check('idCliente').custom(helpersIngresos.validarIdCliente),
    validarCampos
],httpIngresos.postIngresos)

router.put("/modificar/:id",[
    check('id','Se necesita un mongoId valido').isMongoId(),
    check('id',).custom(helpersIngresos.validarIdSede),
    validarCampos
],httpIngresos.putIngresos)



export default router