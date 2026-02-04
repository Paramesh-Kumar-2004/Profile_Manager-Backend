import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "video") {
            cb(null, "public/uploads/videos");
        }
        else if (file.fieldname === "thumbnail") {
            cb(null, "public/uploads/thumbnails");
        }
        else if (file.fieldname === "profile") {
            cb(null, "public/uploads/profiles")
        }
        else {
            cb(new Error("Invalid file field"));
        }
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + "-" + file.originalname);
    }
});

// File type validation
const fileFilter = (req, file, cb) => {

    // Video Validation
    if (file.fieldname === "video") {
        if (file.mimetype.startsWith("video/")) {
            cb(null, true);
        } else {
            cb(new Error("Only video files are allowed for video field"), false);
        }
    }

    // Thumbnail Validation
    else if (file.fieldname === "thumbnail") {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed for thumbnail field"), false);
        }
    }

    // Hub Profile Validation
    else if (file.fieldname === "profile") {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed for profile field"), false);
        }
    }

    else {
        cb(new Error("Invalid file field"), false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    // limits: {
    //     fileSize: 500 * 1024 * 1024 // 500MB
    // }
});