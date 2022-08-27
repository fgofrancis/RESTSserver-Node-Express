const { Schema, model} = require('mongoose');

const apartamentoSchema = Schema({
    codigo:{
        type:String,
        required:true
    },
    planta:{
        type:String
    },
    idbloque:{
        type:Schema.Types.ObjectId,
        ref:'Bloque',
        required:true
    },
    cuotaasignada:{
        type:Number,
        default:0
    },
    saldomantenimiento:{
        type:Number,
        default:0
    },
    idpropietario:{
        type:Schema.Types.ObjectId,
        ref:'Propietario',
        required:true
    },
    habitado:{
        type:String
    },
    estatus:{
        type:Boolean,
        default:true
    }


});

module.exports = model('Apartamento', apartamentoSchema);
