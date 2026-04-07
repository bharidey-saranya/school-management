const mysql = require("mysql2");

// Create connection
const db = mysql.createConnection({
  host: "localhost",      // XAMPP default
  user: "root",           // XAMPP default
  password: "",           // If you set a password, put it here
  database: "school_management"  // Your DB name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database ✅");
  }
});

module.exports = db;