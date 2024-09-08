// SELECT HTML ELEMENTS
const mainApp = document.querySelector(".main-app");
const allStepsForms = document.querySelectorAll(".main-step");
const fullNameInp = document.querySelector(".name-inp");
const emailInp = document.querySelector(".email-inp");
const phoneNumberInp = document.querySelector(".phone-number-inp");
const step1Inputs = document.querySelectorAll(".step-1--inp");
const submitBtn1 = document.querySelector(".submit-btn--1");
const submitBtn2 = document.querySelector(".submit-btn--2");
const submitBtn3 = document.querySelector(".submit-btn--3");
const submitBtn4 = document.querySelector(".submit-btn--4");
const allSteps = document.querySelectorAll(".step-number");
const toggleForm = document.querySelector(".toggle-form");
const toggleBtn = document.querySelector(".toggle-input");
const plans = document.querySelectorAll(".plan");
const ons = document.querySelectorAll(".ons");
const goBackBtns = document.querySelectorAll(".previos-step");
const choosenOnsSection = document.querySelector(".choosen-ons-sec");
const thankYouScreen = document.querySelector(".thank-you-screen");

// VARIABLES
const userDataObj = {};
const validEmail = [
  "gmail.com",
  "gmail.net",
  "hotmail.net",
  "hotmail.com",
  "yahoo.mail",
];
const phoneNumberLength = 14;
const planMonthlyPrice = ["$9/mo", "$12/mo", "$15/mo"];
const planYearlyPrice = ["$90/yr", "$120/yr", "$150/yr"];
const onsMonthlyPrice = ["$1/mo", "$2/mo", "$2/mo"];
const onsYearlyPrice = ["$10/yr", "$20/yr", "$20/yr"];

// DISPLAY THE ACTIVE STEP FORM
function showActiveStepForm(active) {
  if (active == 5) {
    allStepsForms[3].classList.add("hidden");
    allSteps[3].classList.remove("active-step");
    thankYouScreen.classList.remove("hidden");
    return;
  }

  allStepsForms.forEach((step) => {
    step.id == active
      ? step.classList.remove("hidden")
      : step.classList.add("hidden");
  });

  allSteps.forEach((el) => {
    el.id == active
      ? el.classList.add("active-step")
      : el.classList.remove("active-step");
  });
}

// INITIAL DISPLAY
showActiveStepForm(1);

function getValidPrice(price) {
  return +price.split("/")[0].slice(1);
}

function resetMessage(messEl) {
  messEl.classList = "message";
  messEl.innerHTML = "";
}

function unValidInput(messEl, message) {
  messEl.classList.add("error");
  messEl.innerHTML = message;
}

function checkNameValid(input) {
  const userInput = input.value;
  const message = input.nextElementSibling;
  // if the input is empty reset the error message to ""
  if (!userInput) return resetMessage(message);

  const firstLetterASCII = userInput[0].charCodeAt();

  // charCode for the first letter should be between 65 => 90
  // OR   97 => 122
  if (
    !(
      (firstLetterASCII >= 65 && firstLetterASCII <= 90) ||
      (firstLetterASCII >= 97 && firstLetterASCII <= 122)
    )
  ) {
    unValidInput(
      message,
      "First character should be a letter upper or lower CASE"
    );
    return;
  }

  // username should contains atleast two words
  if (userInput.split(" ").length < 2 || !userInput.split(" ")[1]) {
    unValidInput(message, "UserName should contains atleast two words !");
    return;
  }

  if (userInput.length < 8)
    return unValidInput(message, "Username is too short");

  // username can only contains LETTERS and NUMBERS and DASH-SIGN (-)

  if (
    userInput.split("").some((char) => {
      const chCode = char.charCodeAt();
      return !(
        (chCode >= 65 && chCode <= 90) ||
        (chCode >= 97 && chCode <= 122) ||
        (chCode >= 48 && chCode <= 57) ||
        chCode == 32
      );
    })
  ) {
    unValidInput(message, "UserName shoud contain only letters and numbers");
    return;
  }

  if (userInput.length > 12) {
    unValidInput(message, "User name is too long");
    return;
  }

  resetMessage(message);
}

function checkEmailValid(input) {
  const userInput = input.value;
  const message = input.nextElementSibling;
  const emailParts = userInput.split("@");
  const emailName = emailParts[0];
  const emailLast = emailParts[1];
  if (!userInput) return resetMessage(message);

  if (emailName.length < 8) {
    unValidInput(message, "Email is too short... try somthing longer");
    return;
  }

  if (
    [...emailName].some((char) => {
      const chCode = char.charCodeAt();
      return !(
        (chCode >= 97 && chCode <= 122) ||
        (chCode >= 48 && chCode <= 57)
      );
    })
  ) {
    unValidInput(
      message,
      "Email name should includes ONLY lowerCase letters and numbers"
    );
    return;
  }

  if (emailParts.length == 1) return unValidInput(message, "UnValid email !");

  if (userInput.slice(-1) == " ") {
    input.value = [...userInput].filter((el) => el != " ").join("");
    return;
  }

  if (isFinite(emailName[0])) {
    return unValidInput(message, "Email name can't start with a number");
  }

  if (
    (emailParts.length == 2 && !validEmail.includes(emailLast)) ||
    emailParts.length > 2
  ) {
    unValidInput(message, "UnValid email !");
    return;
  }

  resetMessage(message);
}

function checkPhoneValid(input) {
  const userInput = input.value;
  const message = input.nextElementSibling;

  if (userInput.length < phoneNumberLength)
    return unValidInput(message, "The number must consist of 9 numbers");

  if (userInput.split(" ").length != 2)
    return unValidInput(message, "Unvalid number");

  resetMessage(message);
}

[...step1Inputs].forEach((inp) => {
  inp.addEventListener("input", function (e) {
    switch (inp.id) {
      case "name": {
        checkNameValid(inp);
        break;
      }
      case "email": {
        checkEmailValid(inp);
        break;
      }
      case "phone-num": {
        checkPhoneValid(inp);
        break;
      }
    }
  });
});

[...step1Inputs].forEach((inp) => {
  inp.addEventListener("change", function (e) {
    if (e.target.value != "" && e.target.nextElementSibling.innerHTML == "") {
      e.target.classList.add("valid-input");
    } else e.target.classList.remove("valid-input");
  });
});

phoneNumberInp.addEventListener("keydown", function (e) {
  if (
    (phoneNumberInp.value == "+963 " && e.key == "Backspace") ||
    !(isFinite(e.key) || e.key == "Backspace") ||
    e.key == " "
  ) {
    return e.preventDefault();
  }

  if (phoneNumberInp.value.length == phoneNumberLength && e.key != "Backspace")
    return e.preventDefault();
});

toggleBtn.addEventListener("change", function (e) {
  toggleForm
    .querySelectorAll("p")
    .forEach((p) => p.classList.toggle("toggled"));
  if (e.target.checked) {
    plans.forEach((plan, i) => {
      const priceEl = plan.querySelector("p");
      priceEl.innerHTML = planYearlyPrice[i];

      plan.querySelector(".sale-out").innerHTML = "2 months free";
    });

    ons.forEach((ons, i) => {
      const priceEl = ons.querySelector(".ons-price");
      priceEl.innerHTML = onsYearlyPrice[i];
    });
  } else {
    plans.forEach((plan, i) => {
      const priceEl = plan.querySelector("p");
      priceEl.innerHTML = planMonthlyPrice[i];

      plan.querySelector(".sale-out").innerHTML = "";
    });

    ons.forEach((ons, i) => {
      const priceEl = ons.querySelector(".ons-price");
      priceEl.innerHTML = onsMonthlyPrice[i];
    });
  }
});

plans.forEach((plan) => {
  plan.addEventListener("click", function (e) {
    if (plan.classList.contains("selected-plan")) {
      plan.classList.remove("selected-plan");
    } else {
      document
        .querySelector(".selected-plan")
        ?.classList.remove("selected-plan");
      plan.classList.add("selected-plan");
    }

    const errorMessage = document.querySelector(".plan-error");
    if (errorMessage.textContent) errorMessage.textContent = "";
  });
});

ons.forEach((el) => {
  el.addEventListener("click", function (e) {
    const onsEl = e.target.closest(".ons");
    onsEl.classList.toggle("selected-ons");
  });
});

goBackBtns.forEach((btn) =>
  btn.addEventListener("click", () => showActiveStepForm(btn.id - 1))
);

submitBtn1.addEventListener("click", function (e) {
  e.preventDefault();

  const inputs = [...e.target.closest("form").querySelectorAll("input")];

  if (inputs.every((inp) => inp.classList.contains("valid-input"))) {
    const user = {};
    inputs.forEach((inp) => {
      switch (inp.id) {
        case "name": {
          user.name = inp.value;
          break;
        }
        case "email": {
          user.email = inp.value;
          break;
        }
        case "phone-num": {
          user.phone = inp.value;
          break;
        }
      }
    });

    userDataObj.user = user;
    showActiveStepForm(2);

    submitBtn2.disabled = true;
    setTimeout(() => (submitBtn2.disabled = false), 1000);
  } else {
    inputs.forEach((inp) => {
      if (!inp.classList.contains("valid-input")) {
        inp.nextElementSibling;
        unValidInput(inp.nextElementSibling, "This field is required !");
      }
    });
  }
});

submitBtn2.addEventListener("click", function (e) {
  e.preventDefault();
  const selectedPlan = document.querySelector(".selected-plan");
  if (!selectedPlan)
    return (document.querySelector(".plan-error").innerHTML =
      "You should pick a plan !");

  const plan = {};
  plan.priceType = document.querySelector(".toggled").textContent;
  plan.price = selectedPlan.querySelector("p").textContent;
  plan.name = selectedPlan.querySelector("h3").textContent;

  userDataObj.plan = plan;
  showActiveStepForm(3);

  submitBtn3.disabled = true;
  setTimeout(() => (submitBtn3.disabled = false), 1000);
});

submitBtn3.addEventListener("click", function (e) {
  e.preventDefault();

  const onsArray = [];

  const selectedOns = document.querySelectorAll(".selected-ons");
  selectedOns?.forEach((ons) => {
    const onsObj = {};
    onsObj.name = ons.querySelector("h4").textContent;
    onsObj.price = ons.querySelector(".ons-price").textContent;
    onsArray.push(onsObj);
  });

  userDataObj.ons = onsArray;
  showActiveStepForm(4);

  const choosenPlan = document.querySelector(".choosen-plan");
  choosenPlan.querySelector(
    ".choosen-plan-name"
  ).textContent = `${userDataObj.plan.name} (${userDataObj.plan.priceType})`;
  choosenPlan.querySelector(".choosen-plan-price").textContent =
    userDataObj.plan.price;

  // const grayLine = document.querySelector(".gray-line");
  const totalSection = document.querySelector(".total-sec");

  choosenOnsSection.innerHTML = "";
  userDataObj.ons?.forEach((ons) => {
    const div = document.createElement("div");
    div.classList.add("choosen-ons");
    div.innerHTML = `
    <p class='name'>${ons.name}</p>
    <p style="color: hsl(213, 96%, 18%)">${ons.price}</p> 
    `;

    choosenOnsSection.append(div);
  });

  totalSection.querySelector("p").textContent = `Total (per ${
    userDataObj.plan.priceType == "Monthly" ? "month" : "year"
  })`;

  const totalPrice =
    getValidPrice(userDataObj.plan.price) +
    userDataObj.ons.reduce((acc, ons) => acc + getValidPrice(ons.price), 0);

  totalSection.querySelector("h2").textContent = `$${totalPrice}/${
    userDataObj.plan.priceType == "Monthly" ? "mo" : "yr"
  }`;
});

submitBtn4.addEventListener("click", function (e) {
  e.preventDefault();

  showActiveStepForm(5);
  thankYouScreen.querySelector("span").innerHTML = userDataObj.user.name;
});

window.addEventListener("load", () => {
  document.querySelector(".preloader").style.display = "none";
});
