const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');

// Контролери
const serviceController = require('./controllers/serviceController');
const bookingActions = require('./controllers/bookingController');
const message = require('./controllers/messageController');
const book = require('./controllers/bookController');
const contact = require('./controllers/contactController');
const login = require('./controllers/loginController');
const register = require('./controllers/registerController');
const profile = require('./controllers/profileController');
const about = require('./controllers/aboutController');
const { admin_messages } = require('./controllers/adminController');

// Middlewares
const isAuth = require('./middlewares/isAuth');

const app = express();

// База данни
const dbURL = 'mongodb+srv://SimonaOgnyanova:123Simona2005@rent-hand.fcxtivy.mongodb.net/';
mongoose.connect(dbURL);

// Настройки на Express (EJS & Static)
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Сесия
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Глобални променливи за Views
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// --- РУТОВЕ ---

// Начало и Каталог
app.get('/', serviceController.service_index);
app.get('/catalog', serviceController.service_catalog);
app.get('/catalog/:id', serviceController.service_get_one);
app.get('/catalog/edit/:id', isAuth, serviceController.service_edit_get);
app.put('/catalog/edit/:id', isAuth, serviceController.service_edit_one);
app.delete('/catalog/:id', isAuth, serviceController.service_delete_one);

// Качване на услуги
app.get('/upload', isAuth, serviceController.service_create_get);
app.post('/services/upload', isAuth, serviceController.service_create_post);

// Резервации (Booking)
app.get('/book/:serviceId/:timeId', isAuth, book.book_get);
app.post('/book/:serviceId/:timeId', isAuth, book.book_post);
app.post('/booking/accept/:serviceId/:timeId', isAuth, bookingActions.accept_booking);
app.post('/booking/reject/:serviceId/:timeId', isAuth, bookingActions.reject_booking);

// Съобщения
app.post('/messages/:id', isAuth, message.send_service_message);
app.post('/reply/:serviceId/:messageId', isAuth, message.reply_message);
app.get('/admin-messages', isAuth, admin_messages);

// Потребител (Профил, Логин, Регистър)
app.get('/profile', isAuth, profile.profile_get);
app.get('/login', login.login_get);
app.post('/login', login.login_post);
app.get('/logout', login.logout);
app.get('/register', register.register_get);
app.post('/register', register.register_post);

// Статични страници
app.get('/about', about);
app.get('/contact', contact.contact_get);
app.post('/contact', contact.contact_post);

// 404 Грешка
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});