import {Router} from 'express'
import httpInventario from '../controllers/inventario.js'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import helpersInventario from '../helpers/inventario.js'

const router=Router()

router.get("/listar",httpInventario.getInventario)

router.get("/listarid/:id",httpInventario.getInventarioID)

router.post("/escribir",[
    check('descripcion','la descripcion no puede estar vacio.').notEmpty(),
    check('descripcion','Minimo 4 caracteres.').isLength({min:4}),
    check('valor','solo numeros').isNumeric(),
    check('cantidad','solo numeros').isNumeric(),
    validarCampos
],httpInventario.postInventario)

router.put("/modificar/:id",[
    check('id','Se necesita un mongoid valido').isMongoId(),
    check('id').custom(helpersInventario.validarExistaId),    
    check('descripcion','la descripcion no puede estar vacio.').notEmpty(),
check('descripcion','Minimo 4 caracteres.').isLength({min:6}),
check('valor','solo numeros').isNumeric(),
check('cantidad','solo numeros').isNumeric(),
validarCampos
],httpInventario.putInventario)



export default router