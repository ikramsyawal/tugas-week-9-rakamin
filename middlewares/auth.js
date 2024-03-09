const { verifyToken } = require("../lib/jwt");
const pool = require("../db/queries");

const authentication = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);

    if (req.headers.authorization) {
      const accessToken = req.headers.authorization.split(" ")[1];

      const { id, email, role } = verifyToken(accessToken);

      const searchSQL = "SELECT * FROM users WHERE id = $1";

      const result = await pool.query(searchSQL, [id]);

      if (result.rows.length > 0) {
        const foundUser = result.rows[0];

        req.loggedUser = {
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role,
        };

        next();
      } else {
        throw { name: "Unauthenticated" };
      }
    } else {
      throw { name: "Unauthenticated" };
    }
  } catch (err) {
    next(err);
  }
};

const authorization = async (req, res, next) => {
  try {
    const { role } = req.loggedUser;

    if (role === "admin") {
      next();
    } else {
      throw { name: "Unauthorized" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication, authorization };
