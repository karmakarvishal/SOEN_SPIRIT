const db = require("../models");

exports.login = (req, res) => {
    res.status(200).send("Public Content.");
};
  

exports.update = async (req, res) => {
    const userId = req.body.id;
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
    if (req.body.email) {
      updatedUser.email = req.body.email;
    }
    if (req.body.password) {
      updatedUser.password = req.body.password;
    }
    if (req.body.role) {
      updatedUser.role = req.body.role;
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

exports.getUsers = async (req,res) => {
  const userList = await db.user.findAll({
    where: {
      [Op.or]: [
        { role: 'CANDIDATE' },
        { role: 'EMPLOYER' }
      ]
    }
  });

  if (userList == null) {
    res
      .status(400)
      .json({ statusText: "No Users." });
    return;
  }
  res.status(200).json({userList});
}


exports.deleteUser = async (req,res) => {
  const user = req.body.id;
  const count = await user.destroy({ where: { id: user } });
  res.status(200).json({count});
}

