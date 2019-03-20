const express = require('express');
const morgan = require('morgan');
const config = require('config');
const volunteers = require('./routes/volunteers');
const leaders = require('./routes/leaders');
const board = require('./routes/boardmembers');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const app = express();

app.use(express.json()); 
  // to make request body as json object
app.use(express.urlencoded({ extended: true}));  //to understand url parameters
app.use(express.static('public'));

//using a templating engine
app.set('view engine','pug');
app.use('/volunteers/',volunteers);
app.use('/leaders/', leaders);
app.use('/board/', board);

//config
console.log('App name : ' + config.get('name'));
//console.log('Mail password : ' + config.get('mail.password'));

// only cmd work to change Node environment variable
if(app.get('env') === 'development'){ 
    app.use(morgan('short'));
    startupDebugger('morgan enabled ... ');
}

//enbale debug for database
dbDebugger('Database is running ...');

port = 5000 || process.env.PORT;
app.listen(port, () => {
    console.log(`listening on port ${port} ... `)
});



























/*
let Nashaat = {
    id : 5 ,k
    sqrt : function(id)
{
    return this.id * this.id ;
}};
console.log(Nashaat.id);
console.log(Nashaat.sqrt(6));
*/


