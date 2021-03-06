const UserModel = require("../models/User");

exports.get_users = async (req, res, next) => {
  //get users from db
  try {
    const userList = await UserModel.findAll({});
    res.render("users", { userList });
  } catch (error) {
    res.send("An error occured");
  }
};

//on get request
exports.show_add_user_form = (req, res) => {
  res.render("addUser");
};

//on post request
exports.add_user = async (req, res) => {
  // add to db
  try {
    const newUser = await UserModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.redirect("/users");
  } catch (error) {
    res.send("An error occured.");
  }
};

//on delete request
exports.delete_user = async (req, res) => {
  try {
    await UserModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/users");
  } catch (error) {
    console.log("error", error);
  }
};

exports.show_edit_user_form = async(req, res) => {
  try {
    const user = await UserModel.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.render("editUser", { user });
  } catch (error) {
    console.log("error", error);
  }
};

//on edit request
exports.edit_user = (req, res) => {
  // const id = req.params.id
  // const firstName = req.body.firstName
  // const lastName = req.body.lastName
  try {
    UserModel.update(
      {
        firstName : req.body.firstName, lastName : req.body.lastName,
      },
        { where: {
          id: req.params.id
        }}
    );
    res.redirect("/users");
  } catch (error) {
    console.log("update error", error);
  }
};


// update({firstName: req.body.first_name}, 
// {where: { id: req.params.id}