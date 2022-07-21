
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const isRoleValid = async(role='') =>{
    const exiteRole = await Role.findOne({role});
    if(!exiteRole){
      throw new Error(`El Role ${role} no está registrado en la DB`);
    }
  };

  const emailAlreadyDone = async(correo='')=>{
    const emailExiste = await Usuario.findOne({correo});
    if(emailExiste){
        throw new Error(`Este correo: ${correo}, ya está registrado`);
    };
  };

  const existUserById = async(id)=>{
    const existUser = await Usuario.findById(id);
    if(!existUser){
        throw new Error(`Este usuario: ${id}, no existe en la DB`);
    };
  }

  module.exports ={
    isRoleValid,
    emailAlreadyDone,
    existUserById
  }