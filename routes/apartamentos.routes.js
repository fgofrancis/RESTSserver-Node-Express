const { Router } = require('express');
const {registarApartamento,
       getApartamentos 
      } = require('../controllers/apartamentos.controller');


const router = Router();

router.post('/',registarApartamento)

router.get('/',getApartamentos)


module.exports = router