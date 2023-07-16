const authController = require("../controllers/auth.controller");
const { check, validationResult } = require("express-validator");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  // The 405 handler
  const methodNotAllowed = (req, res, next) =>
    res.status(405).json({ statusText: "Method not supported" });

  const signUpRoute = "/api/auth/signup";
  app.post(
    signUpRoute,
    check("first_name").notEmpty().withMessage("first name is required."),
    check("last_name").notEmpty().withMessage("last name is required."),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Your password must be at least 6 characters long."),
    check("role").isIn(["CANDIDATE", "EMPLOYER", "ADMIN"]).withMessage("Invalid role provided, supported values: CANDIDATE, EMPLOYER, or ADMIN"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(406).json({ statusText: errors.array()[0]?.msg });
      }
      next();
    },
    authController.signup
  );
  app.all(signUpRoute, methodNotAllowed);

  const signInRoute = "/api/auth/signin";
  app.post(
    signInRoute,
    check("email").isEmail().withMessage("Please enter a valid email address"),
    check("password")
      .notEmpty()
      .withMessage("Password field should not be empty"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(406).json({ statusText: errors.array()[0]?.msg });
      }
      next();
    },
    authController.signin
  );
  app.all(signInRoute, methodNotAllowed);
};
