const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// 1. API ROUTES FIRST
// --------------------
app.use("/api", routes);

// --------------------
// 2. SERVE REACT BUILD
// --------------------
app.use(express.static(path.join(__dirname, "../client/dist")));

// --------------------
// 3. SPA FALLBACK LAST
// --------------------
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

// --------------------
// DB + SERVER
// --------------------
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
