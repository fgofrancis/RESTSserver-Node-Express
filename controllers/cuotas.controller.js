const { response }= require('express');
const Apartamento = require('../models/apartamento');
const bloque = require('../models/bloque');
const Cuota = require("../models/cuota");


const getCuotas = async(req, res=response)=>{

    const cuotas = await Cuota.find().populate('idapartamento', 'codigo');

    res.status(200).json({
        ok:true,
        cuotas
    })
};
const crearCuota = async (req, res=response)=>{

    // const { idapartamento } = req.params;
    const {estatus, ...data } = req.body;

    const cuotaExist = await Cuota.find({
                                        $and:[{idapartamento:data.idapartamento},
                                              {senal:'1'}, {estatus:true}]
                                        });
    if(cuotaExist.length > 0 ){
        return res.status(400).json({
            ok:false,
            msg:'Cuota ya existe para este mes'
        })
    };

    const cuota = new Cuota(data);
    await cuota.save();

    res.status(200).json({
        ok:true,
        cuota
    })
};

const generarCuotas = async (req, res=response)=>{

    //Buscar los apartamentos
    const apartamentoDB = await Apartamento.find();

    if(!apartamentoDB){
        return res.status(400).json({
            ok:false,
            msg:'No existen apartamentos'
        })
    }

    apartamentoDB.forEach( async(apto)=>{
        const cuotaExist = await Cuota.find({
                            $and:[{idapartamento:apto._id},
                                  {senal:'1'}, {estatus:true}]
                            });
        if(cuotaExist.length > 0 ){
            return;
        };

        //crear fecha de cuota
        const date = new Date();
        const [ day, month, year] = [date.getDate(),
                                     date.getMonth(), 
                                     date.getFullYear()];
        unitMonth =  month;   
        unitMonth ++;
        let newFechageneracion = new Date(year,unitMonth, '01' ); 

        let cuotaData ={
            idapartamento:apto._id,
            monto: apto.cuotaasignada,
            saldo: apto.cuotaasignada,
            fechageneracion: newFechageneracion,
            senal: '1'
        };
      
        const cuota = new Cuota(cuotaData);
        await cuota.save()
    });

    // buscar cuotas para retornarlas
    const cuotas = await Cuota.find();

    res.status(200).json({
        ok:true,
        cuotas
    })
};

module.exports ={
    crearCuota,
    getCuotas,
    generarCuotas
}