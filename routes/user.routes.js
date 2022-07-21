const { Router }= require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { isRoleValid, emailAlreadyDone, existUserById } = require('../helpers/db-validators');

const { usuariosGet,
        usuarioPut, 
        usuarioPost,
        usuarioDelete,
        usuarioPatch
} = require('../controllers/user.controllers');

const router= Router();

router.get('/',usuariosGet);
router.post('/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mínimo de 6 y maxima 10 tetras').isLength({ min:6 } && {max:10}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailAlreadyDone),

    // es mejor validar el role sobre una base de datos, no hard code   
    // check('role', 'No es un Role válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),

    check('role').custom(isRoleValid ),
    validarCampos
  ],
  usuarioPost);

router.put('/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    validarCampos
  ],
   usuarioPut);
router.delete('/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    validarCampos
  ],usuarioDelete);
router.patch('/', usuarioPatch);

module.exports= router
 