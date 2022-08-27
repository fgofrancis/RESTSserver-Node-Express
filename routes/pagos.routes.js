
const {Router} = require('express');
const { pagoCuota, 
        deudaEnCuota 
      } = require('../controllers/pagos.controller');

const router = Router();

router.post('/pago', pagoCuota)
router.get('/deuda/:idapartamento', deudaEnCuota)

module.exports = router;