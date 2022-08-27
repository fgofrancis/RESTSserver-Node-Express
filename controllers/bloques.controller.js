const Bloque = require("../models/bloque");


const getBloques = async (req, res)=>{

    const bloques = await Bloque.find();

    res.status(200).json({
        ok:true,
        bloques
    })
};

const crearBloque = async (req, res)=>{

    const {estatus, ...data} = req.body;

    const bloque = new Bloque(data);
    await bloque.save();
    
    res.status(200).json({
        ok:true,
        bloque
    })
}


module.exports ={
    getBloques,
    crearBloque
}

