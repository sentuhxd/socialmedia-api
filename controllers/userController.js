const { User, Thought } = require("../models");

module.exports = {
  
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
 
  async getSingleUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
 
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId },{ $set: req.body },{ runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this id" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with ID" });
      }
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "Deleted all Thoughts " });
    } catch (err) {
      res.json(500).json(err);
    }
  },

  async addNewFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId },{ $addToSet: { friends: req.params.friendId } },{ new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this ID " });
      }
      res.json({ message: "New friend added" });
    } catch (err) {
      res.json(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }
      res.json({ message: "removed" });
    } catch (err) {
      res.json(500).json(err);
    }
  },
};