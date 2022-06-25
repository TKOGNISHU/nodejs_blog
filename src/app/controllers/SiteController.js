const Course = require('../models/Course');

class SiteController {
    // [get] /
    index(req, res) {
        Course.find({}, function (err, course) {
            if (!err) {
                res.json(course);
            } else {
                res.status.json(err);
            }
        });
    }

    // [get] /search
    show(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
