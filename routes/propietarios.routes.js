const { Router} = require('express');
const { getPropietario, crearPropietario
      } = require('../controllers/propietarios.controller');

const router = Router();

router.get('/',getPropietario);

router.get('/:id', (req, res)=>{
    res.status(200).json({
        ok:true,
        msg:'getPropietarioById'
    })
});
router.post('/',crearPropietario);

router.put('/:id', (req, res)=>{
    res.status(200).json({
        ok:true,
        msg:'ActualizarPropietarios'
    })
});
router.delete('/:id', (req, res)=>{
    res.status(200).json({
        ok:true,
        msg:'deletePropietarios'
    })
});
module.exports = router;