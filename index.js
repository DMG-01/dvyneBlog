const express = require("express");
const path = require("path"); // Import the 'path' module
const connectDB = require("./db/connect");
require("dotenv").config();
const app = express();

const blogsRoute = require("./routes/blog");
const adminRoute = require("./routes/adminRoute");
const authRoute = require("./routes/auth");
const adminAuthenticate = require("./middleware/adminAuthentication");

app.use(express.static('./public'));
app.use(express.json());

// API routes
app.use("/api/v1/blog", blogsRoute);
app.use("/api/v1/admin", adminAuthenticate, adminRoute);
app.use("/api/v1/auth", authRoute);

// If no API routes match, serve the HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html")); // Use 'path' to construct the file path
});

const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log(`app is listening on port 3000`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
