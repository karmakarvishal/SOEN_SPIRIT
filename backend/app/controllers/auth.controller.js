const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const db = require("../models");

exports.signin = async (req, res) => {
  const user = await db.user.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user == null) {
    res
      .status(403)
      .json({ statusText: "User not found." });
    return;
  }
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.dataValues.password
  );
  if (!isValidPassword) {
    res
      .status(403)
      .json({ statusText: "The email address or password is incorrect." });
    return;
  }
  delete user.dataValues.password;
  const candidate = await db.candidate.findOne({
    where: {
      user_id: user.id
    }
  });
  const employer = await db.employer.findOne({
    where: {
      user_id: user.id
    }
  });

  user.dataValues.candidate_id = candidate?.id ?? null;
  user.dataValues.employer_id = employer?.id ?? null;
  const token = jwt.sign(user.dataValues, config.auth.secret, {
    expiresIn: 86400,
  });

  res.status(200).json({token});
};

exports.signup = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const checkUser = await db.user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (checkUser !== null) {
      res.status(406).json({
        statusText:
          "The entered email address is already in use by another account.",
      });
      return;
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const user = await db.user.create(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            role: req.body.role,
            password: passwordHash
        },
        { transaction }
    );
    delete user.dataValues.password;

    await transaction.commit();
    res.status(200).json({
      ...user.dataValues
    });
  } catch (e) {
    console.log(e);
    await transaction.rollback();
    res.status(500).json({ statusText: "Internal server error occured" });
  }
};
