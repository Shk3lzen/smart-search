const searchModel = require('../models/searchModel');

exports.extractEntities = async (req, res) => {
  const searchTerm = req.query.search;
  try {
    const entities = await searchModel.extractEntities(searchTerm);
    res.status(200).json(entities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};