var express = require('express');
var router = express.Router();

var book_controller = require('../controllers/bookController');


router.post('/api/add/', book_controller.add);
router.delete('/api/delete/', book_controller.delete)

router.get('/', function(req, res) {
    res.render('booking');
})

module.exports = router;