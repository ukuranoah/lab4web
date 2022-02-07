const express = require('express');
const router = express.Router();


const routeHome = router.route('/');

routeHome.get(((req, res) => {
    res.render('index');
}));

routeHome.post((async (req, res) => {
    if (req.body.grid) {
        res.render('index', req.body);
    } else {
        res.redirect('error');
    }
}));



router.route('*').get(((req, res) => {
    res.render('error');
}));


module.exports = router;