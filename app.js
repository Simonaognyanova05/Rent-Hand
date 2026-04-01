const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const serviceController = require('./controllers/serviceController');
const about = require('./controllers/aboutController');
const contact = require('./controllers/contactController');
const login = require('./controllers/loginController');
const register = require('./controllers/registerController');
const message = require('./controllers/messageController');
const book = require('./controllers/bookController');
const profile = require('./controllers/profileController');
const bookingActions = require('./controllers/bookingController');
const isAuth = require('./middlewares/isAuth');


const app = express();

const dbURL = 'mongodb+srv://SimonaOgnyanova:123Simona2005@rent-hand.fcxtivy.mongodb.net/';
mongoose.connect(dbURL);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(methodOverride('_method'));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});


app.listen(3000);

app.get('/', serviceController.service_index);
app.get('/catalog', serviceController.service_catalog);
app.get('/catalog/:id', serviceController.service_get_one);
app.delete('/catalog/:id', serviceController.service_delete_one);
app.get('/upload', isAuth, serviceController.service_create_get);
app.post('/services/upload', isAuth, serviceController.service_create_post);
app.get('/catalog/edit/:id', serviceController.service_edit_get);
app.put('/catalog/edit/:id', isAuth, serviceController.service_edit_one);
app.post('/messages/:id', isAuth, message.send_service_message);
app.get('/book/:serviceId/:timeId', book.book_get);
app.post('/book/:serviceId/:timeId', book.book_post);
app.post('/booking/accept/:serviceId/:timeId', bookingActions.accept_booking);
app.post('/booking/reject/:serviceId/:timeId', bookingActions.reject_booking);
app.get('/profile', isAuth, profile.profile_get);
app.get('/about', about);
app.get('/contact', contact);
app.get('/login', login.login_get);
app.get('/logout', login.logout);
app.post('/login', login.login_post);
app.get('/register', register.register_get);
app.post('/register', register.register_post);



app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' });
})
