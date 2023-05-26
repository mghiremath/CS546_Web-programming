function validateName(name, inputId) {
  validateStringInput(name, inputId);
  if (!/^[a-zA-Z]{2,25}$/.test(name)) {
    const error = new Error(`${name} must be between 2 to 25 characters long`);
    error.inputId = inputId;
    throw error;
  } else return true;
}

function validateStringInput(input, inputId) {
  if (!input && typeof input !== "string") {
    const error = new Error(`${input} must be a string`);
    error.inputId = inputId;
    throw error;
  } else if (input.trim().length === 0) {
    const error = new Error(`${input} cannot be an empty string`);
    error.inputId = inputId;
    throw error;
  } else return true;
}

function validateEmail(email, inputId) {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!email || !emailRegex.test(email)) {
    const error = new Error("Invalid email address");
    error.inputId = inputId;
    throw error;
  } else return true;
}

function validatePassword(password, inputId) {
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
  } else return true;
}
function validateConfirmPassword(password, confirmPassword, inputId) {
  validatePassword(password, inputId);

  if (password !== confirmPassword) {
    const error = new Error("Passwords do not match");
    error.inputId = inputId;
    throw error;
  } else return true;
}

function validateRole(role, inputId) {
  validateStringInput(role, inputId);

  if (!role || (role !== "admin" && role !== "user")) {
    const error = new Error('Role must be either "admin" or "user"');
    error.inputId = inputId;
    throw error;
  } else return true;
}

function displayErrorMessage(message, inputElement) {
  const errorElement = document.createElement("div");
  errorElement.innerText = message;
  errorElement.className = "error-message";
  inputElement.parentNode.appendChild(errorElement);
}

function clearErrorMessages() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => element.remove());
}
document.addEventListener("DOMContentLoaded", () => {
  const reg_form = document.getElementById("registration-form");
  const firstName_error = document.getElementById("firstName_error");
  const lastName_error = document.getElementById("lastName_error");
  const emailAddress_error = document.getElementById("emailAddress_error");
  const password_error = document.getElementById("password_error");
  const confirmPassword_error = document.getElementById(
    "confirmPassword_error"
  );
  const role_error = document.getElementById("role_error");
  const other_error = document.getElementById("other_error");
  if (reg_form) {
    reg_form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrorMessages();

      const firstNameInput = e.target.firstNameInput;
      const lastNameInput = e.target.lastNameInput;
      const emailAddressInput = e.target.emailAddressInput;
      const passwordInput = e.target.passwordInput;
      const confirmPasswordInput = e.target.confirmPasswordInput;
      const roleInput = e.target.roleInput;

      try {
        if (validateName(firstNameInput.value, "firstNameInput")) {
          firstName_error.innerText = "";
        } else {
          firstName_error.innerText =
            "First Name must be between 2 to 25 characters long";
        }
        if (validateName(lastNameInput.value, "lastNameInput")) {
          lastName_error.innerText = "";
        } else {
          lastName_error.innerText =
            "Last Name must be between 2 to 25 characters long";
        }
        if (validateEmail(emailAddressInput.value, "emailAddressInput")) {
          emailAddress_error.innerText = "";
        } else {
          emailAddress_error.innerText = "Invalid email address";
        }
        if (validatePassword(passwordInput.value, "passwordInput")) {
          password_error.innerText = "";
        } else {
          password_error.innerText =
            "Password must have at least one uppercase character, one number, one special character, and be at least 8 characters long";
        }
        if (
          validateConfirmPassword(
            passwordInput.value,
            confirmPasswordInput.value,
            "confirmPasswordInput"
          )
        ) {
          confirmPassword_error.innerText = "";
        } else {
          confirmPassword_error.innerText =
            "Password must have at least one uppercase character, one number, one special character, and be at least 8 characters long";
        }
        if (validateRole(roleInput.value, "roleInput")) {
          role_error.innerText = "";
        } else {
          role_error.innerText = 'Role must be either "admin" or "user"';
        }
        e.target.submit();
      } catch (error) {
        const inputElement = document.getElementById(error.inputId);
        displayErrorMessage(error.message, inputElement);
      }
    });
  }
  const login_form = document.getElementById("login-form");
  if (login_form) {
    login_form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrorMessages();

      const emailAddressInput = document.getElementById("emailAddressInput");
      const passwordInput = document.getElementById("passwordInput");

      try {
        if (validateEmail(emailAddressInput.value, "emailAddressInput")) {
          emailAddress_error.innerText = "";
        } else {
          const error = new Error("Invalid Credentials");
          error.inputId = "emailAddressInput";
          throw error;
        }
        if (validatePassword(passwordInput.value, "passwordInput")) {
          emailAddress_error.innerText = "";
        } else {
          const error = new Error("Invalid Credentials");
          error.inputId = "passwordInput";
          throw error;
        }
        e.target.submit();
      } catch (error) {
        const inputElement = document.getElementById(error.inputId);
        displayErrorMessage(error.message, inputElement);
      }
    });
  }
});
