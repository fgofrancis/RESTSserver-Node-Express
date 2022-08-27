/**
 * cuotas:         '/api/cuotas'
 */
const { Router} = require('express');
const { crearCuota,
        getCuotas, 
        generarCuotas
     } = require('../controllers/cuotas.controller');


const router = Router();

router.get('/', getCuotas);

router.post('/', crearCuota);
router.get('/generarcuotas', generarCuotas);

module.exports = router;
