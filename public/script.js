
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

//showGrantFromBtn.addEventListener("click", () => sectionGrantForm.classList.toggle('hidden'));
//showUserFromBtn.addEventListener("click", () => userForm.classList.toggle('hidden'));

function selectElement(selector) {
  return document.querySelector(selector);
};
function selectElements(selectors) {
  return document.querySelectorAll(selectors);
};

function setEventListener(element, eventType, functionToExe) {
  return element?.addEventListener(eventType, functionToExe);
};


// const profileFormToggleBtn = selectElement("#profileForm_toggleBtn");
// const profileFormSection = selectElement("#profileForm_section");
// setEventListener(profileFormToggleBtn, "click", () => profileFormSection.classList.toggle("hidden"));





/*INSPIRACION document.querySelectorAll(".grantCard").forEach(node=> console.log(node))*/
//console.log(grantCards[0].textContent.split(":")[1])

/* console.log(grantsId[1].outerText.split(":")[1]);

deleteGrantBtn.addEventListener('click', async (e) => {
  try {
    const getGrantId = () => {

      for (let i = 0; i < grantsId.length; i++) {

        let grantId = grantsId[i].outerText.split(":")[1];
      };

    }
    await fetch(`/api/ads/${grantId}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        credentials: "include"
      },
      body: JSON.stringify({ id: grantId })
    })
  }
  catch (error) {
    console.error(error);
  }
})
 */

grantCard.forEach((node) => {
  let grantId = node.childNodes[0].firstChild.outerText.split(":")[1]
  let button = node.querySelector(".btn")
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      node.style.display = "none"
      await fetch(`/api/grants/${grantId}`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          credentials: "include"
        },
        body: JSON.stringify({ id: grantId })
      })
    }
    catch (error) {
      console.error(error);
    }
  })
})



/* for (let i = 0; i < grantCard.length; i++) {
  deleteGrantBtn.addEventListener('click', async (e) => {
    try {
      let grantId = grantsId[i].outerText.split(":")[0];
      await fetch(`/api/ads/${grantId}`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          credentials: "include"
        },
        body: JSON.stringify({ id: grantId })
      })
    }
    catch (error) {
      console.error(error);
    }
  })
} */