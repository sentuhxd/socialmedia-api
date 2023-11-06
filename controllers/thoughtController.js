const { User, Thought, reactionSchema } = require("../models");

module.exports = {
  
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
 
  async getOneThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: "Not found w this ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate({ _id: req.body.userId },{ $addToSet: { thoughts: thought._id } },{ new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found w this id" });
      }
      res.json("Thought made");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },{ $set: req.body },{ runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "Proper Id not found" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
 
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId,});
      if (!thought) {
        return res
          .status(404)
          .json({ message: "Proper thought id not found" });
      }
      res.json({ message: "Successs" });
    } catch (err) {
      res.json(500).json(err);
    }
  },

 
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({ _id: req.params.userId,},{ $addToSet: { reactions: req.body } },{ new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "Could not find proper id" });
      }
      res.json({ message: "New reaction created" });
    } catch (err) {
      res.json(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        { $pull: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "Proper Id not found" });
      }
      res.json({ message: "new reaction" });
    } catch (err) {
      res.json(500).json(err);
    }
  },
};