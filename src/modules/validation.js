import { openModal } from "./modal";
import { sendFormData } from "./sendFormData";
const form = document.getElementById("form");
const nameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const inputControls = document.querySelectorAll(".input-control");

const fields = {
  username: {
    element: nameInput,
    required: true,
    errorMessage: "Имя обязательное поле",
  },
  email: {
    element: emailInput,
    required: true,
    errorMessage: "E-mail обязателен для заполнения",
    validator: isValidEmail,
    validatorErrorMessage: "Введите корректный адрес электронной почты",
  },
  phone: {
    element: phoneInput,
    required: true,
    errorMessage: "Телефон обязателен для заполнения",
  },
  message: {
    element: messageInput,
    required: true,
    errorMessage: "Поле обязательно для заполнения",
  },
};

const errors = {};
let isValid = false;

function isValidEmail(email) {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(String(email).toLowerCase());
}

function cleanClasses() {
  inputControls.forEach((control) => {
    control.classList.remove("success");
  });
}

function cleanFields() {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  messageInput.value = "";
}

function setError(element, message) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
}

function setSuccess(element) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
}

function validateField(field) {
  const inputValue = field.element.value.trim();
  if (field.required && inputValue === "") {
    setError(field.element, field.errorMessage);
    errors[field.element.id] = field.errorMessage;
    isValid = false;
  } else if (field.validator && !field.validator(inputValue)) {
    setError(field.element, field.validatorErrorMessage);
    errors[field.element.id] = field.validatorErrorMessage;
    isValid = false;
  } else {
    setSuccess(field.element);
    delete errors[field.element.id];
    isValid = true;
  }
}

for (const fieldName in fields) {
  const field = fields[fieldName];
  field.element.addEventListener("input", () => {
    validateField(field);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  for (const fieldName in fields) {
    validateField(fields[fieldName]);
  }

  if (isValid && Object.keys(errors).length === 0) {
    const data = {
      username: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      message: messageInput.value,
    };

    // sendFormData(data);
    openModal("Форма отправлена успешно");
    cleanFields();
    cleanClasses();
  } else {
    openModal("Заполните все поля");
    console.log("Форма не валидна", errors);
  }
});
