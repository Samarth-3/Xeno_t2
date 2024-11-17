const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); 
const Customer = require("../models/Customer"); 
const CommunicationLog = require("../models/CommunicationLog"); 


router.post("/", async (req, res) => {
  const { name, conditions } = req.body;

  try {
    const query = conditions.reduce((acc, condition) => {
      const conditionQuery = {};
      conditionQuery[condition.field] = {
        [condition.operator === ">"
          ? "$gt"
          : condition.operator === "<"
          ? "$lt"
          : condition.operator === ">="
          ? "$gte"
          : condition.operator === "<="
          ? "$lte"
          : "$eq"]: isNaN(condition.value)
          ? condition.value
          : parseFloat(condition.value),
      };

      if (condition.logic === "AND") {
        acc.$and = acc.$and || [];
        acc.$and.push(conditionQuery);
      } else {
        acc.$or = acc.$or || [];
        acc.$or.push(conditionQuery);
      }
      return acc;
    }, {});

    const audienceSize = await Customer.countDocuments(query);

    const newAudienceLog = new CommunicationLog({
      name,
      conditions,
      size: audienceSize,
    });
    await newAudienceLog.save();

    res
      .status(200)
      .json({ size: audienceSize, message: "Audience created successfully!" });
  } catch (err) {
    console.error("Error creating audience:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
