const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();
dns.setServers(['8.8.8.8', '8.8.4.4']);   // ← the fix

const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("Connection error:", err));

const companySchema = new mongoose.Schema({
  name: String,
  minCgpa: Number,
  allowedBranches:[String],
  maxBacklogs:Number
});

const Company = mongoose.model("Company", companySchema);


console.log("Setting up routes now...");

app.get("/", (req, res) => {
  res.send("Placement backend is running!");
});

app.post("/add-company", async (req, res) => {
  try {
        const { name, minCgpa, allowedBranches, maxBacklogs } = req.body;

    if (!name || minCgpa == null || !allowedBranches || maxBacklogs == null) {
      return res.status(400).json({ error: "All fields are required." });
    }
    if (minCgpa < 0 || minCgpa > 10) {
      return res.status(400).json({ error: "CGPA must be between 0 and 10." });
    }
    const existing = await Company.findOne({ name: req.body.name });
    if (existing) {
      return res.status(400).json({ error: "Company already exists" });
    }
    const newCompany = new Company(req.body);   // create a new document using your schema
    await newCompany.save();                     // save it to MongoDB
    res.json({ message: "Company added successfully!", company: newCompany });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/check-eligibility", async (req, res) => {
  try {
    const studentCgpa = Number(req.query.cgpa);
    const studentBranch = req.query.branch.toUpperCase();
    const studentBacklogs = Number(req.query.backlogs);
    if (!req.query.cgpa || isNaN(studentCgpa) || studentCgpa < 0 || studentCgpa > 10) {
      return res.status(400).json({ error: "Please enter a valid CGPA between 0 and 10." });
    }
    if (!studentBranch) {
      return res.status(400).json({ error: "Branch is required." });
    }
    if (req.query.backlogs === undefined || isNaN(studentBacklogs) || studentBacklogs < 0) {
      return res.status(400).json({ error: "Please enter a valid number of backlogs (0 or more)." });
    }
    console.log("Student :", studentCgpa, studentBranch ,studentBacklogs);

    const eligible = await Company.find({ 
      minCgpa: { $lte: studentCgpa },
      allowedBranches: { $regex: new RegExp(`^${studentBranch}$`, "i") },
      maxBacklogs : {$gte : studentBacklogs} });
    res.json(eligible);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});