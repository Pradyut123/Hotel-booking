import express from "express";
import { updateUser, deleteUser, getUser, getAllUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/VerifyToken.js";

const router = express.Router();


router.get("/checkauthentication", verifyToken, (req, res, next)=>{
    res.send("hello user, you are logged in")
})

//Update
router.put("/:id", verifyUser, updateUser);
//Delete
router.delete("/:id",verifyUser, deleteUser);
//Get Single Hotel
router.get("/:id",verifyUser, getUser);
//Get All Hotels
router.get("/", verifyAdmin, getAllUser);

export default router
