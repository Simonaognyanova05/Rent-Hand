const express = require('express');
const mongoose = require('mongoose');
const serviceController = require('./controllers/serviceController');
const about = require('./controllers/aboutController');
const contact = require('./controllers/contactController');
const login = require('./controllers/loginController');
const register = require('./controllers/registerController');


const app = express();

const dbURL = 'mongodb+srv://SimonaOgnyanova:123Simona2005@rent-hand.fcxtivy.mongodb.net/';
mongoose.connect(dbURL);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.listen(3000);

app.get('/', serviceController.service_index);
app.get('/catalog', serviceController.service_catalog);
app.get('/catalog/:id', serviceController.service_get_one);
app.delete('/catalog/:id', serviceController.service_delete_one);
app.get('/upload', serviceController.service_create_get);
app.post('/services/upload', serviceController.service_create_post);
app.get('/about', about);
app.get('/contact', contact);
app.get('/login', login);
app.get('/register', register.register_get);
app.post('/register', register.register_post);



app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' });
})
