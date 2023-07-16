const db = require("../models");

exports.login = (req, res) => {
    res.status(200).send("Public Content.");
};
  

exports.update = async (req, res) => {
    const userId = req.payload.id;
    const user = await db.user.findOne({
      where: {
        id: userId
      },
    });
    if (user == null) {
      res
        .status(400)
        .json({ statusText: "User not found." });
      return;
    }

    const updatedUser = {};

    if (req.body.first_name) {
        updatedUser.first_name = req.body.first_name;
    }
    if (req.body.last_name) {
        updatedUser.last_name = req.body.last_name;
    }

    const transaction = await db.sequelize.transaction();
    try {
        await db.user.update(
            updatedUser,
            { where: { id: userId }, individualHooks: true },
            { transaction }
        );
        await transaction.commit();
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).json({ statusText: "Internal server error occured" });
    }
    res.status(200).json({message: "User updated successfully."});
  };