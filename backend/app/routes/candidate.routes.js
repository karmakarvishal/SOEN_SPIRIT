const candidateController = require("../controllers/candidate.controller");
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

    const createUpdateCandidateRoute = "/api/candidate";
    app.put(
        createUpdateCandidateRoute,
      check("address_line1").notEmpty().withMessage("address_line1 is required."),
      check("city").notEmpty().withMessage("city is required."),
      check("province").notEmpty().withMessage("province is required."),
      check("postal_code").notEmpty().withMessage("postal_code is required."),
      check("phone").notEmpty().withMessage("phone is required."),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(406).json({ statusText: errors.array()[0]?.msg });
        }
        next();
      },
      candidateController.createOrUpdate
    );
    app.all(createUpdateCandidateRoute, methodNotAllowed);

    const getCandidateRoute = "/api/candidate/:id"
    app.get(
      getCandidateRoute,
      candidateController.retrieve
    );
    app.all(getCandidateRoute, methodNotAllowed);
};
