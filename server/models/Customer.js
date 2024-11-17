const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  spending: Number,
  visits: Number,
  lastVisit: Date,
});

module.exports = mongoose.model("Customer", customerSchema);
