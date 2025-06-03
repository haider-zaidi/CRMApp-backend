const Campaign = require('../models/Campaign');
const Segment = require('../models/Segment');
const Customer = require('../models/Customer');
const nodemailer = require('nodemailer');
const {generateEmailTemplate}=require('../services/aiService')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendCampaign = async (req, res) => {
  const { name, message, segmentId } = req.body;
  // const userId = req.headers['x-user-id'];
  const userId = req.user._id;

  try {
    const segment = await Segment.findById(segmentId);
    if (!segment) return res.status(404).json({ error: 'Segment not found' });

    const logicType = segment.rule?.logicType || 'AND';
    const conditions = segment.rule?.conditions || [];

    const query = {};

    if (conditions.length > 0) {
      const conditionQueries = conditions.map(cond => {
        const field = cond.type;
        const operator = cond.operator;
        const value = cond.value;

        let condition = {};
        switch (operator) {
          case 'equals':
            condition[field] = value;
            break;
          case 'greater than':
            condition[field] = { $gt: Number(value) };
            break;
          case 'less than':
            condition[field] = { $lt: Number(value) };
            break;
        }
        return condition;
      });

      query[`$${logicType.toLowerCase()}`] = conditionQueries;
    }

    const customers = await Customer.find(query);

    let sent = 0;
    let failed = 0;

    for (const customer of customers) {
      const personalizedMsg = `Hi ${customer.name}, ${message}`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customer.email,
        subject: name,
        text: personalizedMsg,
      };

      try {
        await transporter.sendMail(mailOptions);
        sent++;
      } catch (err) {
        console.error(`Failed to send to ${customer.email}`, err);
        failed++;
      }
    }

    const campaign = await Campaign.create({
      user: userId,
      name,
      message,
      segment: segment._id,
      audienceSize: customers.length,
      sent,
      failed,
      status: 'sent',
    });

    res.status(201).json(campaign);
  } catch (err) {
    console.error('Send Campaign Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getCampaigns = async (req, res) => {
  const userId = req.user._id;

  try {
    const campaigns = await Campaign.find({ user: userId }).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    console.error('Get Campaigns Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getSuggestions = async (req, res) => {
  try {
    const { campaignName } = req.body;
    const suggestions = await generateEmailTemplate(campaignName);
    res.json({ suggestions });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
};

module.exports = {
  sendCampaign,
  getCampaigns,
  getSuggestions
};



// const Campaign = require('../models/Campaign');
// const Segment = require('../models/Segment');
// const Customer = require('../models/Customer');
// const nodemailer = require('nodemailer');
// const { generateEmailTemplate } = require('../services/aiService');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendCampaign = async (req, res) => {
//   const { name, message, segmentId } = req.body;
//   const userId = req.user._id;
//   console.log(userId)

//   try {
//     const segment = await Segment.findById(segmentId);
//     if (!segment) return res.status(404).json({ error: 'Segment not found' });

//     const logicType = segment.rule?.logicType || 'AND';
//     const conditions = segment.rule?.conditions || [];

//     const query = { user: userId };

//     if (conditions.length > 0) {
//       const conditionQueries = conditions.map(cond => {
//         const field = cond.type;
//         const operator = cond.operator;
//         const value = cond.value;

//         let condition = {};
//         switch (operator) {
//           case 'equals':
//             condition[field] = value;
//             break;
//           case 'greater than':
//             condition[field] = { $gt: Number(value) };
//             break;
//           case 'less than':
//             condition[field] = { $lt: Number(value) };
//             break;
//         }
//         return condition;
//       });

//       query[`$${logicType.toLowerCase()}`] = conditionQueries;
//     }

//     const customers = await Customer.find(query);

//     let sent = 0;
//     let failed = 0;

//     for (const customer of customers) {
//       const personalizedMsg = `Hi ${customer.name}, ${message}`;
//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: customer.email,
//         subject: name,
//         text: personalizedMsg,
//       };

//       try {
//         await transporter.sendMail(mailOptions);
//         sent++;
//       } catch (err) {
//         console.error(`Failed to send to ${customer.email}`, err);
//         failed++;
//       }
//     }

//     const campaign = await Campaign.create({
//       user: userId,
//       name,
//       message,
//       segment: segment._id,
//       audienceSize: customers.length,
//       sent,
//       failed,
//       status: 'sent',
//     });

//     res.status(201).json(campaign);
//   } catch (err) {
//     console.error('Send Campaign Error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getCampaigns = async (req, res) => {
//   const userId = req.user._id;

//   try {
//     const campaigns = await Campaign.find({ user: userId }).sort({ createdAt: -1 });
//     res.json(campaigns);
//   } catch (err) {
//     console.error('Get Campaigns Error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getSuggestions = async (req, res) => {
//   try {
//     const { campaignName } = req.body;
//     const suggestions = await generateEmailTemplate(campaignName);
//     res.json({ suggestions });
//   } catch (error) {
//     console.error('Error generating suggestions:', error);
//     res.status(500).json({ error: 'Failed to generate suggestions' });
//   }
// };

// module.exports = {
//   sendCampaign,
//   getCampaigns,
//   getSuggestions
// };
