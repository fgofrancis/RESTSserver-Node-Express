const Propietario = require("../models/propietario");


const getPropietario =  async (req, res)=>{

    const propietarios = await Propietario.find();

    res.status(200).json({
        ok:true,
        propietarios
    })
};

const crearPropietario =async (req, res)=>{

    const {estatus, ...data} = req.body; //TODO usar bien

    const propietario = new Propietario(data);
    await propietario.save();

    res.status(200).json({
        ok:true,
        propietario
    })
};

module.exports ={
    getPropietario,
    crearPropietario
}