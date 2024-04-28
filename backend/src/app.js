const path = require('path');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const oneHour = 3600000;

const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL || "https://aureus.procc.fiocruz.br";
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/sgbmi';

// connect to db
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('Db Connected'))
.catch(err => console.log(err));

//importing routes
const indexRoutes = require('./routes/index');

// settings
app.use(cors({origin: FRONTEND_URL, credentials: true}));
app.set('port', PORT);
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.set('debugMode',true);

//middlewares
app.use(session({secret: 'sgbmiSecret',saveUninitialized: true,resave: true}));
app.use(morgan('dev'));
app.use(express.urlencoded({limit: 999999, extended: true}));
app.use(express.static(__dirname + '/views/static', {maxAge: oneHour }));
app.use(fileUpload({createParentPath: true}));

//routes
app.use('/',indexRoutes);

//starting the server
app.listen(app.get('port'),() => {
    console.log(`Server on port ${app.get('port')}`);
});