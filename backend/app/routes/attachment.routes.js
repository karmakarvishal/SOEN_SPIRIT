const attachmentController = require("../controllers/attachment.controller");
const { body, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const multer = require("multer");
const fs = require("fs");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.get(
        "/api/attachment/:attachment_id",
      attachmentController.retrieve
    );


    app.use(auth.verifyToken);

    // The 405 handler
    const methodNotAllowed = (req, res, next) =>
        res.status(405).json({ statusText: "Method not supported" });

    const attachment = "/api/attachment";
    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        const dir = "uploads/";
        !fs.existsSync(dir) && fs.mkdirSync(dir);
        callback(null, "uploads/");
      },
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        let ext = file.originalname.lastIndexOf(".");
        ext = file.originalname.substr(ext + 1);
        callback(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
      },
    });
    const upload = multer({ storage });

    app.post(
        attachment,
        upload.single("file"),
      attachmentController.upload
    );
    app.all(attachment, methodNotAllowed);
};
