const express = require("express");
const { createSingleUser, upload, getAllUsers, getSingleUser, deleteSingleUser, updateSingleUser } = require("../Controllers/UserController");
const router = express.Router();

router.use(express.urlencoded({extended:true}));
router.use(express.json());
router.use("/images",express.static("Images"));

// create single user 
router.post("/create/single/user",upload.single("image"),createSingleUser);
// get all user 
router.get("/get/all/users",getAllUsers);
// get single user 
router.get("/get/single/user/:email",getSingleUser);
// remove single user 
router.delete("/delete/single/user/:email",deleteSingleUser);
// update single user 
router.patch("/update/single/user/:email",upload.single("image"),updateSingleUser);

module.exports = router;