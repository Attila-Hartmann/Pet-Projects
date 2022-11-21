const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require('./utilities/expressError');

const appRoutes = require('./routes');


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/todolist', appRoutes);


app.all('*', (req,res,next) => {
    next(new ExpressError('Page Not Found!', 404))
})

app.use((err, req,res,next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Oh no, something went wrong!';
    res.status(statusCode).render('error', {err})
})


app.listen('8080', () => {
    console.log("Listening on port 8080!");
})

