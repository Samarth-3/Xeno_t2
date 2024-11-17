const mongoose = require("mongoose");

const communicationLogSchema = new mongoose.Schema({
  audienceName: String,
  conditions: Array,
  messages: [
    {
      content: String,
      status: String,
    },
  ],
});

module.exports = mongoose.model("CommunicationLog", communicationLogSchema);
