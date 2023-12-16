const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;
const User = require("../models/user.model");
const { check, validationResult } = require("express-validator");

class UserCreationStrategy {
  create(req, res) {
    const passCheck = validationResult(req);

    if (!passCheck.isEmpty()) {
      res.status(400).json({ message: passCheck.errors });
      return;
    }

    const { name, surname, username, password, email, role } = req.body;

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.create({ name, surname, username, password: hashPass, email, role })
      .then((newUser) =>
        req.login(newUser, (err) =>
          err
            ? res.status(500).json({ message: "Login error" })
            : res.status(200).json(newUser)
        )
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error al guardar usuario en la BD." });
      });
  }
}

class UserAuthenticationStrategy {
  authenticate(req, res, next) {
    passport.authenticate("local", (err, theUser, failureDetails) => {
      if (err) {
        res.status(500).json({ message: "Error de autenticacion" });
        return;
      }

      if (!theUser) {
        res.status(401).json(failureDetails);
        return;
      }

      req.login(theUser, (err) =>
        err
          ? res.status(500).json({ message: "Session error" })
          : res.status(200).json(theUser)
      );
    })(req, res, next);
  }
}

class AuthController {
  constructor(userCreationStrategy, userAuthenticationStrategy) {
    this.userCreationStrategy = userCreationStrategy;
    this.userAuthenticationStrategy = userAuthenticationStrategy;
  }

  signup(req, res) {
    this.userCreationStrategy.create(req, res);
  }

  login(req, res, next) {
    this.userAuthenticationStrategy.authenticate(req, res, next);
  }
}

// Uso del código
const userCreationStrategy = new UserCreationStrategy();
const userAuthenticationStrategy = new UserAuthenticationStrategy();
const authController = new AuthController(
  userCreationStrategy,
  userAuthenticationStrategy
);

router.post("/signup", (req, res) => authController.signup(req, res));
router.post("/login", (req, res, next) => authController.login(req, res, next));

router.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

router.get("/loggedin", (req, res) =>
  req.isAuthenticated()
    ? res.status(200).json(req.user)
    : res.status(403).json({ message: "No autorizado" })
);

module.exports = router;
