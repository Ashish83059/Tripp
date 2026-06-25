import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";

// Extract text from PDF
const extractFromPDF = async (
  filePath
) => {
  const buffer =
    fs.readFileSync(filePath);

  const data = await pdfParse(
    buffer
  );

  return data.text;
};

// Extract text from image using OCR
const extractFromImage = async (
  filePath
) => {
  const {
    data: { text },
  } = await Tesseract.recognize(
    filePath,
    "eng"
  );

  return text;
};

export const extractText =
  async (file) => {
    // Local uploads
    const filePath =
      file.path || file.location;

    const ext = path
      .extname(file.originalname)
      .toLowerCase();

    if (ext === ".pdf") {
      return extractFromPDF(
        filePath
      );
    }

    if (
      [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
      ].includes(ext)
    ) {
      return extractFromImage(
        filePath
      );
    }

    return "";
  };