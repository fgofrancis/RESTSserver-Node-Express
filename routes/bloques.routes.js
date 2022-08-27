
const { Router } = require('express');
const { getBloques, 
        crearBloque
     } = require('../controllers/bloques.controller');


const router = Router();

router.get('/',getBloques);

router.get('/:id',(req, res)=>{
    res.status(200).json({
        ok:true,
        msg:'buscar id Bloques'
    })
});
router.post('/',crearBloque);

router.put('/:id',(req, res)=>{
    res.status(200).json({
        ok:true,
        msg:'update Bloques'
    })
});
router.delete('/:id',(req, res)=>{
    res.status(200).json({
        ok:true,
        msg:'delete Bloques'
    })
});
module.exports = router;