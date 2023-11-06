const router = require("express").Router();
const {
  getAllUsers,
  getSingleUserById,
  createUser,
  updateUser,
  deleteUser,
  addNewFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:userid
router.route("/:userId").get(getSingleUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/friendId
router.route("/:userId/friends/:friendId").put(addNewFriend).delete(deleteFriend);
module.exports = router;