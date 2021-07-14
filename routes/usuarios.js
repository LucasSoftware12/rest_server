const { Router } = require('express')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const {esRoleValido,emailValido,existeUsuarioPorId} = require('../helpers/db-validators')

const router = Router()
const { usuariosGet,
        usuariosPost,
        usuariosPut, 
        usuariosPatch,
        usuariosDelete } = require ('../controllers/usuarios')

router.get('/', usuariosGet) 

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser mas de 6 letras').isLength({min:6}),
    
    check('correo').custom(emailValido),
   // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
   check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost )

router.put('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut )


router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
], usuariosDelete )

router.patch('/', usuariosPatch )


module.exports = router