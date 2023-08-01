const userController = require("../controllers/user.controller");
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

  const updateUserRoute = "/api/user";
  app.put(
    updateUserRoute,
    check("first_name").optional().notEmpty().withMessage("first name is required."),
    check("last_name").optional().notEmpty().withMessage("last name is required."),
    check("email").optional().notEmpty().withMessage("email is required."),
    check("role").optional().notEmpty().withMessage("role is required."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(406).json({ statusText: errors.array()[0]?.msg });
      }
      next();
    },
    userController.update
  );

  const deleteUserRoute = "/api/user/:id";
  app.get(updateUserRoute,userController.getUsers);
  app.delete(deleteUserRoute,userController.deleteUser);
  app.all(updateUserRoute, methodNotAllowed);
};
