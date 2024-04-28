const User = require("../models/User");
const validateUser = require("../validations/validateUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = (req, res) => {
  User.find({ deleted: false })
    .then((result) => {
      const users = result.map((user) => {
        let userWithoutPassword = { ...user._doc };
        delete userWithoutPassword.password;
        return userWithoutPassword;
      });
      res.status(200).json(users);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

const getUserByEmail = (req, res) => {
  const { email } = req.params;
  User.findOne({
    email: email,
    deleted: { $ne: true },
  })
    .then((data) => {
      const {
        name,
        last_name,
        email,
        dni,
        address,
        age,
        rank,
        phone_number,
        is_member,
      } = data;
      userInfo = {
        name,
        last_name,
        email,
        dni,
        address,
        age,
        rank,
        phone_number,
        is_member,
      };
      if (data) {
        res.status(200).json(userInfo);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

const postUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let user = await User.findOne({
      email: req.body.email,
      deleted: { $ne: true },
    });
    if (user && !user.deleted) {
      return res.status(404).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      dni: req.body.dni,
      address: req.body.address,
      age: req.body.age,
      rank: req.body.rank ? req.body.rank : 0,
      phone_number: req.body.phone_number,
      is_member: req.body.is_member ? true : false,
    });
    await user.save();
    return res.status(200).json({ message: "Successfully registered user" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const putUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    if (!userId) {
      return res.status(404).json({ message: "User ID is required" });
    }

    try {
      const user = await User.findById(userId);
      if (!user || user.deleted) {
        return res.status(404).json({ message: "User not found" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user.name = req.body.name;
      user.last_name = req.body.last_name;
      user.email = req.body.email;
      user.password = hashedPassword;
      user.dni = req.body.dni;
      user.address = req.body.address;
      user.age = req.body.age;
      user.rank = req.body.rank;
      user.phone_number = req.body.phone_number;
      user.is_member = req.body.is_member && is_member;

      await user.save();

      res.status(200).json({ message: "User successfully updated" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putRank = async (req, res) => {
  try {
    const userId = req.params.id;
    const { rank } = req.body;

    const user = await User.findById(userId);
    if (!user || user.deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    user.rank = rank;
    await user.save();

    res.status(200).json({ message: "Rank modified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putMember = async (req, res) => {
  try {
    const userId = req.params.id;
    const { member } = req.body;

    const user = await User.findById(userId);
    if (!user || user.deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    user.is_member = member;
    await user.save();

    res.status(200).json({ message: "Rank modified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user || user.deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    user.deleted = true;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    console.log(req.body.password, req.body.email);
    return res.status(400).json({ message: "Incomplete information" });
  }

  try {
    let user = await User.findOne({
      email: req.body.email,
      deleted: { $ne: true },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      } else {
        const payloadUser = {
          id: user._id,
          name: user.name,
          email: user.email,
          rank: user.rank,
          is_member: user.is_member,
        };

        const token = jwt.sign(payloadUser, process.env.SECRET, {
          expiresIn: 60 * 60 * 300,
        });

        return res.status(200).json({
          user: {
            token,
            name: user.name,
            last_name: user.last_name,
            email: user.email,
          },
          message: "Login succesfully",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserByEmail,
  postUser,
  putUser,
  deleteUser,
  userLogin,
  putRank,
  putMember,
};
