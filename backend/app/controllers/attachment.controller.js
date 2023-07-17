const db = require("../models");


exports.upload = async (req, res) => {
    const fileDetails = req.file;
    try {
        const attachment = await db.attachment.create({
            original_file_name: fileDetails.originalname,
            uploaded_file_name: fileDetails.filename,
            uploaded_path: fileDetails.destination,
            mime: fileDetails.mimetype,
            extension: fileDetails.originalname.split('.').pop(),
            uploaded_by_user_id: req.payload.id
        });
        res.status(200).json({attachment_id: attachment.dataValues.id});
    } catch (e) {
        console.log(e);
        res.status(500).json({ statusText: "Internal server error occured" });
    }
}

exports.retrieve = async (req, res) => {

    try {
        const attachmentId = req.params.attachment_id;

        const attachment = await db.attachment.findOne({
            where: {
                id: attachmentId
            }
        });
        if (attachment == null) {
            res
            .status(403)
            .json({ statusText: "File not found." });
            return;
        }
        const file = `${__dirname}/../../uploads/${attachment.dataValues.uploaded_file_name}`;
        res.download(file, (err) => {
            if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Error downloading file');
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ statusText: "Internal server error occured" });
    }
}