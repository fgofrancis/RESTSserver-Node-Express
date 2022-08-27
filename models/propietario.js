const { Schema, model } = require('mongoose');

const propietarioSchema = Schema({
    identificacion:{
        type:String,
        required:true
    },

    nombre:{
        type:String
    },

    apartamentos:{
        type: String //pendiente modificar, debe ser de tipo array de obj
    },

    telefonos:{
         celular:{
            type:String
         },
         casa:{
            type:String
         },
         trabajo:{
            type:String
         }
    },
    
    direccion:{
        type:String
    },
    estatus:{
        type:Boolean,
        default:true
    }

});

module.exports = model('Propietario', propietarioSchema)