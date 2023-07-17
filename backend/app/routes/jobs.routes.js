const jobsController = require("../controllers/jobs.controller");
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

    const createUpdateJobsRoute = "/api/jobs";
    app.post(
        createUpdateJobsRoute,
      check("type").notEmpty().withMessage("type is required."),
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

    const deleteJobs = "/api/jobs"
    app.delete(
        deleteJobsAPI,
        check("id").notEmpty().withMessage("id is required"),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(406).json({ statusText: errors.array()[0]?.msg });
            }
            next();
          },
        jobsController.deleteJobs

    )

    const listJobsAPI = "/api/jobs"
    app.get(listJobsAPI,
        jobsController.listJobs
    );


    app.all(createUpdateJobsRoute, methodNotAllowed);
};
