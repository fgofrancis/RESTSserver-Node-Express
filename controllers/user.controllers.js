const {request, response } = require('express')

 const usuariosGet = (req = request, res=response )=>{

    const {q, nombre='No nombre', apikey, page=1, limit=10} = req.query;
  
    res.json({
        ok:true,
        msg:'get Api - Controlador',
        q, nombre, apikey,page,limit 
    }); 
}

const usuarioPost = (req, res=response )=>{
    const {nombre, edad} = req.body;

    res.status(400).json({
        ok:true,
        msg:'put Api - Controlador',
        nombre, edad
    }); 
}

const usuarioPut =  (req, res=response )=>{
    const {id }= req.params;

    res.status(201).json({
        ok:true,
        msg:'post Api - Controlador',
        id
    }); 
}

const usuarioDelete =  (req, res=response )=>{
    res.json({
        ok:true,
        msg:'delete Api - Controlador'
    }); 
}

const usuarioPatch = (req, res=response )=>{
    res.json({
        ok:true,
        msg:'patch Api - Controlador'
    }); 
}

module.exports ={
    usuariosGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch  
}