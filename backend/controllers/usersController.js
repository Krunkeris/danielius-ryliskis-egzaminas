const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

const blockOrUnblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status === "accepted") {
      user.status = "blocked";
    } else {
      user.status = "accepted";
    }

    await user.save();

    return res
      .status(200)
      .json({ message: `User is now ${user.status}`, user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  blockOrUnblockUser,
};
