const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  audienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CommunicationLog", 
    required: true,
  },
  audienceSize: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Campaign", campaignSchema);
