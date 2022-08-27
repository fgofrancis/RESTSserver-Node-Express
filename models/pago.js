const {Schema, model }= require('mongoose');

const pagoSchema = Schema({

    idapartamento:{
        type:Schema.Types.ObjectId,
        ref:'Apartamento',
        required:true
    },

    fechageneracion:{
        type:Date,
        default: Date.now()
    },
    monto:{
        type:Number,
        default:0
    },
    formapago:{
        type:String,
        // emun: ['EFECTIVO', 'TRANSFERENCIA, CHEQUE'],
         default:'Tranferencia'
    },
    estatus:{
        type:Boolean,
        default:true
    }

});

module.exports = model('Pago', pagoSchema);
