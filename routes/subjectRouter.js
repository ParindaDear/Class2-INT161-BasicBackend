var express = require('express');
var router = express.Router();
const controller = require('../controllers/subjectController');

router.get('/', controller.list);
router.get('/:id', controller.get);
router.post('/', controller.create)

module.exports = router;