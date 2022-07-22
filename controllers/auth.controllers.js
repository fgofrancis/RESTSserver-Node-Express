const {response } = require('express');

const Usuario = require('../models/usuario');
const passcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login =  async(req, res=response )=>{

    const {correo, password} = req.body;

    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});

        if (!usuario){
            return res.status(400).json({
                ok:false,
                msg:`Usuario / Password no son correctos - correo`
            })
        };

        //Verificar si el usuario está activo
        if(!usuario.estado){
            return res.status(400).json({
                ok:false,
                msg:`Usuario / Password no son correctos - estado:false`
            })
        };

        //Verificar si la contraseña es correcta
        const validarPassword = passcrypt.compareSync(password, usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                ok:false,
                msg:`Usuario / Password no son correctos - password`
            })
        };
        
        //Generar el JWT
        const token = await generarJWT(usuario.id);
        
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador - login'
        })
    }
}

module.exports ={
    login
}