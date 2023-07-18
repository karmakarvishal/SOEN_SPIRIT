const db = require("../models");
let nodemailer = require("nodemailer")

exports.create = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const candidateId = req.payload.candidate_id;
        if (candidateId == null || req.payload.role != "CANDIDATE") {
            res
                .status(400)
                .json({ statusText: "Candidate not found, either candidate profile is incomplete or you are trying to apply as employer/admin." });
            return;
        }
        const checkJobApplication = await db.job_application.findOne({
            where: {
                candidate_id: candidateId,
                job_id: req.body.job_id
            },
        });
        if (checkJobApplication != null) {
            res
                .status(400)
                .json({ statusText: "You already applied for this position." });
            return;
        }
        
        let jobApplication = await db.job_application.create(
            {
                job_id: req.body.job_id,
                candidate_id: candidateId,
                attachment_id: req.body.attachment_id
            },
            { transaction }
        );
        jobApplication = jobApplication.dataValues;

        // Adding candidate educations if any
        const candidateEducation = req.body.candidate_education;
        if (candidateEducation && Array.isArray(candidateEducation) && candidateEducation.length > 0) {
            for(const education of candidateEducation) {
                await db.job_application_education.create(
                    {
                        job_application_id: jobApplication.id,
                        school_or_university: education.school_or_university,
                        degree: education.degree,
                        field_of_study: education.field_of_study,
                        GPA: education.GPA,
                        from_date: education.from_date,
                        to_date: education.to_date
                    },
                    { transaction }
                );
            }
        }

        // Adding candidate experiences if any
        const candidateExperience = req.body.candidate_experience;
        if (candidateExperience && Array.isArray(candidateExperience) && candidateExperience.length > 0) {
            for(const experience of candidateExperience) {
                await db.job_application_experience.create(
                    {
                        job_application_id: jobApplication.id,
                        job_title: experience.job_title,
                        company: experience.company,
                        location: experience.location,
                        role_description: experience.role_description,
                        from_date: experience.from_date,
                        to_date: experience.to_date
                    },
                    { transaction }
                );
            }
        }

        await transaction.commit()
        res.status(200).json({job_application_id: jobApplication.id});
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).json({ statusText: "Internal server error occured" });
    }
};



exports.retrieve = async (req, res) => {
    try {
        const retrieveObject = {
            include: [
                {
                    model: db.job,
                    as: "job"
                },
                {
                    model: db.candidate,
                    as: 'candidate',
                    include: {
                        model: db.user,
                        as: 'user',
                        attributes: {
                            exclude: ['password']
                        },
                    },
                },
                {
                    model: db.job_application_education,
                    as: 'candidate_education'
                },
                {
                    model: db.job_application_experience,
                    as: "candidate_experience"
                }
            ],
        };
        if (req.payload.role == "CANDIDATE") {
            retrieveObject.where = {
                candidate_id: req.payload.candidate_id
            }
        } else if (req.payload.role == "EMPLOYER") {
            retrieveObject.include[0].where = {
                user_id: req.payload.id
            }
        }
        const jobApplications = await db.job_application.findAll(retrieveObject);
        res.status(200).json(jobApplications);
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).json({ statusText: "Internal server error occured" });
    }
};


exports.status = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const jobApplication = await db.job_application.findOne({
            where: {
                id: req.body.job_application_id
            }
        });

        if (jobApplication == null) {
            res.status(400).json({ statusText: "Job application not found." });
        }
        
        const oldStatus = jobApplication.dataValues.status;

        const newStatus = req.body.status;

        await db.job_application.update(
            { status: newStatus },
            { where: { id: req.body.job_application_id }, individualHooks: true },
            { transaction }
        );
        transaction.commit();

        if (oldStatus != newStatus) {
            const candidateId = jobApplication.candidate_id;
            const candidate = await db.candidate.findOne({
                where: {
                    id: candidateId
                }
            });
            const user = await db.user.findOne({
                where: {
                    id: candidate.dataValues.user_id
                }
            });
            const job = await db.job.findOne({
                where: {
                    id: jobApplication.dataValues.job_id
                }
            })
            const email = user.dataValues.email;
            const employer = await db.employer.findOne({
                where: {
                    user_id: job.dataValues.user_id
                }
            });
            const company = employer.dataValues.company_name;

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  type: 'OAuth2',
                  user: "karmakar922@gmail.com",
                  pass: "vishalKarmakar123",
                  clientId: '705251655934-7dck187fgb83ki37gurcvdbl0fgu0u4a.apps.googleusercontent.com',
                  clientSecret: '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',
                  refreshToken: '1//04iXKGEyCvTofCgYIARAAGAQSNwF-L9Irj00oe2Q8xL-_-QtW5OWmyjvj_EjvtJ_jfPDhSFeB6_EwWhivslCxZmFFp8VADDFZ_Dk'
                }
              });

              let mailOptions = {
                from: "karmakar922@gmail.com",
                to: email,
                subject: "The status for the job application having position " + job.dataValues.title +  " is changed to " + newStatus,
                html: `<p>Hello ${user.dataValues.first_name},</p>

                <p>Please find the details of your job application below:</p>
                
                <p>Job Details:</p>
                
                <ul>
                    <li style="margin-left: 40px;">Company Name:&nbsp;<b>${company}</b></li>
                    <li style="margin-left: 40px;">Position Title:&nbsp;<b>${job.dataValues.title}</b></li>
                    <li style="margin-left: 40px;">Job Type:&nbsp;<b>${job.dataValues.type}</b></li>
                    <li style="margin-left: 40px;">Job Location:&nbsp;<b>${job.dataValues.location}</b></li>
                    <li style="margin-left: 40px;">Job Application Status:&nbsp;<b>${newStatus}</b></li>
                </ul>`
                
              };

            //   transporter.sendMail(mailOptions, function(err, data) {
            //     if (err) {
            //       console.log("Error " + err);
            //       res.status(400).json({Error:`${err}`});
            //     }
            //   })
        }
        res.status(200).json({ statusText: "Status updated successfully."})
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).json({ statusText: "Internal server error occured" });
    }
}