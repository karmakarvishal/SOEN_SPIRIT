const jobsController = require("../controllers/jobs.controller");
const mailController = require("../controllers/mail.controller");
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });
    app.use(auth.verifyToken);

    // The 405 handler
    const methodNotAllowed = (req, res, next) =>
        res.status(405).json({ statusText: "Method not supported" });

    const createUpdateJobsRoute = "/api/job";
    app.post(
        createUpdateJobsRoute,
      check("type").isIn(["FULL-TIME", "PART-TIME", "INTERNSHIP", "CONTRACT"]).withMessage("Invalid role provided, supported values: FULL-TIME, PART-TIME, INTERNSHIP, or CONTRACT"),
      check("title").notEmpty().withMessage("title is required."),
      check("description").notEmpty().withMessage("description is required."),
      check("location").notEmpty().withMessage("location is required."),
      
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(406).json({ statusText: errors.array()[0]?.msg });
        }
        next();
      },
      jobsController.createOrUpdate
    );

    const sendEmailRoute = "/api/sendMail";

    app.post(sendEmailRoute,(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(406).json({ statusText: errors.array()[0]?.msg });
        }
        next();
      },mailController.sendMail);

    const deleteJobRoute = "/api/job/:id"
    app.delete(
      deleteJobRoute,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(406).json({ statusText: errors.array()[0]?.msg });
            }
            next();
          },
        jobsController.deleteJobs

    )

    const listJobsRoute = "/api/job"
    app.get(listJobsRoute,
        jobsController.listJobs
    );


    // app.all(createUpdateJobsRoute, methodNotAllowed);
    // app.all(deleteJobRoute, methodNotAllowed);
    // app.all(listJobsRoute, methodNotAllowed);
};
