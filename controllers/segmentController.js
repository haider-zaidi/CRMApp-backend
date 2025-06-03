
// const Segment = require('../models/Segment');
// const Customer = require('../models/Customer');

// // Helper: Map rule `type` to actual Customer schema field
// function getFieldForType(type) {
//   switch (type) {
//     case 'totalSpend': return 'totalSpend';
//     case 'visits': return 'visits';
//     case 'lastActive': return 'lastActive'; // Adjust based on your schema
//     default: return null;
//   }
// }

// function buildQueryFromRule(rule, userId) {
//   const { logicType = 'and', conditions = [] } = rule;

//   const logicOp = logicType.toLowerCase() === 'or' ? '$or' : '$and';
//   const operatorMap = {
//     'is': '$eq',
//     'equals': '$eq',
//     'not equals': '$ne',
//     'greater than': '$gt',
//     'less than': '$lt',
//   };

//   const conditionQueries = conditions.map(c => {
//     const mongoOp = operatorMap[c.operator?.toLowerCase()];
//     const field = getFieldForType(c.type);
//     if (!mongoOp || !field) return {};

//     let value = c.value;

//     if (c.type === 'lastActive') {
//       const daysAgo = Number(value);
//       if (isNaN(daysAgo)) return {};
//       const date = new Date();
//       date.setDate(date.getDate() - daysAgo);
//       value = date;
//     } else {
//       // Parse as number for numeric fields
//       value = Number(value);
//       if (isNaN(value)) return {};
//     }

//     return { [field]: { [mongoOp]: value } };
//   });

//   // Filter out invalid empty queries
//   const filteredConditions = conditionQueries.filter(q => Object.keys(q).length > 0);

//   return {
//     user: userId,
//     [logicOp]: filteredConditions
//   };
// }

// const addSegment = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { name, rule } = req.body;

//     if (!name || !rule || !Array.isArray(rule.conditions)) {
//       return res.status(400).json({ message: 'Invalid input format' });
//     }

//     const segment = new Segment({
//       name,
//       rule,
//       user: userId
//     });

//     await segment.save();
//     res.status(201).json({ message: 'Segment created', segment });
//   } catch (err) {
//     console.error('Add Segment Error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getSegments = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const segments = await Segment.find().sort({ createdAt: -1 });
//     res.json(segments);
//   } catch (err) {
//     console.error('Get Segments Error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getSegmentById = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { id } = req.params;
//     const segment = await Segment.findOne({ _id: id});

//     if (!segment) {
//       return res.status(404).json({ message: 'Segment not found' });
//     }

//     res.json(segment);
//   } catch (err) {
//     console.error('Get Segment By ID Error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };


// // Preview Segment Audience
// const previewSegmentAudience = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { rule } = req.body;

//     if (!rule || !Array.isArray(rule.conditions)) {
//       return res.status(400).json({ message: 'Invalid rule format' });
//     }

//     const filter = buildQueryFromRule(rule);
//     // console.log(JSON.stringify(filter, null, 2));

//     const count = await Customer.countDocuments(filter);

//     res.json({ count });
//   } catch (err) {
//     console.error('Preview Audience Error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = {
//   addSegment,
//   getSegments,
//   getSegmentById,
//   previewSegmentAudience
// };



// const Segment = require('../models/Segment');
// const Customer = require('../models/Customer');

// function getFieldForType(type) {
//   switch (type) {
//     case 'totalSpend': return 'totalSpend';
//     case 'visits': return 'visits';
//     case 'lastActive': return 'lastActive'; // Adjust based on your schema
//     default: return null;
//   }
// }

// function buildQueryFromRule(rule, userId) {
//   const { logicType = 'and', conditions = [] } = rule;

//   const logicOp = logicType.toLowerCase() === 'or' ? '$or' : '$and';
//   const operatorMap = {
//     'is': '$eq',
//     'equals': '$eq',
//     'not equals': '$ne',
//     'greater than': '$gt',
//     'less than': '$lt',
//   };

//   const conditionQueries = conditions.map(c => {
//     const mongoOp = operatorMap[c.operator?.toLowerCase()];
//     const field = getFieldForType(c.type);
//     if (!mongoOp || !field) return {};

//     let value = c.value;

//     if (c.type === 'lastActive') {
//       const daysAgo = Number(value);
//       if (isNaN(daysAgo)) return {};
//       const date = new Date();
//       date.setDate(date.getDate() - daysAgo);
//       value = date;
//     } else {
//       // Parse as number for numeric fields
//       value = Number(value);
//       if (isNaN(value)) return {};
//     }

//     return { [field]: { [mongoOp]: value } };
//   });

//   // Filter out invalid empty queries
//   const filteredConditions = conditionQueries.filter(q => Object.keys(q).length > 0);

//   return {
//     user: userId,
//     [logicOp]: filteredConditions
//   };
// }

// const addSegment = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { name, rule } = req.body;

//     if (!name || !rule || !Array.isArray(rule.conditions)) {
//       return res.status(400).json({ message: 'Invalid input format' });
//     }

//     const query = buildQueryFromRule(rule,userId);
//     const count = await Customer.countDocuments(query,userId);

//     const segment = new Segment({
//       name,
//       rule,
//       previewSize: count,
//       user: userId
//     });

//     await segment.save();
//     res.status(201).json({ message: 'Segment created', segment });
//   } catch (err) {
//     console.error('Add Segment Error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getSegments = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const segments = await Segment.find().sort({ createdAt: -1 });
//     res.json(segments);
//   } catch (err) {
//     console.error('Get Segments Error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getSegmentById = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { id } = req.params;
//     const segment = await Segment.findOne({ _id: id});

//     if (!segment) {
//       return res.status(404).json({ message: 'Segment not found' });
//     }

//     res.json(segment);
//   } catch (err) {
//     console.error('Get Segment By ID Error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const previewSegmentAudience = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { rule } = req.body;

//     if (!rule || !Array.isArray(rule.conditions)) {
//       return res.status(400).json({ message: 'Invalid rule format' });
//     }

//     const filter = buildQueryFromRule(rule,userId);
//     const count = await Customer.countDocuments(filter);

//     res.json({ count });
//   } catch (err) {
//     console.error('Preview Audience Error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = {
//   addSegment,
//   getSegments,
//   getSegmentById,
//   previewSegmentAudience
// };


const Segment = require('../models/Segment');
const Customer = require('../models/Customer');

// Helper: Map rule `type` to actual Customer schema field
function getFieldForType(type) {
  switch (type) {
    case 'totalSpend': return 'totalSpend';
    case 'visits': return 'visits';
    case 'lastActive': return 'lastActive';
    default: return null;
  }
}

// Build MongoDB query from rule — WITHOUT userId
function buildQueryFromRule(rule) {
  const { logicType = 'and', conditions = [] } = rule;

  const logicOp = logicType.toLowerCase() === 'or' ? '$or' : '$and';
  const operatorMap = {
    'is': '$eq',
    'equals': '$eq',
    'not equals': '$ne',
    'greater than': '$gt',
    'less than': '$lt',
  };

  const conditionQueries = conditions.map(c => {
    const mongoOp = operatorMap[c.operator?.toLowerCase()];
    const field = getFieldForType(c.type);
    if (!mongoOp || !field) return {};

    let value = c.value;

    if (c.type === 'lastActive') {
      const daysAgo = Number(value);
      if (isNaN(daysAgo)) return {};
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      value = date;
    } else {
      value = Number(value);
      if (isNaN(value)) return {};
    }

    return { [field]: { [mongoOp]: value } };
  });

  const filteredConditions = conditionQueries.filter(q => Object.keys(q).length > 0);
  return {
    [logicOp]: filteredConditions
  };
}

// Add Segment and store previewSize
const addSegment = async (req, res) => {
  try {
    const userId = req.user._id; // for ownership
    const { name, rule } = req.body;

    if (!name || !rule || !Array.isArray(rule.conditions)) {
      return res.status(400).json({ message: 'Invalid input format' });
    }

    const filter = buildQueryFromRule(rule);
    const previewSize = await Customer.countDocuments(filter);

    const segment = new Segment({
      name,
      rule,
      previewSize,
      user: userId,
    });

    await segment.save();
    res.status(201).json({ message: 'Segment created', segment });
  } catch (err) {
    console.error('Add Segment Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all segments
const getSegments = async (req, res) => {
  try {
    const segments = await Segment.find().sort({ createdAt: -1 });
    res.json(segments);
  } catch (err) {
    console.error('Get Segments Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single segment by ID
const getSegmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const segment = await Segment.findById(id);

    if (!segment) {
      return res.status(404).json({ message: 'Segment not found' });
    }

    res.json(segment);
  } catch (err) {
    console.error('Get Segment By ID Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Preview audience count before saving
const previewSegmentAudience = async (req, res) => {
  try {
    const { rule } = req.body;

    if (!rule || !Array.isArray(rule.conditions)) {
      return res.status(400).json({ message: 'Invalid rule format' });
    }

    const filter = buildQueryFromRule(rule);
    const count = await Customer.countDocuments(filter);

    res.json({ count });
  } catch (err) {
    console.error('Preview Audience Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  addSegment,
  getSegments,
  getSegmentById,
  previewSegmentAudience
};
