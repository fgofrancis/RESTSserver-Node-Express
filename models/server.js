
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths ={
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            uploads:    '/api/uploads',
            usuarios:   '/api/usuarios',
            categorias: '/api/categorias', 
            productos:  '/api/productos' 
        }

        /* Lo refactoricé por lo de arriba */
        // this.usuariosPath = '/api/usuarios';
        // this.authPath = '/api/auth';
        // this.categoriasPath = '/api/categorias';

        // Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middleware();

        //Rutas de mi aplicacion
        this.routes();

    }

    async conectarDB(){
        await dbConnection();
    }

    middleware(){

        // CORS
        this.app.use(cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //directorio público
        this.app.use(express.static('public') );

        //FileUpload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
        
    }
 
    routes(){

        this.app.use(this.paths.auth,       require('../routes/auth.routes') );
        this.app.use(this.paths.buscar,     require('../routes/buscar.routes') );
        this.app.use(this.paths.usuarios,   require('../routes/user.routes') );
        this.app.use(this.paths.uploads,    require('../routes/uploads.routes') );
        this.app.use(this.paths.categorias, require('../routes/categorias.routes') );
        this.app.use(this.paths.productos,  require('../routes/productos.routes') );

        /* Lo refactorice por lo de arriba */
        // this.app.use(this.authPath, require('../routes/auth.routes') );
        // this.app.use(this.usuariosPath, require('../routes/user.routes') );
        // this.app.use(this.categoriasPath, require('../routes/categorias.routes') );
    };

    listen(){
        this.app.listen(this.port, ()=>{
            console.log( `Estamos corriendo en el puerto: ${this.port}`);
        } );
    };
}

module.exports = Server