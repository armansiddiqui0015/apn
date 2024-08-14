const express = require('express')
const app = express();
const path = require('path');
const ownersRouter = require('./routes/ownersRoute');
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');
const connectDB = require('./config/mongooseConnection')
const cookeiParser = require('cookie-parser')
const expressSession = require('express-session')
const flash = require('connect-flash')
const indexRouter = require('./routes/index')
require('dotenv').config();

connectDB(); 

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookeiParser()) 
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(flash()) 

app.use('/',indexRouter)
app.use('/owners', ownersRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);

app.listen(3000)
