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
        const candidate = await db.candidate.findOne({
            where: {
                id: candidateId
            }
        });
        const user = await db.user.findOne({
            where: {
                id: candidate.dataValues.user_id
            },
            attributes: {exclude: ['password', 'id', 'role']}
        })
        let attachmentId = req.body.attachment_id;
        if (attachmentId == null) {
            const candidatePersonalDetails = user.dataValues;
            const candidateEducation = req.body.candidate_education;
            const candidateExperience = req.body.candidate_experience;
            let resumeHtml = buildResume(candidateEducation, candidateExperience, candidatePersonalDetails);
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const fileName = `resume-${uniqueSuffix}.pdf`;
            const attachment = await db.attachment.create({
                    original_file_name: fileName,
                    uploaded_file_name: fileName,
                    uploaded_path: 'uploads/',
                    mime: 'application/pdf',
                    extension: 'pdf',
                    uploaded_by_user_id: req.payload.id
                },
                { transaction }
            );
            attachmentId = attachment.dataValues.id
            var pdf = require('html-pdf');
            var options = { format: 'A2' };
            pdf.create(resumeHtml, options).toFile(`./uploads/${fileName}`, function(err, res) {
                if (err) return console.log(err);
            });
        }
        
        let jobApplication = await db.job_application.create(
            {
                job_id: req.body.job_id,
                candidate_id: candidateId,
                attachment_id: attachmentId
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
                // service: 'gmail',
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  user: "uptechnotricks@gmail.com",
                  pass: "ltbvtadttlpsbhvv",
                }
              });

              let mailOptions = {
                from: "uptechnotricks@gmail.com",
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

              transporter.sendMail(mailOptions, function(err, data) {
                if (err) {
                  console.log("Error " + err);
                  res.status(400).json({Error:`${err}`});
                }
              })
        }
        res.status(200).json({ statusText: "Status updated successfully."})
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).json({ statusText: "Internal server error occured" });
    }
}


exports.lastApplicationInformation = async (req, res) => {
    const jobApplication = await db.job_application.findOne({
        where: {
            candidate_id: req.payload.candidate_id
        },
        order: [
            ['id', 'DESC']
        ],
    });
    if (jobApplication == null) {
        res
                .status(400)
                .json({ statusText: "Last job application not found." });
            return;
    }
    const education = await db.job_application_education.findAll({
        where: {
            job_application_id: jobApplication.id
        }
    });

    if (education == null) {
        res
                .status(400)
                .json({ statusText: "Last education detail not found." });
            return;
    }

    const experience = await db.job_application_experience.findAll({
        where: {
            job_application_id: jobApplication.id
        }
    });

    if (experience == null) {
        res
                .status(400)
                .json({ statusText: "Last experience detail not found." });
            return;
    }

    res.status(200).json({education, experience});
    return;
}

function buildResume(education, experience, personalDetails) {
    const details = {
        "Personal Details": personalDetails,
        "Education": education,
        "Experience": experience
    }
    return render(details)    
}

function getFullCollection(data) {
    return Object.keys(data).map((propName, index) => {
        return getHtmlContent(propName, data[propName]);
    });
}

function getHtmlContent(propName, data) {
    const propType = typeof (data);
    if (propType === 'string' || propType === 'number')
        return `
                <div class='item'>
                        <div><label class='field-name'>${propName}</label></div>
                        <div  class='field-value'>${data}</div>
                </div>
            `;
    else if (propType === 'object') {
        if (Array.isArray(data)) {
            return `<div class='list'>
                    <hr/>
                    <h3 class='field-name'>${propName}</h3>
                    <hr/>
                    <div class='list-items'>
                    ${
                data.map((p, index) => {
                    return `<div class='list-item'>${getFullCollection(p).join("")} <hr/></div>`;
                }).join("")
                }
                    </div>
                    <br/><br/>
                </div>`;
        } else {
            return `<div class='object'>
                <hr/>
                <h3 class='field-name'>${propName}</h3>
                <hr/>
                <div class='object-items'>
                    ${
                getFullCollection(data).join("")
                }
                </div>
                    <br/><br/>
                    </div>
            </div>`;
        }
    }

}

function render(details) {
    return `
    <style>
    .resume-container{
        padding: 10px;
        border: 1px solid #CCC;
        BORDER-RADIUS: 6PX;
        border-top: none;
        height: 200px;
    }
     .field-name{
         font-weight:bold;
         text-transform: capitalize;
         color: gray;
     }
     h3.field-name{
        text-align: left;
        font-size: 24px;
        padding-left: 30px;
        color: navy;
     }
     hr{
        border: 0;
        width  :100%;
        height: 1px;
        background: #333;
        background: -webkit-gradient(linear, left top, right top, color-stop(0%,hsla(0,0%,0%,0)), color-stop(50%,hsla(0,0%,0%,.75)), color-stop(100%,hsla(0,0%,0%,0)));
        background: -webkit-linear-gradient(left, hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,.75) 50%, hsla(0,0%,0%,0) 100%);
        background:    -moz-linear-gradient(left, hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,.75) 50%, hsla(0,0%,0%,0) 100%);
        background:     -ms-linear-gradient(left, hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,.75) 50%, hsla(0,0%,0%,0) 100%);
        background:      -o-linear-gradient(left, hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,.75) 50%, hsla(0,0%,0%,0) 100%);
        background:         linear-gradient(left, hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,.75) 50%, hsla(0,0%,0%,0) 100%);
     }
     .field-value{
         font-style:italic;
         font-size:70%;
         color: gray;
     }
     .list-items{
        padding: 10px 0px 0px 50px;
        display: inline-block;
        width: 100%;
        margin-bottom: 10px;
        counter-reset: listcounter;
     }
     .list-item::before {
        counter-increment: listcounter;
        content: counter(listcounter) ": ";
        float: left;
        height: 110px;
        margin-right: 10px;
        font-weight: bold;
        font-size: 15px;
      }
     .object-items{
         padding-left:50px;
     }
     .item{
        margin-bottom:10px;
        float: left;
        width: 48%;
     }
    </style>
        <div>${(dataTemplate(details))}</div>
    `;
}

function dataTemplate(details) {
    if (details) {
        return `
            <div class='resume-container'>
                ${ getFullCollection(details).join("")}
            </div>
    `;
    } else return ``;
}