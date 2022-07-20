const { Router }= require('express');
const { usuariosGet,
        usuarioPut, 
        usuarioPost,
        usuarioDelete,
        usuarioPatch
} = require('../controllers/user.controllers');

const router= Router();

router.get('/',usuariosGet);
router.put('/:id', usuarioPut);
router.post('/',usuarioPost);
router.delete('/',usuarioDelete);
router.patch('/', usuarioPatch);

module.exports= router
 