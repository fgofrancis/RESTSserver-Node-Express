const {request,  response} = require('express');
const { Usuario, Categoria, Producto } = require('../models');
const { ObjectId } = require('mongoose').Types;

const collectionPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];

const buscarUsuario = async(termino = '', res=response)=>{

    const esMongoID = ObjectId.isValid(termino);//TRUE
   
    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results:(usuario)?[usuario]:[]
        })
    };

    const regex = new RegExp(termino, 'i');//incensible a mayuscula o minuscula
    // const usuarios = await Usuario.find( {nombre:regex} ); //Amplificando la busqueda mas abajo

    // const usuarios = await Usuario.find({
    //     $or:[ {nombre:regex}, {correo:regex} ],
    //     $and:[ {estado:true} ]
    // });
    
    const [total, usuarios] = await Promise.all([
        Usuario.count({
            $or:[ {nombre:regex}, {correo:regex} ],
            $and:[ {estado:true} ]
        }),
        Usuario.find({
            $or:[ {nombre:regex}, {correo:regex} ],
            $and:[ {estado:true} ]
        })
    ])

      res.json({
        total,
        usuarios
    })

}
const buscarCategoria = async(termino = '', res=response)=>{

    const esMongoID = ObjectId.isValid(termino);//TRUE
   
    if(esMongoID){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results:(categoria)?[categoria]:[]
        })
    };

    const regex = new RegExp(termino, 'i');//incensible a mayuscula o minuscula

    const [total, categorias] = await Promise.all([
        Categoria.count({
            $or:[ {nombre:regex} ],
            $and:[ {estado:true} ]
        }),
        Categoria.find({
            $or:[ {nombre:regex} ],
            $and:[ {estado:true} ]
        })
    ])

      res.json({
        total,
        categorias
    })

}
const buscarProducto = async(termino = '', res=response)=>{

    const esMongoID = ObjectId.isValid(termino);//TRUE
   
    if(esMongoID){
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results:(producto)?[producto]:[]
        })
    };

    const regex = new RegExp(termino, 'i');//incensible a mayuscula o minuscula

    const [total, producto] = await Promise.all([
        Producto.count({
            $or:[ {nombre:regex} ],
            $and:[ {estado:true} ]
        }),
        Producto.find({
            $or:[ {nombre:regex} ],
            $and:[ {estado:true} ]
        }).populate('categoria', 'nombre')
    ])

      res.json({
        total,
        producto
    })

}

const buscar = (req=request, res=response)=>{

    const {collection, termino } = req.params;

    if( !collectionPermitidas.includes(collection) ){
        return res.status(400).json({
            ok:false,
            msg:`Las colleciones permitidas son..: ${collectionPermitidas}`
        })
    };

switch (collection) {
    case 'categorias':
            buscarCategoria(termino, res)
            break

        case 'productos':
            buscarProducto(termino, res)
            break

        case 'roles':
            break

        case 'usuarios':
            buscarUsuario(termino, res)
            break
        
        default:
            res.status(500).json({
                msg:'Se le olvidó hacer esta búsqueda'
            })
    }
}

module.exports = {
    buscar
}