//import express, express router as shown in lecture code
import { Router } from "express";
const router = Router();
import * as validate from "../helpers.js";
import * as data from "../data/users.js";

function createSessionObject(user) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    role: user.role,
  };
}
router.route("/").get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
  .route("/register")
  .get(async (req, res) => {
    return res.render("register", { title: "Register", injectScript: true });
  })
  .post(async (req, res) => {
    const {
      firstNameInput,
      lastNameInput,
      emailAddressInput,
      passwordInput,
      confirmPasswordInput,
      roleInput,
    } = req.body;
    let errorMessages = {};

    if (
      !firstNameInput ||
      !lastNameInput ||
      !emailAddressInput ||
      !passwordInput ||
      !confirmPasswordInput ||
      !roleInput
    ) {
      errorMessages.empty = "All fields are required";
    }
    try {
      validate.validateName(firstNameInput, "firstName");
    } catch (error) {
      errorMessages.firstNameInput = error.message;
    }
    try {
      validate.validateName(lastNameInput, "lastName");
    } catch (error) {
      errorMessages.lastNameInput = error.message;
    }

    try {
      validate.validateEmail(emailAddressInput, "email");
    } catch (error) {
      errorMessages.emailAddressInput = error.message;
    }

    try {
      validate.validatePassword(passwordInput, "password");
    } catch (error) {
      errorMessages.passwordInput = error.message;
    }
    try {
      validate.validateConfirmPassword(confirmPasswordInput, "confirmPassword");
    } catch (error) {
      errorMessages.confirmPasswordInput = error.message;
    }

    try {
      validate.validateStringInput(roleInput, "role");
      if (roleInput !== "admin" && roleInput !== "user") {
        throw new Error('Role must be either "admin" or "user"');
      }
    } catch (error) {
      errorMessages.roleInput = error.message;
    }

    try {
      const result = await data.createUser(
        firstNameInput,
        lastNameInput,
        emailAddressInput,
        passwordInput,
        roleInput
      );
      if (result.insertedUser) {
        const user = {
          firstName: firstNameInput,
          lastName: lastNameInput,
          emailAddress: emailAddressInput,
          role: roleInput,
        };
        req.session.user = user;
        return res.status(200).redirect("/login");
      } else {
        return res.status(500).send("Internal Server Error");
      }
    } catch (error) {
      errorMessages.cant_create = error.message;
    }

    if (Object.keys(errorMessages).length !== 0) {
      return res.status(400).render("register", {
        errorMessages: errorMessages,
        is_invalid: true,
        errorContent: req.body,
        injectScript: true,
      });
    } else {
      return res.status(200).redirect("/login");
    }
  });

router
  .route("/login")
  .get(async (req, res) => {
    return res.render("login", { title: "Login", injectScript: true });
  })
  .post(async (req, res) => {
    if (!req.session.user) {
      let { emailAddressInput, passwordInput } = req.body;
      let errorMessages = {};
      if (!emailAddressInput || !passwordInput) {
        errorMessages.empty = "All fields are required";
      }
      try {
        emailAddressInput = emailAddressInput.toLowerCase();
        validate.validateEmail(emailAddressInput, "email");
      } catch (error) {
        errorMessages.emailAddressInput = error.message;
      }
      try {
        validate.validatePassword(passwordInput, "password");
      } catch (error) {
        errorMessages.passwordInput = error.message;
      }
      if (Object.keys(errorMessages).length !== 0) {
        return res.status(400).render("login", {
          errorMessages: errorMessages,
          is_invalid: true,
          errorContent: req.body,
          injectScript: true,
        });
      }
      try {
        const user = await data.checkUser(emailAddressInput, passwordInput);
        if (user) {
          req.session.user = createSessionObject(user);
        }
        if (user.role === "admin") {
          return res.redirect("/admin");
        } else {
          return res.redirect("/protected");
        }
      } catch (error) {
        return res.status(400).render("login", {
          error: "Invalid email address and/or password.",
          injectScript: true,
        });
      }
    }
  });

router.route("/protected").get(async (req, res) => {
  if (req.session.user) {
    const { firstName, lastName, emailAddress, role } = req.session.user;
    const currentTime = new Date().toLocaleTimeString();

    return res.render("protected", {
      firstName,
      currentTime,
      role,
      isAdmin: role === "admin",
      title: "Protected",
    });
  }
});

router.route("/admin").get(async (req, res) => {
  if (req.session.user) {
    const currentTime = new Date().toLocaleTimeString();
    if (req.session.user.role !== "admin") {
      return res.redirect("/error");
    }
    return res.render("admin", {
      title: "Admin",
      firstName: req.session.user.firstName,
      currentTime,
    });
  }
});

router.route("/error").get(async (req, res) => {
  return res.render("error", {
    title: "Error",
    statusCode: 403,
    message: "You do not have permission to view this page",
  });
});

router.route("/logout").get(async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log("Error destroying session:", error);
      return res.status(500).send("Error occurred while logging out");
    }
    return res.render("logout");
  });
});
export default router;
