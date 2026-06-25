import { v4 as uuidv4 } from "uuid";
import Itinerary from "../models/Itinerary.js";
import { extractText } from "../utils/extractor.js";
import { generateItinerary } from "../utils/aiService.js";
import { getFileUrl } from "../utils/storage.js";

export const upload = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({
        message: "No file uploaded",
      });

    const fileUrl = getFileUrl(
      req,
      req.file
    );

    const extractedText =
      await extractText(req.file);

    if (
      !extractedText ||
      extractedText.trim().length < 20
    ) {
      return res.status(400).json({
        message:
          "Could not extract enough text from the document. Please upload a clearer file.",
      });
    }

    const itineraryData =
      await generateItinerary(
        extractedText
      );

    const itinerary =
      await Itinerary.create({
        user: req.user._id,
        title:
          itineraryData.title ||
          "My Trip",
        uploadedFileUrl: fileUrl,
        extractedText,
        itinerary: itineraryData,
        shareToken: uuidv4(),
      });

    res.status(201).json({
      itinerary,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message:
        err.message ||
        "Failed to process document",
    });
  }
};

export const getAll = async (
  req,
  res
) => {
  try {
    const itineraries =
      await Itinerary.find({
        user: req.user._id,
      })
        .sort({
          createdAt: -1,
        })
        .select("-extractedText");

    res.json({
      itineraries,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getOne = async (
  req,
  res
) => {
  try {
    const itinerary =
      await Itinerary.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!itinerary)
      return res.status(404).json({
        message:
          "Itinerary not found",
      });

    res.json({
      itinerary,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getShared = async (
  req,
  res
) => {
  try {
    const itinerary =
      await Itinerary.findOne({
        shareToken:
          req.params.token,
      }).select("-extractedText");

    if (!itinerary)
      return res.status(404).json({
        message:
          "Itinerary not found",
      });

    res.json({
      itinerary,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteOne = async (
  req,
  res
) => {
  try {
    await Itinerary.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    res.json({
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};