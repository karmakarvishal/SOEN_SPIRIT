const jobApplicationController = require("../controllers/job_application.controller");
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
    // const methodNotAllowed = (req, res, next) =>
    //     res.status(405).json({ statusText: "Method not supported" });

    const createJobApplicationRoute = "/api/job/application";
    app.post(
        createJobApplicationRoute,
      check("job_id").notEmpty().withMessage("job_id is required."),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(406).json({ statusText: errors.array()[0]?.msg });
        }
        next();
      },
      jobApplicationController.create
    );

    const getJobApplicationRoute = "/api/job/application";
    app.get(
      getJobApplicationRoute,
      jobApplicationController.retrieve
    );
    

    const changeStatus = "/api/job/application/status";
    app.put(
      changeStatus,
      check("status").isIn(['APPLIED','INTERVIEW','OFFER','HIRED','REJECTED']).withMessage("Invalid status provided, supported values: APPLIED, INTERVIEW, OFFER, HIRED, or REJECTED"),
      check("job_application_id").notEmpty().withMessage("job_application_id is required."),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(406).json({ statusText: errors.array()[0]?.msg });
        }
        next();
      },
      jobApplicationController.status
    );

    const lastEduExp = "/api/job/last/info";
    app.get(
      lastEduExp,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(406).json({ statusText: errors.array()[0]?.msg });
        }
        next();
      },
      jobApplicationController.lastApplicationInformation
    );
};
