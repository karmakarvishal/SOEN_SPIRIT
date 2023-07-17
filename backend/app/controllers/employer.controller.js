const db = require("../models");

exports.createOrUpdate = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        if (req.payload.role != "EMPLOYER") {
            res
            .status(400)
            .json({ statusText: "Please create employer profile from Employer account." });
            return;
        }
        const userId = req.payload.id;
        const checkEmployer = await db.employer.findOne({
            where: {
              user_id: userId
            },
          });
        
        let employer = null;
        // Update
        if (checkEmployer != null) {
            employer = await db.employer.update(
                {
                    company_name: req.body.company_name,
                    company_address_line1: req.body.company_address_line1,
                    company_city: req.body.company_city,  
                    company_province: req.body.company_province,  
                    company_postal_code: req.body.company_postal_code,  
                    company_phone: req.body.company_phone
                },
                { where: { user_id: userId }, individualHooks: true },
                { transaction }
            );
            employer = {
                id: checkEmployer.id,
                company_name: req.body.company_name,
                company_address_line1: req.body.company_address_line1,
                company_city: req.body.company_city,  
                company_province: req.body.company_province,  
                company_postal_code: req.body.company_postal_code,  
                company_phone: req.body.company_phone,
                user_id: userId
            };
        } else {
            // Create
            employer = await db.employer.create(
                {
                    company_name: req.body.company_name,
                    company_address_line1: req.body.company_address_line1,
                    company_city: req.body.company_city,  
                    company_province: req.body.company_province,  
                    company_postal_code: req.body.company_postal_code,  
                    company_phone: req.body.company_phone,
                    user_id: userId
                },
                { transaction }
            );
        }
        await transaction.commit()
        res.status(200).json(employer);
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).json({ statusText: "Internal server error occured" });
    }
};

exports.retrieve = async (req, res) => {
    const employer = await db.employer.findOne({
        include: ['user'],
        where: {
            id: req.params.id
        }
    });

    if (employer == null) {
        res.status(400).json({statusText: "Employer not found."});
        return;
    }

    res.status(200).json(employer);
}