import express from "express";
import {
  createReservation,
  getReservations,
} from "../controller/reservationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/reserve", authMiddleware, createReservation);
router.get("/my-reservations", authMiddleware, getReservations);

export default router;
