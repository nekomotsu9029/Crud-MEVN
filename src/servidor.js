//requiero mis dependencias de desarrollo
const express = require('express');
const morgan = require('morgan');
const path = require('path');

//inicializo express y la base de datos
const app = express();
require('./database/database.js');

//configuro el puerto
app.set('port', process.env.PORT || 3000);

//defino la carpeta publica que enviara el servidor al cliente
app.use(express.static( path.join( __dirname, 'public' ) ));

//configuro los middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.use('/api/', require('./routes/routes.js'));

app.listen(app.get('port'), ()=>{
    console.log('el servidor esta a la escucha de peticiones en el puerto', app.get('port'));
})