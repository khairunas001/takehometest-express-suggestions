const CitySuggestionService = require("../services/CitySuggestionService");

// 🔹 Initialize service with data file path
const cityService = new CitySuggestionService("./data/cities_canada-usa.tsv");

// 🔹 Load city data when the server first starts
cityService.loadCities();

// 🔹 Handler API
const getSuggestions = (req, res) => {
  const { q, latitude, longitude } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Query parameter 'q' is required" });
  }

  const results = cityService.searchCities(q, latitude, longitude);
  res.json({ suggestions: results });
};

module.exports = { getSuggestions };
