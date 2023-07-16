const { where } = require("sequelize");
const { user } = require("../models");
const db = require("../models");

exports.createOrUpdate = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const id = req.payload.id;
        const checkJob = await db.job.findOne({
            where: {
              id: id
            },
          });
        
        let job = null;
        // Update
        if (checkJob != null) {
            job = await db.job.update(
                {
                    type: req.body.type,
                    title: req.body.title,  
                    description: req.body.description,  
                    updated_at: req.body.updated_at,  
                    location: req.body.location
                },
                { where: { id: id }, individualHooks: true },
                { transaction }
            );
            job = {
                id: checkJob.id,
                type: req.body.type,
                title: req.body.title,  
                description: req.body.description,  
                updated_at: new Date(),  
                location: req.body.location
            };
        } else {
            // Create
            job = await db.job.create(
                {
                    type: req.body.type,
                    title: req.body.title,  
                    description: req.body.description,  
                    created_at: new Date(),  
                    location: req.body.location
                },
                { transaction }
            );
        }
        await transaction.commit()
        res.status(200).json(job);
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).json({ statusText: "Internal server error occured" });
    }
};

exports.deleteJobs = async(req,res)=>{
    const transaction = await db.sequelize.transaction();
    try {
        const id = req.payload.id;
        const checkJob = await db.job.findOne({
            where: {
              id: id
            },
          });
        
        if (checkJob != null) {
            await db.job.Destroy(
                { where: { id: id }, individualHooks: true },
                { transaction }
            );
        } else {
            res.status(200).json("No Job Found");
        }
        await transaction.commit()
        res.status(200).json("Job is now deleted");
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).json({ statusText: "Internal server error occured" });
    }
}

exports.listJobs = async(req,res)=>{

    try {
        const user_id = req.payload.user_id;
        let jobList = null;
        if(user_id) //In case of Employer
        {
            jobList = await db.job.findAll(
                {where:{
                    user_id:user_id
                }}
            );
        }else //In case of Candidates
        {
            jobList = await db.job.findAll();
        }
        
        res.status(200).json(jobList);
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(500).json({statusText:"Internal server error occured"})
        
    }
}