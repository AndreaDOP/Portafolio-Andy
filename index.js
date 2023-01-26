//dependencia de node para:
//express=servidor
const express = require('express');
const app = express();

//mysqls=db
const mysql = require('mysql2');

//frond=hbs motor de plantilla
const hbs = require('hbs');

//email=nodemailer es para enviar correos
const nodemailer = require('nodemailer');
const { Console } = require("console");

//rutas=path. Encuentra archivos
const path = require('path');
const exp = require('constants');

//configuracion de dotenv para variables de entorno
require('dotenv').config();

//configuramos el puerto
const PORT = process.env.PORT || 9000;


//console.log();

//Midelware. esto hace que la aplicacion entienda y se comunique con los comandos
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//configuramos motor de plantillas para el frond con HBS
app.set('view engine', 'hbs');
//configuracion la ubicaion de las plantillas
app.set('views', path.join(__dirname, 'views'));
//configuracion los partial de los motores de las plantillas
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//conexion de la base de datos
const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
})

conexion.connect((err) =>{
    if(err) throw err;
    console.log(`conectado a la base de datos: ${process.env.DATABASE}`);
})

//rutas de la app
app.get('/', (req, res)=>{
    res.render('index');
})   

app.get('/index', (req, res) => {
    res.render('saludo', {
        titulo: 'saludo'
    })
})

app.get('/09-clase-calculadora', (req, res) => {
    res.render('09-clase-calculadora', {
        titulo: 'calculadora'
    })
})

app.get('/sprint-1', (req, res) => {
    res.render('sprint-1', {
        titulo: 'sprint-1'
    })
})

app.get('/saludo', (req, res) => {
    res.render('saludo', {
    titulo: 'saludo'
    })
})

//creación de post de datos de clientes y envio de email
app.post("/index", (req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const phone = req.body.phone;
    const mensaje = req.body.mensaje;

    //creamos una funcion para enviar Email al cliente
    async function envioMail(){
      //configuramos la cuenta del envio
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD
        }
    });

      //Envio del mail
    let info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: `${email}`,
        subject: "Hola, soy Andrea Valdes - Programadora Full Stack - App/Web",
        html: `Muchas gracias por escribirme. <br>
        Me dedico a construir sitios web usando código nativo de programación y también a través de WordPress. <brv
        Los conocimientos adquiridos hasta ahora son:<br>
        -Front-end, Back-end y UX/UI <br>
        Los lenguajes con los que desarrollo mis maquetas son:<br>
        - HTML <br>
        - CSS <br>
        - JavaScript <br>
        - Node JS <br>
        - MySql <br>
        Actualmente, estoy perfeccionando mis habilidades para afrontar nuevos retos. Es motivador para mí. <br>
        Si necesitas más información de mi perfil, con gusto podríamos coordinar una reunión por meet.<br>
        Que tengas una buena semana.<br>
        Saludos,<br>
        Andrea Valdes <br>`
    })

    }

    let datos = {
    nombre: nombre,
    email: email,
    phone: phone,
    mensaje: mensaje,
    }

    let sql = "INSERT INTO usuarios set ?";

    conexion.query(sql, datos, function(err){
    if(err) throw err;
    console.log(`1 Registro insertado`);
      //Email
    envioMail().catch(console.error);
    res.render('saludo')
    })
})

//servidor a la escucha de las peticiones
app.listen(PORT, ()=>{
    console.log(`Servidor trabajando en el puerto: ${PORT}`);
})






