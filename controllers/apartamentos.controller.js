const {response} = require('express');
const Apartamento = require('../models/apartamento');

const registarApartamento = async (req, res)=>{

    const {estatus, ...data } = req.body;

    const apartamento = new Apartamento(data);
    await apartamento.save();

    res.status(200).json({
        ok:true,
        apartamento
    })
};

const getApartamentos = async (req, res)=>{

    const apartamentos = await Apartamento.find();

    res.status(200).json({
        ok:true,
        apartamentos
    })
}

module.exports = {
    getApartamentos,
    registarApartamento
}