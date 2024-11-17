require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const authRoute = require("./routes/auth");
const audienceRoute = require("./routes/audience");
const campaignsRoute = require("./routes/campaigns");
const passportStrategy = require("./passport");

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["samarth"],
    maxAge: 24 * 60 * 60 * 1000, // 24hr
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

app.use("/auth", authRoute);
app.use("/audience", audienceRoute);
app.use("/campaigns", campaignsRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
