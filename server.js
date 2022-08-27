/* get .env */
require('dotenv').config();

/* get express */
const express = require('express');
const app = express();

/*--------get mongoose and settings--------------*/
const mongoose = require('mongoose'); // mongoose returns a promise
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('read');
    })
    .catch(e => console.log(e));
/*-----------------------------------------------*/

/* Express session */ 
const session = require('express-session');
const MongoStore = require('connect-mongo'); // set mongoose => save session on database
const flash = require('connect-flash'); // set flash => fpr flash messages

/* routes and more */
const routes = require('./routes');
const path = require('path'); // set path => get absolutely directory
const helmet = require('helmet'); // set helmet => for security see documentations
const csrf = require('csurf'); // set csurf => csrf for tokens on forms, prevent security failure. -> see documentations
const {middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware'); // set rotes middlewares => functions executed on rotes

/* uses on app */
app.use(helmet());
app.use(express.urlencoded({extended: true})); // for post form for application
app. use(express.json());
app.use(express.static(path.resolve(__dirname, 'public'))); // for work with static files

const sessionOptions = session ({
    secret: 'abkaanskaçlwaçlsakda aksd aks alwça daçkda waçskd a()',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); // set folder views
app.set('view engine', 'ejs'); // sets engine for work on archives of page

app.use(csrf());

/* Nossos próprios middlewares */ 
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('read' , () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Server running on port 3000');
    });
})
