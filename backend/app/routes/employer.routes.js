const employerController = require("../controllers/employer.controller");
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

    const createUpdateEmployerRoute = "/api/employer";
    app.put(
        createUpdateEmployerRoute,
      check("company_name").notEmpty().withMessage("company_name is required."),
      check("company_address_line1").notEmpty().withMessage("company_address_line1 is required."),
      check("company_city").notEmpty().withMessage("company_city is required."),
      check("company_province").notEmpty().withMessage("company_province is required."),
      check("company_postal_code").notEmpty().withMessage("company_postal_code is required."),
      check("company_phone").notEmpty().withMessage("company_phone is required."),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(406).json({ statusText: errors.array()[0]?.msg });
        }
        next();
      },
      employerController.createOrUpdate
    );
    
    const getEmployerRoute = "/api/employer/:id"
    app.get(
      getEmployerRoute,
      employerController.retrieve
    );
    app.all(getEmployerRoute, methodNotAllowed);
    app.all(createUpdateEmployerRoute, methodNotAllowed);
};
