const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const router = express.Router();
// const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Routes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const User = require("./model/User");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

app.use(Routes);
app.use("/profile", profileRoutes);

app.get("/allData", async (req, res) => {
  const data = await User.find().select("-password");
  res.json(data);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
