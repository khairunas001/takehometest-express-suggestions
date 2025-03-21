const fs = require("fs");
const readline = require("readline");
const City = require("./City");

class CitySuggestionService {
  constructor(filePath) {
    this.filePath = filePath;
    this.cities = [];
  }

  // 🔹 Load data when the server is first started
  async loadCities() {
    const fileStream = fs.createReadStream(this.filePath);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    let isFirstLine = true;
    for await (const line of rl) {
      if (isFirstLine) {
        isFirstLine = false;
        continue; // Lewati header
      }

      const columns = line.split("\t");
      if (columns.length >= 6) {
        this.cities.push(new City(columns[1], columns[4], columns[5]));
      }
    }
    console.log(`✅ Loaded ${this.cities.length} cities into memory.`);
  }

  // 🔹 Calculate name similarity with query
  calculateNameScore(cityName, query) {
    const lowerName = cityName.toLowerCase();
    const lowerQuery = query.toLowerCase();

    if (lowerName === lowerQuery) return 1;
    if (lowerName.startsWith(lowerQuery)) return 0.9;
    if (lowerName.includes(lowerQuery)) return 0.7;
    return 0.3;
  }

  // 🔹 Calculate score based on location distance (Haversine formula)
  calculateDistanceScore(cityLat, cityLon, userLat, userLon) {
    if (!userLat || !userLon) return 1;

    const R = 6371; // Radius bumi dalam km
    const dLat = (userLat - cityLat) * (Math.PI / 180);
    const dLon = (userLon - cityLon) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(cityLat * (Math.PI / 180)) * Math.cos(userLat * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 

    return Math.max(0, 1 - distance / 5000);
  }

  // 🔹 Search cities based on query & calculate score
  searchCities(query, latitude, longitude) {
    const userLat = latitude ? parseFloat(latitude) : null;
    const userLon = longitude ? parseFloat(longitude) : null;

    return this.cities
      .map(city => {
        const nameScore = this.calculateNameScore(city.name, query);
        const distanceScore = this.calculateDistanceScore(city.latitude, city.longitude, userLat, userLon);
        const finalScore = ((nameScore * 0.7) + (distanceScore * 0.3)).toFixed(2);

        return {
          name: city.name,
          latitude: city.latitude,
          longitude: city.longitude,
          score: parseFloat(finalScore),
        };
      })
      .filter(city => city.score > 0.3)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Limit only the best 10 results
  }
}

module.exports = CitySuggestionService;
