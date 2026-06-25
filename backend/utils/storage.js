import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(
  import.meta.url
);

const __dirname = path.dirname(
  __filename
);

// Local Storage Setup
const storage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      const uploadDir =
        path.join(
          __dirname,
          "../uploads"
        );

      if (
        !fs.existsSync(uploadDir)
      ) {
        fs.mkdirSync(
          uploadDir,
          {
            recursive: true,
          }
        );
      }

      cb(null, uploadDir);
    },

    filename: (
      req,
      file,
      cb
    ) => {
      const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(
        file.originalname
      )}`;

      cb(null, uniqueName);
    },
  });

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only PDF, JPG, PNG and WEBP files are allowed"
      ),
      false
    );
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize:
      10 * 1024 * 1024,
  },
});

export const getFileUrl = (
  req,
  file
) => {
  return `${req.protocol}://${req.get(
    "host"
  )}/uploads/${file.filename}`;
};