const Apartamento = require("../models/apartamento");
const Cuota = require("../models/cuota");
const Pago  = require('../models/pago');
const Pagodetalle = require("../models/pagodetalle");

const deudaEnCuota = async(req, res)=>{

    const {idapartamento } = req.params;
    
    const cuotas = await Cuota.find({
                        $and:[{idapartamento:idapartamento},
                            {senal:'1'}, {estatus:true}]
                    });

    let totalDeuda = 0;
    cuotas.forEach( (cuota)=>{
        totalDeuda += cuota.saldo 
    })
   
    res.status(200).json({
        ok:true,
        totalDeuda,
        cuotas
    })
}
const pagoCuota = async(req, res)=>{

    const {idapartamento, monto } = req.body

    let pago = monto;

    //REGISTRAR PAGO
    let pagoData ={
        idapartamento:idapartamento,
        monto:monto,
    };
    
    const pagoRegistrado = new Pago(pagoData);
    await pagoRegistrado.save();

    //Aplicar pago a cuotas
    let cuotas = await Cuota.find({
                        $and:[{idapartamento:idapartamento},
                            {senal:'1'}, {estatus:true}]
                    });
    if(cuotas){

        let result,montoAplicado = 0;
    
        cuotas.forEach( async(cuota)=>{
             result = cuota.saldo - pago;
    
            if (result < 0){
                montoAplicado = cuota.saldo;
                cuota.saldo = 0;
                pago = Math.abs(result);
                cuota.senal = 0;
                // return;
            };
    
            if (result == 0){
                montoAplicado = cuota.saldo;
                cuota.saldo = 0;
                pago = result;
                cuota.senal = 0;
                // return;
            };
    
            if (result > 0){
                montoAplicado = pago;
                cuota.saldo = result;
                pago = 0;
                // return;
            };
    
            //Crear detalle del pago
            let pagoDetalleData = {
                idcuota: cuota._id,
                idpago:pagoRegistrado._id,
                monto:montoAplicado
            };
    
            const pagoDetalle = new Pagodetalle(pagoDetalleData);
            await pagoDetalle.save();
    
         })
    }
 
    // PAGO POR ADELANTADO
    let newCuota = [];

    if(pago > 0 ){
       newCuota =  aplicarPagoAdelantado(idapartamento,pagoRegistrado._id, pago)
    }

    res.status(200).json({
        ok:true,
        monto,
        cuotas,
        newCuota,
        // resto
        resto:pago
    })
}

const aplicarPagoAdelantado = async(idapartamento,idpago, pago)=>{

    const apartamentoDB = await Apartamento.findById(idapartamento);

    let saldoCuota = 0;
    let senalCuota = 0;
    let newCuota = [];
    let unitMonth = 0;
    let montoAplicado = 0;
    console.log('CuotaAsig..:', apartamentoDB.cuotaasignada,  pago);
   
    const date = new Date();

    const [ day, month, year] = [date.getDate(),
                                 date.getMonth(), 
                                 date.getFullYear()];
    unitMonth =  month;   
    while (pago > 0) {
        unitMonth ++;
        let newFechageneracion = new Date(year,unitMonth, '01' ); 

        let result = apartamentoDB.cuotaasignada - pago

        if (result < 0 ){
            montoAplicado = apartamentoDB.cuotaasignada
            saldoCuota = 0;
            pago = Math.abs(result);
            senalCuota = 0;
          };

        if (result == 0 ){
            montoAplicado = apartamentoDB.cuotaasignada
            saldoCuota = 0;
            pago = result;
            senalCuota = 0;
        };

        if (result > 0 ){
            montoAplicado = pago;
            saldoCuota = result;
            pago = 0;
            senalCuota = 1;
        };

        let dataCuota = {
            idapartamento: apartamentoDB._id,
            monto:apartamentoDB.cuotaasignada,
            saldo: saldoCuota,
            motivo: 2,
            senal: senalCuota,
            fechageneracion:newFechageneracion
        };

        newCuota = new Cuota(dataCuota);
        await newCuota.save();

        //Crear detalle del pago
        let pagoDetalleData = {
            idcuota: newCuota._id,
            idpago:idpago,
            monto:montoAplicado
        };
        
        const pagoDetalle = new Pagodetalle(pagoDetalleData);
        await pagoDetalle.save();
        
    }
    
}

module.exports ={
    pagoCuota,
    deudaEnCuota
}