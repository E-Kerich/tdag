const express = require('express');
const router = express.Router();
const upload = require('../../middleware/upload.middleware');
const { uploadFile } = require('../../controllers/admin/upload.controller');
const { protect } = require('../../middleware/auth.middleware');

router.use(protect);

// single file upload
router.post('/', upload.single('file'), uploadFile);

module.exports = router;
