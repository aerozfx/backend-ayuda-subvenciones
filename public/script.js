const showGrantFromBtn = document.querySelector("#show_grantForm");
const showUserFromBtn = document.querySelector("#show_userForm");
const submitBtn = document.querySelector("#submit_btn.btn");
const sectionGrantForm = document.querySelector(".dashboard_grantForm");
const userForm = document.querySelector(".admin_userFrom");
const inputId = document.querySelector("#id");
const inputMrr = document.getElementById("mrr");
const inputAdmin = document.querySelector("#admin");
const inputDep = document.querySelector("#dep");
const inputOrg = document.querySelector("#Organizacion");
const inputDate = document.querySelector("#date");
const inputTitle = document.querySelector("#title");
const inputTitleCo = document.querySelector("#title-co");
const inputLink = document.querySelector("#link");
const grantForm = document.querySelector("#grantForm");

console.log(showGrantFromBtn);
showGrantFromBtn.addEventListener("click", () =>
  sectionGrantForm.classList.toggle("hidden")
);
showUserFromBtn.addEventListener("click", () =>
  userForm.classList.toggle("hidden")
);

function selectElement(selector) {
  return document.querySelector(selector);
}
function selectElements(selectors) {
  return document.querySelectorAll(selectors);
}

function setEventListener(element, eventType, functionToExe) {
  return element?.addEventListener(eventType, functionToExe);
}

const profileFormToggleBtn = selectElement("#profileForm_toggleBtn");
const profileFormSection = selectElement("#profileForm_section");
setEventListener(profileFormToggleBtn, "click", () =>
  profileFormSection.classList.toggle("hidden")
);
