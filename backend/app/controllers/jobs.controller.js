const db = require("../models");

exports.createOrUpdate = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        if (req.payload.role == "CANDIDATE") {
            res
                .status(400)
                .json({ statusText: "You are not allowed to create Job, make sure you are Employer or Admin." });
            return;
        }
        const jobId = req.body.job_id;
        const checkJob = jobId ? await db.job.findOne({
            where: {
              id: jobId
            },
          }) : null;
        
        let job = null;
        // Update
        if (checkJob != null) {
            job = await db.job.update(
                {
                    type: req.body.type,
                    title: req.body.title,  
                    description: req.body.description,  
                    location: req.body.location
                },
                { where: { id: jobId }, individualHooks: true },
                { transaction }
            );
            job = {
                id: checkJob.id,
                type: req.body.type,
                title: req.body.title,  
                description: req.body.description,  
                location: req.body.location
            };
        } else {
            job = await db.job.create(
                {
                    type: req.body.type,
                    title: req.body.title,  
                    description: req.body.description,  
                    location: req.body.location,
                    user_id: req.payload.id
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
        if (req.payload.role == "CANDIDATE") {
            res
                .status(400)
                .json({ statusText: "You are not allowed to delete Job, make sure you are Employer or Admin." });
            return;
        }
        const jobId = req.params.id;
        const checkJob = await db.job.findOne({
            where: {
              id: jobId
            },
          });
        
        if (checkJob != null) {
            await db.job.destroy(
                { where: { id: jobId }, individualHooks: true },
                { transaction }
            );
        } else {
            res.status(400).json({statusText: "No Job Found"});
            return;
        }
        await transaction.commit()
        res.status(200).json({statusText: "Job is now deleted"});
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).json({ statusText: "Internal server error occured" });
    }
}

exports.listJobs = async(req,res)=>{

    try {
        const user_id = req.payload.id;
        let jobList = null;
        if(req.payload.role == "CANDIDATE" || req.payload.role == "ADMIN") {
            jobList = await db.job.findAll({
                include: [{
                    model: db.job_application,
                    as: 'job_applications',
                    where: {
                        candidate_id: req.payload.candidate_id
                    },
                    required: false,
                    include: [
                        {
                            model: db.job_application_education,
                            as: 'candidate_education'
                        },
                        {
                            model: db.job_application_experience,
                            as: "candidate_experience"
                        },
                        {
                            model: db.candidate,
                            as: "candidate",
                            include: [
                                {
                                    model: db.user,
                                    as: "user"
                                }
                            ]
                        },
                    ]
                }],
            });
        } else {
            jobList = await db.job.findAll({
                include: [{
                    model: db.job_application,
                    as: 'job_applications',
                    required: false,
                    include: [
                        {
                            model: db.job_application_education,
                            as: 'candidate_education'
                        },
                        {
                            model: db.job_application_experience,
                            as: "candidate_experience"
                        },
                        {
                            model: db.candidate,
                            as: "candidate",
                            include: [
                                {
                                    model: db.user,
                                    as: "user"
                                }
                            ]
                        },
                    ]
                }],
                where:{
                    user_id: user_id
                }
            });
        }
        res.status(200).json(jobList);
    } catch (error) {
        console.log(error);
        res.status(500).json({statusText:"Internal server error occured"})
    }
}