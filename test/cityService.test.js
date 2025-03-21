const CitySuggestionService = require("../src/services/CitySuggestionService");

describe("CitySuggestionService", () => {
  let cityService;

  beforeAll(() => {
    cityService = new CitySuggestionService();
    cityService.cities = [
      { name: "Toronto, ON, Canada", latitude: 43.70011, longitude: -79.4163 },
      { name: "Toronto, KS, USA", latitude: 37.78893, longitude: -95.94998 },
      { name: "New York, NY, USA", latitude: 40.7128, longitude: -74.006 },
    ];
  });

  test("Search cities based on query", () => {
    const results = cityService.searchCities("Toronto");
    expect(results.length).toBeGreaterThanOrEqual(2);
    expect(results[0].name).toContain("Toronto");
  });  

  test("Calculate name similarity score", () => {
    expect(cityService.calculateNameScore("Toronto", "Tor")).toBe(0.9);
    expect(cityService.calculateNameScore("Toronto", "Toronto")).toBe(1);
    expect(cityService.calculateNameScore("Toronto", "New York")).toBe(0.3);
  });

  test("Calculate distance score (closer = higher score)", () => {
    const score1 = cityService.calculateDistanceScore(43.7, -79.4, 43.7, -79.4);
    const score2 = cityService.calculateDistanceScore(43.7, -79.4, 37.8, -95.9);
    expect(score1).toBeCloseTo(1, 1);
    expect(score2).toBeLessThan(score1);
  });
});
