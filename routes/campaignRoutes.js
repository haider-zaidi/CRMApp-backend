// const express = require('express');
// const router = express.Router();
// const { addCampaign, getCampaigns, getStats } = require('../controllers/campaignController');
// const authenticateUser = require('../utils/authMiddleware');


// router.post('/', authenticateUser, addCampaign);
// router.get('/', authenticateUser, getCampaigns);
// router.get('/stats', authenticateUser, getStats);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { sendCampaign, getCampaigns } = require('../controllers/campaignController');
const authenticateUser = require('../utils/authMiddleware');
const {getSuggestions}=require('../controllers/campaignController');

// POST /api/campaigns/send
router.post('/send', authenticateUser, sendCampaign);

// GET /api/campaigns
router.get('/', authenticateUser, getCampaigns);

router.post('/aiSuggestions',getSuggestions);

module.exports = router;
