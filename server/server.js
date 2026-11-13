const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. API routes
app.use("/api", routes);

// 2. API fallback
app.use("/api", (req, res) => {
  res.status(404).json({
    message: "API endpoint not found.",
  });
});

// 3. Serve React production build
app.use(express.static(path.join(__dirname, "../client/dist")));

// 4. React SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

// 5. Connect database and start server
sequelize
  .authenticate()
  .then(() => {
    console.log("PostgreSQL connected successfully.");

    return sequelize.sync({ force: false });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to database:", error);
    process.exit(1);
  });
