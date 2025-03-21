const express = require("express");
const cors = require("cors");
const suggestionRoutes = require("./routes/suggestions");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/suggestions", suggestionRoutes);

if (process.env.NODE_ENV !== "test") { 
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
