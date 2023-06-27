const showGrantFromBtn = document.querySelector("#show_grantForm");
const showUserFromBtn = document.querySelector("#show_userForm");
const submitBtn = document.querySelector("#submit_btn.btn");
const deleteGrantBtn = document.querySelector('#delete_grant_btn')
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
const grantCard = document.querySelectorAll(".grantCard")

showGrantFromBtn?.addEventListener("click", () =>
  sectionGrantForm.classList.toggle("hidden")
);
showUserFromBtn?.addEventListener("click", () =>
  userForm.classList.toggle("hidden")
);

function selectElement(selector) {
  return document.querySelector(selector);
};
function selectElements(selectors) {
  return document.querySelectorAll(selectors);
};

function setEventListener(element, eventType, functionToExe) {
  return element?.addEventListener(eventType, functionToExe);
};

const profileFormToggleBtn = selectElement("#profileForm_toggleBtn");
const profileFormSection = selectElement("#profileForm_section");
setEventListener(profileFormToggleBtn, "click", () =>
  profileFormSection.classList.toggle("hidden")
);


async function postFavorite(grantId) {
  try {
    await fetch(`http://localhost:3000/api/favorites`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: grantId }),
    });
  } catch (error) {
    console.error(error);
  }
}

async function deleteFavorite(grantId) {
  try {
    await fetch(`http://localhost:3000/api/favorites/${grantId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ id: grantId }),
    });
  } catch (error) {
    console.error(error);
  }
};

selectElements('.addFavorites').forEach(addBtn => addBtn.addEventListener('click', () => postFavorite(addBtn.getAttribute('id'))));
selectElements('.deleteFavorite').forEach(deleteBtn => deleteBtn.addEventListener('click', () => {
  const suffixId = deleteBtn.getAttribute('id');
  selectElement(`#favorite-${suffixId}`).classList.add("hidden");
  deleteFavorite((deleteBtn.getAttribute('id')));
}));
