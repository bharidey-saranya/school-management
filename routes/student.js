const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("select * from students WHERE status='Active'", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});


/// ADD STUDENT
router.post("/", (req, res) => {
  const { name, class: studentclass, roll_no, section, phone } = req.body;

  if (!name || !studentclass || !roll_no || !section || !phone) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const sql =
    "INSERT INTO students (name, class, roll_no, section, phone, status) VALUES (?, ?, ?, ?, ?, 'Active')";
  db.query(
    sql,
    [name, studentclass, roll_no, section, phone],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        message: "Student added successfully",
        id: result.insertId,
      });
    },
  );
});


// ACTIVE AND DEACTIVE STUDENT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { newstatus } = req.body;
  let oldstatus;
  let msg;

  if (!id || !newstatus) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (newstatus == "Active") {
    oldstatus = "Inactive";
    msg = "Student Activated successfully";
  } else {
    oldstatus = "Active";
    msg = "Student Deactivated successfully";
  }
  const sql = "UPDATE students SET status = ? WHERE id = ? AND status =?";

  db.query(sql, [newstatus, id, oldstatus], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.json({ message: "No changes Made" });
    }

    res.json({ message: msg });
  });
});

//  UPDATE STUDENT DETAILS



module.exports = router;
