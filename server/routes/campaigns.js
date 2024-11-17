const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");
const CommunicationLog = require("../models/CommunicationLog");
const Customer = require("../models/Customer");


router.post("/send-messages", async (req, res) => {
  const { audienceId } = req.body;

  try {
    const audience = await CommunicationLog.findById(audienceId);
    if (!audience) {
      return res.status(404).json({ error: "Audience not found" });
    }

    const messages = [];
    audience.conditions.forEach((condition) => {
      messages.push({
        content: `Hi ${condition.name}, here’s 10% off on your next order!`,
        status: Math.random() < 0.9 ? "SENT" : "FAILED", // 90% SENT, 10% FAILED
      });
    });

    // Save messages
    audience.messages = messages;
    await audience.save();

    res.status(200).json({ message: "Messages sent successfully!" });
  } catch (error) {
    console.error("Error sending messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





module.exports = router;
