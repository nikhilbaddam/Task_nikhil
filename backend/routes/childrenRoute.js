const express = require('express');
const { getChildrenOverview,registerChild,getChildrenEnrollments } = require('../controllers/childrenController');
const router = express.Router();



router.post('/childreg',registerChild);
router.get('/childview', getChildrenOverview);
router.get('/enrollments',getChildrenEnrollments);

module.exports = router;
