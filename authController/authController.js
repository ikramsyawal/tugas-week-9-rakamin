const pool = require("../db/queries");
const { hashPassword, comparePassword } = require("../lib/bcrypt");
const { generateToken } = require("../lib/jwt");

class AuthController {
  // register
  static register = async (req, res, next) => {
    try {
      const { email, gender, password, role } = req.body;
      const hashPass = hashPassword(password);
      const newUser = await pool.query(
        "INSERT INTO users (email,gender,password,role) VALUES ($1,$2,$3,$4) RETURNING *",
        [email, gender, hashPass, role]
      );
      res.status(201).json({
        message: "new user successfully created",
        user: newUser.rows[0],
      });
    } catch (err) {
      next(err);
    }
  };

  //login
  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (user.rows.length === 0) {
        return res.status(400).json({
          message: "user not found",
        });
      }

      if (!comparePassword(password, user.rows[0].password)) {
        return res.status(400).json({
          message: "invalid password",
        });
      }
      const token = generateToken({
        id: user.rows[0].id,
        email: user.rows[0].email,
        role: user.rows[0].role,
      });

      res.status(200).json({
        message: "user successfully logged in",
        token: token,
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = AuthController;
