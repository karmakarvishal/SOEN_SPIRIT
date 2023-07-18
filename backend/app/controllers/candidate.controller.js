const db = require("../models");

exports.createOrUpdate = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        if (req.payload.role != "CANDIDATE") {
            res
            .status(400)
            .json({ statusText: "Please create candidate profile from Candidate account." });
            return;
        }
        const userId = req.payload.id;
        const checkCandidate = await db.candidate.findOne({
            where: {
              user_id: userId
            },
          });
        
        let candidate = null;
        // Update
        if (checkCandidate != null) {
            candidate = await db.candidate.update(
                {
                    address_line1: req.body.address_line1,
                    city: req.body.city,  
                    province: req.body.province,  
                    postal_code: req.body.postal_code,  
                    phone: req.body.phone
                },
                { where: { user_id: userId }, individualHooks: true },
                { transaction }
            );
            candidate = {
                id: checkCandidate.id,
                address_line1: req.body.address_line1,
                city: req.body.city,  
                province: req.body.province,  
                postal_code: req.body.postal_code,  
                phone: req.body.phone,
                user_id: userId
            };
        } else {
            // Create
            candidate = await db.candidate.create(
                {
                    address_line1: req.body.address_line1,
                    city: req.body.city,  
                    province: req.body.province,  
                    postal_code: req.body.postal_code,  
                    phone: req.body.phone,
                    user_id: userId
                },
                { transaction }
            );
        }
        await transaction.commit()
        res.status(200).json(candidate);
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).json({ statusText: "Internal server error occured" });
    }
};

exports.retrieve = async (req, res) => {
    const candidate = await db.candidate.findOne({
        include: ['user'],
        where: {
            id: req.params.id
        }
    });
    if (candidate == null) {
        res.status(400).json({statusText: "Candidate not found."});
        return;
    }

    res.status(200).json(candidate);
}