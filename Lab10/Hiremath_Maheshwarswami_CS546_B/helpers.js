const validateEmail = (email, inputId) => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!email || !emailRegex.test(email)) {
    const error = new Error("Invalid email address");
    error.inputId = inputId;
    throw error;
  }
};
const validateStringInput = (input, inputId) => {
  if (!input && typeof input !== "string") {
    const error = new Error(`${input} must be a string`);
    error.inputId = inputId;
    throw error;
  } else if (input.trim().length === 0) {
    const error = new Error(`${input} cannot be an empty string`);
    error.inputId = inputId;
    throw error;
  }
};

const validateName = (name, inputId) => {
  validateStringInput(name, inputId);
  if (!/^[a-zA-Z]{2,25}$/.test(name)) {
    const error = new Error(`${name} must be between 2 to 25 characters long`);
    error.inputId = inputId;
    throw error;
  }
};
const validatePassword = (password, inputId) => {
  validateStringInput(password, inputId);
  if (
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
      password
    )
  ) {
    const error = new Error(
      "Password must have at least one uppercase character, one number, one special character, and be at least 8 characters long"
    );
    error.inputId = inputId;
    throw error;
  }
};
const validateConfirmPassword = (password, confirmPassword, inputId) => {
  if (password !== confirmPassword) {
    const error = new Error("Passwords do not match");
    error.inputId = inputId;
    throw error;
  }
  validatePassword(password, inputId);
};

const validateRole = (role, inputId) => {
  validateStringInput(role, inputId);
  if (!role || (role !== "admin" && role !== "user")) {
    const error = new Error('Role must be either "admin" or "user"');
    error.inputId = inputId;
    throw error;
  }
};
export {
  validateEmail,
  validateStringInput,
  validateName,
  validatePassword,
  validateRole,
  validateConfirmPassword,
};
