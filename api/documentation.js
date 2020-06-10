var bll     = require('../bll/bll');
var router  = require('express').Router();

router.use(function timeLog(req, res, next) {
    next();
});

router.post('/get', (req, res) => {
    var myModule = new bll.module();
    myModule.documentation.get(req, res);
});

router.post('/list', (req, res) => {
    var myModule = new bll.module();
    myModule.documentation.list(req, res);
});

module.exports = router;