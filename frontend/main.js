console.log("script is connected!");

const userFormDiv = document.querySelector("#userFormDiv");
const logInSignIn = document.querySelector("#logInSignIn");
const quoteDiv = document.querySelector('#quoteDiv');

const inputForm = document.createElement("div");
const userNameInput = document.createElement("input");
const userPasswordInput = document.createElement("input");
const userInlogBtn = document.createElement("button");

const goToSignUpBtn = document.createElement("button");
const textDisclaimer = document.createElement("p");

inputForm.setAttribute("class", "inputForm");
inputForm.setAttribute("id", "inputForm");

let inputFormVisible = false;

const loggedInUser = localStorage.getItem('userName');
if (loggedInUser ) {
  quoteDiv.innerText = `Welcome ${loggedInUser}`;
} else {
  quoteDiv.innerHTML = '"Beauty is in the eye of the beholder."';
}

function handleLogin() {
  console.log("click");
  inputFormVisible = !inputFormVisible;

  const loggedInUser = localStorage.getItem('userName');
  if (loggedInUser) {
    logoutSection();

  } else {
    renderInputField();
  }

  if (inputFormVisible) {
    logInSignIn.innerHTML = "CLOSE";
  } else {
    logInSignIn.innerHTML = "person";
  }
}

logInSignIn.addEventListener('click', handleLogin);

// logInSignIn.addEventListener("click", () => {

//   renderInputField();
// });

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
  }

  userInlogBtn.addEventListener("click", () => {
    console.log('logga in')
    let loginUser = {
      email: userNameInput.value,
      password: userPasswordInput.value
    }
    console.log(loginUser);

    fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser)
    })
    .then(result => result.json())
    .then(data => {
      console.log(data)
      if(data.email) {
        console.log(data.email)
        quoteDiv.innerHTML = `Welcome ${data.email}`;
        localStorage.setItem("userName", loginUser.email);
        userFormDiv.innerHTML = "";
        logInSignIn.innerHTML = "person";
        inputForm.innerHTML = "";
        logoutSection() 
        // renderLoggedInDiv(loginUser);
      }
      else {
        console.log('login failed.')

      }

    })

  })

}


function logoutSection() {
  if (inputFormVisible) {

    logInSignIn.innerHTML = "CLOSE";
    inputForm.style.display = "block";
    inputForm.innerHTML = "";

    const userThings = document.createElement('p');
    
    goToSignUpBtn.setAttribute("id", "goToSignUpBtn");
    goToSignUpBtn.setAttribute("class", "logoutBtn");

    textDisclaimer.textContent = "YOUR ACCOUNT: ";
    userThings.innerHTML = `
    My Orders <br>
    My Wishlist <br>
    My Settings <br><br>
    `;

    goToSignUpBtn.textContent = "LOG OUT >> ";

    inputForm.appendChild(textDisclaimer);
    textDisclaimer.appendChild(userThings);
    userThings.appendChild(goToSignUpBtn);
    userFormDiv.appendChild(inputForm);
  }
  else {
    logInSignIn.innerHTML = "person";
    inputForm.style.display = "none";
  }

  goToSignUpBtn.addEventListener('click', () => {
    console.log('LOG OUT & REMOVE NAME LOCALSTORAGE');
    localStorage.removeItem('userName');
    userFormDiv.innerHTML = '';
    userNameInput.value ='';
    userPasswordInput.value = '';
    quoteDiv.innerHTML = '';
    quoteDiv.innerHTML = '"Beauty is in the eye of the beholder."';
    handleLogin();

  })
}