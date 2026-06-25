import { Router } from "express";

import { upload as uploadMiddleware }
  from "../utils/storage.js";

import protect from "../middleware/auth.js";

import {
  upload,
  getAll,
  getOne,
  getShared,
  deleteOne,
} from "../controllers/itineraryController.js";

const router = Router();

// Public Route
router.get(
  "/shared/:token",
  getShared
);

// Protected Routes
router.use(protect);

router.get("/", getAll);

router.get("/:id", getOne);

router.post(
  "/upload",
  uploadMiddleware.single("document"),
  upload
);

router.delete(
  "/:id",
  deleteOne
);

export default router;