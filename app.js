const express = require('express');
const http = require('http');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const server = http.Server(app);
const port = 3000;

app.set('port', port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', require('./server/routes/main'));


// // Routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'page/index.html'));
});

app.get('/formulario', (req, res) => {
    res.sendFile(path.join(__dirname, 'page/formulario.html'));
});

//mailer
app.post('/send_email', (req, res) => {
    var nombre = req.body.nombre;
    var telefono = req.body.telefono;
    var email = req.body.email;
    var servicio = req.body.servicio;
    var fecha = req.body.fecha;
    var hora = req.body.hora;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'petroskyhelper@gmail.com',
            pass: 'jncj fcpo cuds aigg'
        }
    });  

    var mailOptions = {
        from: 'email',
        to: 'petroskyhelper@gmail.com',
        subject: 'Solicitud de Servicio: ' + servicio,
        text: 'Nombre: ' + nombre + '\n' + 'Telefono: ' + telefono + '\n' + 'Email: ' + email + '\n' + 'Servicio: ' + servicio + '\n' + 'Fecha: ' + fecha + '\n' + 'Hora: ' + hora
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        response.redirect('/');
    });
});

// initialize the server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});