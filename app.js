const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');

const serviceRoutes = require('./routes/serviceRoutes');
const authRoutes = require('./routes/authRoutes');
const actionRoutes = require('./routes/actionRoutes');
const staticRoutes = require('./routes/staticRoutes');

const app = express();

const dbURL = 'mongodb+srv://SimonaOgnyanova:123Simona2005@rent-hand.fcxtivy.mongodb.net/';
mongoose.connect(dbURL)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

app.use(serviceRoutes);
app.use(authRoutes);
app.use(actionRoutes);
app.use(staticRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});