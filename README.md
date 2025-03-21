# City Suggestions API

This is a RESTful API built with **Express.js** that provides city name suggestions based on a given search term.  
It supports ranking results based on name similarity and user location.

## 🚀 Features
- Search for cities with autocomplete suggestions.
- Scoring system based on **name relevance** and **distance**.
- API response sorted by **highest score**.
- **Unit testing** with Jest & Supertest.

## 📦 Installation
To run the project locally, follow these steps:

1. **Clone the repository:**  
   ```sh
   git clone https://github.com/yourusername/city-suggestions-api.git
   cd city-suggestions-api
   ```

2. **Install dependencies:**  
   ```sh
   npm install
   ```

3. **Run the server:**  
   ```sh
   npm run dev
   ```

4. **Test API using Postman or Browser:**  
   ```bash
   http://localhost:3000/suggestions?q=Toronto
   ```

## 🔥 API Endpoints

### **1. GET `/suggestions`**

**Description:**  
Provides city name suggestions based on a query.

**Query Parameters:**

| Parameter   | Type   | Required | Description |
|------------|--------|----------|-------------|
| `q`        | String | ✅ Yes  | Search term (city name) |
| `latitude` | Float  | ❌ No   | User's latitude (for distance-based scoring) |
| `longitude`| Float  | ❌ No   | User's longitude (for distance-based scoring) |

**Example Request:**

```bash
GET /suggestions?q=Toronto&latitude=43.7&longitude=-79.4
```

**Example Response:**

```json
{
  "suggestions": [
    {
      "name": "Toronto, ON, Canada",
      "latitude": 43.70011,
      "longitude": -79.4163,
      "score": 0.95
    },
    {
      "name": "Toronto, KS, USA",
      "latitude": 37.78893,
      "longitude": -95.94998,
      "score": 0.6
    }
  ]
}
```

## 🧪 Running Tests

To run the unit and API tests, execute:

```sh
npm test
```

If everything works correctly, you should see:

```bash
PASS  tests/cityService.test.js
PASS  tests/suggestions.test.js
```

## 🛠 Technologies Used

- **Node.js** & **Express.js** (Backend)
- **Jest & Supertest** (Testing)
- **fs & readline** (File handling)
- **dotenv** (Environment configuration)

## 👤 Author

- **Your Name**  
- [GitHub](https://github.com/yourusername)  
- [LinkedIn](https://linkedin.com/in/yourname)  

---

🌟 **Happy coding!** 🚀

