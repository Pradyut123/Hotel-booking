import express from "express";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom } from "../controllers/room.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/VerifyToken.js";
const router = express.Router();

//Create
router.post("/:hotelid", verifyAdmin, createRoom);
//Update
router.put("/:id", verifyAdmin,  updateRoom);
//Delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//Get Single Hotel
router.get("/:id", getRoom);
//Get All Hotels
router.get("/", getAllRoom);

export default router
