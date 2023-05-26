import { usersCollection } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateRole,
} from "../helpers.js";

export const createUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  if (!firstName || !lastName || !emailAddress || !password || !role) {
    throw new Error("All fields are required");
  }
  if (
    typeof firstName === "undefined" ||
    typeof lastName === "undefined" ||
    typeof emailAddress === "undefined" ||
    typeof password === "undefined" ||
    typeof role === "undefined"
  ) {
    throw new Error("All parameters must be passed");
  }
  validateName(firstName);
  validateName(lastName);
  const users = await usersCollection();

  validateEmail(emailAddress);
  emailAddress = emailAddress.trim();
  emailAddress = emailAddress.toLowerCase();
  const exist_email = await users.findOne({ emailAddress: emailAddress });
  if (exist_email) throw new Error("Already a user registered with that email");

  password = password.trim();
  validatePassword(password);
  const hashPW = await bcrypt.hash(password, 10);

  validateRole(role);
  const newUser = {
    _id: new ObjectId(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    emailAddress: emailAddress,
    password: hashPW,
    role: role,
  };
  const insertedUser = await users.insertOne(newUser);
  if (insertedUser) {
    return { insertedUser: true };
  } else {
    throw new Error("Insertion of user failed");
  }
};

export const checkUser = async (emailAddress, password) => {
  validateEmail(emailAddress);
  emailAddress = emailAddress.trim();
  emailAddress = emailAddress.toLowerCase();
  const users = await usersCollection();
  const user = await users.findOne({ emailAddress: emailAddress });
  if (!user) {
    throw new Error("Either the email address or password is invalid");
  }
  let firstName = user.firstName;
  let lastName = user.lastName;
  let role = user.role;
  if (
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
      password
    )
  ) {
    throw new Error(
      "Password must have at least one uppercase character, one number, one special character, and be at least 8 characters long"
    );
  }
  const compare_password = await bcrypt.compare(password, user.password);
  if (!compare_password) {
    throw new Error("Either the email address or password is invalid");
  }
  return { firstName, lastName, emailAddress, role };
};
