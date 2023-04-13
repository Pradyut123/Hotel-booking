import express from "express";
const router = express.Router();
import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotel, countByCity, countByType, getHotelRooms } from "../controllers/hotel.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/VerifyToken.js";
import { get } from "mongoose";
import { updateRoomAvailability } from "../controllers/room.js";

//Create
router.post("/", verifyAdmin, createHotel);
//Update
router.put("/:id", verifyAdmin, updateHotel);
router.put("/availability/:id", updateRoomAvailability);
//Delete
router.delete("/:id",verifyAdmin, deleteHotel);
//Get Single Hotel
router.get("/find/:id", getHotel);
//Get All Hotels
router.get("/", getAllHotel);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router
