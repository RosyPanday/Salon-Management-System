import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const productImageDirectory = "uploads/productImages";

if (!fs.existsSync(productImageDirectory)) {
  fs.mkdirSync(productImageDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, productImageDirectory);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const customFileName = `product_${file.fieldname}_${Date.now()}${ext}`;
    cb(null, customFileName);
  },
});

export const uploadProductImages = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, //5mb limit
}).fields([{ name: "image", maxCount: 1 }]);