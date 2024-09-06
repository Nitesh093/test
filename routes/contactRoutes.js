const express = require('express');
const router = express.Router();
const { createContact,imageUpload } = require('../controllers/contactController');

// POST /contact-us
router.post('/contact-us', createContact);

router.post('/uploadImage',imageUpload)
module.exports = router;
