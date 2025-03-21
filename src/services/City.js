class City {
    constructor(name, latitude, longitude) {
      this.name = name;
      this.latitude = parseFloat(latitude);
      this.longitude = parseFloat(longitude);
    }
  }
  
  module.exports = City;