const User = require("../model/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // res.status(200).json({ user });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateProfile = async (req, res) => {
  const { address, places, language } = req.body;
  const profileFields = { address, places, language };

  try {
    let user = await User.findById(req.user.id);

    if (user) {
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: profileFields },
        { new: true }
      );
      return res.json(user);
    }

    res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let user = await User.findById(req.user.id);
    if (user) {
      user.profileImage = req.file.path;
      await user.save();
      return res.json({ message: "Image uploaded successfully", user });
    }

    res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
