const Service = require('../models/service');

const service_index = (req, res) => {
    res.render('home', { title: 'Home page' });
};

const service_catalog = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const total = await Service.countDocuments();

    const services = await Service.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    const totalPages = Math.ceil(total / limit);

    res.render('catalog', {
        title: 'Catalog page',
        services,
        currentPage: page,
        totalPages
    });

};

const service_create_get = (req, res) => {
    res.render('upload', { title: 'Upload page' });
};

const service_create_post = (req, res) => {
    const user = req.session.user;

    let times = req.body.availableTimes;

    if (!Array.isArray(times)) {
        times = [times];
    }

    const formattedTimes = times.map(x => ({
        date: new Date(x)
    }));

    const service = new Service({
        ...req.body,
        availableTimes: formattedTimes,
        userId: user._id
    });

    service.save()
        .then(result => {
            res.redirect('/catalog');
        })
        .catch(err => console.log(err));
};

const service_get_one = (req, res) => {
    const id = req.params.id;

    Service.findById(id)
        .then(result => {
            res.render('details', { title: 'Details page', service: result, user: req.session.user });
        })
        .catch(err => {
            console.log(err);
        })
};

const service_delete_one = (req, res) => {
    const id = req.params.id;

    Service.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/catalog' });
        })
        .catch(err => {
            console.log(err);
        })
};

const service_edit_get = (req, res) => {
    const id = req.params.id;

    Service.findById(id)
        .then(result => {
            res.render('editService', {
                title: 'Edit service',
                service: result
            });
        })
        .catch(err => console.log(err));
}

const service_edit_one = (req, res) => {

    let times = req.body.availableTimes;

    if (!Array.isArray(times)) {
        times = [times];
    }

    const formattedTimes = times.map(x => ({
        date: new Date(x),
        booked: false
    }));

    const { category, title, description, price, location, img } = req.body;

    Service.findByIdAndUpdate(
        req.params.id,
        {
            category,
            title,
            description,
            price,
            location,
            img,
            availableTimes: formattedTimes
        }
    )
        .then(result => {
            res.redirect('/catalog');
        })
        .catch(e => console.log(e));

};
module.exports = {
    service_index,
    service_catalog,
    service_create_get,
    service_create_post,
    service_get_one,
    service_delete_one,
    service_edit_get,
    service_edit_one
}