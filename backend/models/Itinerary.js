import mongoose from "mongoose";

const itinerarySchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      uploadedFileUrl: {
        type: String,
      },

      extractedText: {
        type: String,
      },

      itinerary: {
        type: Object,
        required: true,
      },

      shareToken: {
        type: String,
        unique: true,
        sparse: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Itinerary = mongoose.model(
  "Itinerary",
  itinerarySchema
);

export default Itinerary;