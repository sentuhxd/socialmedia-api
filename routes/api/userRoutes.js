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

router.route("/").get(getAllUsers).post(createUser);

router.route("/:userId").get(getSingleUserById).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").put(addNewFriend).delete(deleteFriend);
module.exports = router;