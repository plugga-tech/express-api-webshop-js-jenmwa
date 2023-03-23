console.log("script is connected!");

const userFormDiv = document.querySelector("#userFormDiv");
const logInSignIn = document.querySelector("#logInSignIn");
const inputForm = document.createElement("div");
const userInlogBtn = document.createElement("button");
const userNameInput = document.createElement("input");
const userPasswordInput = document.createElement("input");
inputForm.setAttribute("class", "inputForm");
inputForm.setAttribute("id", "inputForm");

let inputFormVisible = false;

logInSignIn.addEventListener("click", () => {
  console.log("click");
  inputFormVisible = !inputFormVisible;
  renderInputField();
});

function renderInputField() {
  if (inputFormVisible) {
    logInSignIn.innerHTML = "CLOSE";
    inputForm.style.display = "block";
    inputForm.innerHTML = "";

    const userNameLabel = document.createElement("label");
    const userPasswordLabel = document.createElement("label");
    userNameLabel.textContent = "email: ";
    userPasswordLabel.textContent = "password: ";

   
    userInlogBtn.setAttribute("id", "userLoginBtn");
    userInlogBtn.setAttribute("class", "logged-out");
    userInlogBtn.disabled = true;

    const textDisclaimer = document.createElement("p");
    const goToSignUpBtn = document.createElement("button");
    goToSignUpBtn.setAttribute("id", "goToSignUpBtn");
    goToSignUpBtn.setAttribute("class", "goToBtn");

    userInlogBtn.textContent = "LOG IN";
    textDisclaimer.textContent = "Want to create an account?";
    goToSignUpBtn.textContent = " SIGN UP >> ";

    inputForm.appendChild(userNameLabel);
    userNameLabel.appendChild(userNameInput);
    inputForm.appendChild(userPasswordLabel);
    userPasswordLabel.appendChild(userPasswordInput);

    inputForm.appendChild(userInlogBtn);
    inputForm.appendChild(textDisclaimer);
    textDisclaimer.appendChild(goToSignUpBtn);

    userFormDiv.appendChild(inputForm);

    function checkInput() {
      const name = userNameInput.value;
      const password = userPasswordInput.value;

      if (name && password) {
        userInlogBtn.disabled = false;
        userInlogBtn.classList.add("btnOk");
      } else {
        userInlogBtn.disabled = true;
      }
    }
    userNameInput.addEventListener("input", checkInput);
    userPasswordInput.addEventListener("input", checkInput);
  } 
  else {
    logInSignIn.innerHTML = "person";
    inputForm.style.display = "none";
    userFormDiv.removeChild(inputForm);
  }

  userInlogBtn.addEventListener("click", () => {
    console.log('logga in')
    let loginUser = {
      email: userNameInput.value,
      password: userPasswordInput.value
    }
    console.log(loginUser);

    

  })
}
