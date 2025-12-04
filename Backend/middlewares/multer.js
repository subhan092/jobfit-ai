import multer from "multer";

const storage = multer.memoryStorage(); // File RAM me store hogi
const upload = multer({ storage: storage });

export const uploadSingle  = upload.single("file")