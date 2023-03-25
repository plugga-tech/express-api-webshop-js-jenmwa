console.log("script is connected!");

let cart = JSON.parse(localStorage.getItem("shopCart")) || [];

const userFormDiv = document.querySelector("#userFormDiv");
const logInSignIn = document.querySelector("#logInSignIn");
const quoteDiv = document.querySelector("#quoteDiv");
const shopCartBtn = document.querySelector("#shopCartBtn");
const productSection = document.querySelector("#productSection");

const inputForm = document.createElement("div");
const userNameInput = document.createElement("input");
const userEmailInput = document.createElement("input");
const userPasswordInput = document.createElement("input");
const userInlogBtn = document.createElement("button");
const goToSignUpBtn = document.createElement("button");
const textDisclaimer = document.createElement("p");

inputForm.setAttribute("class", "inputForm");
inputForm.setAttribute("id", "inputForm");

let inputFormVisible = false;

const loggedInUser = localStorage.getItem("userName");
if (loggedInUser) {
  quoteDiv.innerText = `Welcome ${loggedInUser}`;
} else {
  quoteDiv.innerHTML = '"Beauty is in the eye of the beholder."';
}

function handleLogin() {
  console.log("click");
  inputFormVisible = !inputFormVisible;

  const loggedInUser = localStorage.getItem("userName");
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

logInSignIn.addEventListener("click", handleLogin);

/*******************************************************************
 ******************** LOG IN SECTION ******************************
 *******************************************************************/

function renderInputField() {
  if (inputFormVisible) {
    logInSignIn.innerHTML = "CLOSE";

    inputForm.innerHTML = "";

    const userEmailLabel = document.createElement("label");
    const userPasswordLabel = document.createElement("label");
    userEmailLabel.textContent = "email: ";
    userPasswordLabel.textContent = "password: ";

    userInlogBtn.setAttribute("id", "userLoginBtn");
    userInlogBtn.setAttribute("class", "logged-out");
    userInlogBtn.disabled = true;

    goToSignUpBtn.setAttribute("id", "goToSignUpBtn");
    goToSignUpBtn.setAttribute("class", "goToBtn");

    userInlogBtn.textContent = "LOG IN";
    textDisclaimer.textContent = "Want to create an account?";
    goToSignUpBtn.textContent = " SIGN UP >> ";

    inputForm.appendChild(userEmailLabel);
    userEmailLabel.appendChild(userEmailInput);
    inputForm.appendChild(userPasswordLabel);
    userPasswordLabel.appendChild(userPasswordInput);

    inputForm.appendChild(userInlogBtn);
    inputForm.appendChild(textDisclaimer);
    textDisclaimer.appendChild(goToSignUpBtn);

    userFormDiv.appendChild(inputForm);

    function checkInput() {
      const email = userEmailInput.value;
      const password = userPasswordInput.value;

      if (email && password) {
        userInlogBtn.disabled = false;
        userInlogBtn.classList.add("btnOk");
      } else {
        userInlogBtn.disabled = true;
      }
    }
    userEmailInput.addEventListener("input", checkInput);
    userPasswordInput.addEventListener("input", checkInput);
  } else {
    logInSignIn.innerHTML = "person";
    userFormDiv.innerHTML = "";
  }

  goToSignUpBtn.addEventListener("click", signUpSection);

  userInlogBtn.addEventListener("click", userLogin);

  function userLogin() {
    console.log("logga in");
    let loginUser = {
      email: userEmailInput.value,
      password: userPasswordInput.value,
    };
    console.log(loginUser);

    fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    })
      .then((respons) => {
        if (!respons.ok) {
          throw new Error(respons.statusText);
        }
        return respons.json();
      })
      .then((data) => {
        console.log(data);
        if (data.email) {
          console.log(data.email);
          quoteDiv.innerHTML = `Welcome ${data.email}`;
          localStorage.setItem("userName", loginUser.email);
          logInSignIn.innerHTML = "person";
          userEmailInput.value = "";
          userPasswordInput.value = "";
          logoutSection();
          renderShopCart();
        } else {
          console.log("login failed.");
        }
      })
      .catch((error) => {
        console.error(error);
        handleLoginError(error.message);
      });
  }
}

function handleLoginError(errorMessage) {
  const errorDiv = document.createElement("div");
  errorDiv.setAttribute("class", "loginErrorDiv");

  let errorDivContent = `
    <h2>Error!</h2>
    <p>${errorMessage}</p>
    <p>Woops! Something went wrong. Please try again.</p>
    <p> Go back to <button id="logInBtn" class="goToBtn"> LOG IN >> </button>
  `;
  errorDiv.innerHTML = errorDivContent;

  inputForm.innerHTML = "";
  inputForm.appendChild(errorDiv);

  const backToLoginBtn = document.querySelector("#logInBtn");
  backToLoginBtn.addEventListener("click", () => {
    console.log("go back to log in");
    renderInputField();
  });
}
/*******************************************************************
 ******************** LOG OUT SECTION ******************************
 *******************************************************************/

function logoutSection() {
  if (inputFormVisible) {
    logInSignIn.innerHTML = "CLOSE";
    inputForm.innerHTML = "";

    const userThings = document.createElement("p");

    const logOutBtn = document.createElement("button");
    logOutBtn.setAttribute("id", "logOutBtn");
    logOutBtn.setAttribute("class", "logoutBtn");

    textDisclaimer.textContent = "YOUR ACCOUNT: ";
    userThings.innerHTML = `
    My Orders <br>
    My Wishlist <br>
    My Settings <br><br>
    `;

    logOutBtn.textContent = "LOG OUT >> ";

    inputForm.appendChild(textDisclaimer);
    textDisclaimer.appendChild(userThings);
    userThings.appendChild(logOutBtn);
    userFormDiv.appendChild(inputForm);

    logOutBtn.addEventListener("click", logoutHandler);
  } else {
    logInSignIn.innerHTML = "person";
    userFormDiv.innerHTML = "";
  }
}

function logoutHandler() {
  console.log("LOG OUT & REMOVE NAME LOCALSTORAGE");
  localStorage.removeItem("userName");
  userFormDiv.innerHTML = "";
  userNameInput.value = "";
  userEmailInput.value = "";
  userPasswordInput.value = "";
  quoteDiv.innerHTML = "";
  quoteDiv.innerHTML = '"Beauty is in the eye of the beholder."';
  renderShopCart();
  handleLogin();
}

/*******************************************************************
 ******************** SIGN UP SECTION ******************************
 *******************************************************************/

function signUpSection() {
  console.log("at signup");

  inputForm.innerHTML = "";

  const userNameLabel = document.createElement("label");
  const userEmailLabel = document.createElement("label");
  const userPasswordLabel = document.createElement("label");
  const userCreateBtn = document.createElement("button");

  userNameLabel.textContent = "name: ";
  userEmailLabel.textContent = "email: ";
  userPasswordLabel.textContent = "password: ";

  userCreateBtn.setAttribute("id", "userCreateBtn");
  userCreateBtn.setAttribute("class", "logged-out");
  userCreateBtn.disabled = true;

  const gotoLogInBtn = document.createElement("button");

  gotoLogInBtn.setAttribute("id", "gotoLogInBtn");
  gotoLogInBtn.setAttribute("class", "goToBtn");

  userCreateBtn.textContent = "CREATE ACCOUNT";
  textDisclaimer.textContent = "Already have an account?";
  gotoLogInBtn.textContent = " LOG IN >> ";

  inputForm.appendChild(userNameLabel);
  userNameLabel.appendChild(userNameInput);
  inputForm.appendChild(userEmailLabel);
  userEmailLabel.appendChild(userEmailInput);
  inputForm.appendChild(userPasswordLabel);
  userPasswordLabel.appendChild(userPasswordInput);

  inputForm.appendChild(userCreateBtn);
  inputForm.appendChild(textDisclaimer);
  textDisclaimer.appendChild(gotoLogInBtn);

  userFormDiv.appendChild(inputForm);

  function checkInput() {
    const name = userNameInput.value;
    const password = userPasswordInput.value;
    const email = userEmailInput.value;

    if (name && password && email) {
      userCreateBtn.disabled = false;
      userCreateBtn.classList.add("btnOk");
    } else {
      userCreateBtn.disabled = true;
    }
  }
  userNameInput.addEventListener("input", checkInput);
  userPasswordInput.addEventListener("input", checkInput);
  userEmailInput.addEventListener("input", checkInput);

  userCreateBtn.addEventListener("click", createUser);

  gotoLogInBtn.addEventListener("click", renderInputField);
}

/*******************************************************************
 ****************** CREATEUSER SECTION ****************************
 *******************************************************************/

function createUser() {
  console.log("create");

  let newUser = {
    name: userNameInput.value,
    email: userEmailInput.value,
    password: userPasswordInput.value,
  };

  console.log(newUser);

  fetch("http://localhost:3000/api/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((respons) => {
      if (!respons.ok) {
        throw new Error(respons.statusText);
      }
      return respons.json();
    })
    .then((data) => {
      console.log(data);
      signUpOk(newUser);
    })
    .catch((error) => {
      console.error(error);
      handleSignUpError(error.message);
    });

  userNameInput.value = "";
  userPasswordInput.value = "";
  userEmailInput.value = "";
}

function handleSignUpError(errorMessage) {
  const errorDiv = document.createElement("div");
  errorDiv.setAttribute("class", "signUpErrorDiv");

  let errorDivContent = `
    <h2>Error!</h2>
    <p>${errorMessage}</p>
    <p>Woops! Something went wrong. Please try again</p>
    <p> Go back to <button id="backToSignUpBtn" class="goToBtn"> SIGN UP >> </button>
  `;
  errorDiv.innerHTML = errorDivContent;

  inputForm.innerHTML = "";
  inputForm.appendChild(errorDiv);

  const backToSignUpBtn = document.querySelector("#backToSignUpBtn");
  backToSignUpBtn.addEventListener("click", () => {
    console.log("go back to sign up");
    signUpSection();
  });
}

function signUpOk(newUser) {
  logInSignIn.innerHTML = "CLOSE";
  inputForm.style.display = "block";
  inputForm.innerHTML = "";

  const mainDiv = document.createElement("div");
  mainDiv.setAttribute("class", "signUpSuccessfullDiv");

  let mainDivContent = `
  <h2>Hello ${newUser.name}!</h2>
  <p>You account was successfully created and you can now log in!</p>
  <p> Go to <button id="logInBtn" class="goToBtn"> LOG IN >> </button>
  `;
  mainDiv.innerHTML = mainDivContent;

  inputForm.appendChild(mainDiv);

  const logInBtn = document.querySelector("#logInBtn");

  logInBtn.addEventListener("click", () => {
    console.log("account created and go to login");
    renderInputField();
  });
}

/*******************************************************************
 ******************* RENDER CATEGORIES BTNS ************************
 *******************************************************************/

function showCategory() {
  fetch("http://localhost:3000/api/categories")
    .then((respons) => respons.json())
    .then((data) => {
      console.log(data);
      renderCategoryHtml(data);
    })
  .catch((error) => {
    console.error(error);
  //   handleProductError(error.message);
  });
}

function renderCategoryHtml(data) {
  const categorySection = document.querySelector("#categorySection");
  const categoryMainDiv = document.createElement("div");
  categoryMainDiv.setAttribute("class", "categoryMainDiv");

  const allProductsBtnDiv = document.createElement('div');
  const showAllProductsBtn = document.createElement('button');
  showAllProductsBtn.innerText = "All Products";
  showAllProductsBtn.addEventListener('click', () => {
    console.log('SHOW ALL PRODUCTS');
  })
  allProductsBtnDiv.appendChild(showAllProductsBtn);
  categoryMainDiv.appendChild(allProductsBtnDiv);


  for (let i = 0; i < data.length; i++) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <button id="${data[i]._id}">${data[i].name}</button>
    `;

    const showCategoryProductsBtn = categoryDiv.querySelector("button");
    showCategoryProductsBtn.addEventListener("click", (e) => {
      console.log(e.target);
      showCategoryProducts( e.target.id);
    });

    categoryMainDiv.appendChild(categoryDiv);
  }

  categorySection.appendChild(categoryMainDiv);
}

showCategory();

/*******************************************************************
 ***************** RENDER CATEGORY PRODUCTS **********************
 *******************************************************************/

 function showCategoryProducts(categoryId) {
  fetch("http://localhost:3000/api/products/category/" + categoryId)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      renderProductsHtml(data)
    })
    .catch((error) => {
      console.error(error);
    });  
 }

/*******************************************************************
 ****************** RENDER ALL PRODUCTS ****************************
 *******************************************************************/

function showProducts() {
  fetch("http://localhost:3000/api/products")
    .then((respons) => respons.json())
    .then((data) => {
      console.log(data);
      renderProductsHtml(data);
    })
    .catch((error) => {
      console.error(error);
      handleProductError(error.message);
    });
}

function renderProductsHtml(data) {
  productSection.innerHTML = "";

  if (data.length === 0) {
    productSection.innerHTML = "<p>No products found.</p>";
    return;
  }

  const mainDivContent = document.createElement("div");
  mainDivContent.setAttribute("class", "mainDivContentDiv");

  for (let i = 0; i < data.length; i++) {
    const productDiv = document.createElement("div");
    productDiv.setAttribute("class", "productDiv");
    productDiv.innerHTML = `
       <img src="public/img_placeholder.png" width="300"><br>
       ${data[i].name}<br>
       Price: ${data[i].price} sek<br>
       Lager:  ${data[i].lager} in stock<br>
       <button id="${data[i]._id}" ${
      data[i].lager === 0 ? "disabled" : ""
    }>BUY NOW</button
     `;
    const buyButton = productDiv.querySelector("button");
    buyButton.addEventListener("click", function (e) {
      console.log(e.target);
      addProductToCart(e.target.id);
    });
    mainDivContent.appendChild(productDiv);
  }
  productSection.appendChild(mainDivContent);
}

// map med lisa + klickevent
// data.map( product => {
//     let item = document.createElement('div');
//     item.setAttribute('class', 'productDiv');
//     item.id = product._id;
//     item.innerText = product.name + `, ` + product.price + ' kr, ' + 'in stock: ' + product.lager;
//     let button = document.createElement("button");
//             button.innerText = "Köp!";
//             button.id = product._id;

//             item.appendChild(button)
//     mainDivContent.appendChild(item)
//   })
//   productSection.appendChild(mainDivContent);
// }

//Clickevent köp-knappar

function handleProductError(errormessage) {
  console.log(errormessage);
}

/*******************************************************************
 ******************** RENDER SHOPCART ******************************
 *******************************************************************/

/* <div id="userFormDiv"></div>  */
function addProductToCart(productId) {
  fetch("http://localhost:3000/api/products/" + productId)
    .then((respons) => respons.json())
    .then((data) => {
      console.log(data);
      let findProduct = null;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i]._id === data._id) {
          findProduct = cart[i];
          break;
        }
      }
      // const findProduct = cart.find(item =>  item._id === data._id);
      if (findProduct) {
        findProduct.quantity++;
      } else {
        const updatedCart = { ...data, quantity: 1 };
        cart.push(updatedCart);
        // const updatedCart = [...cart, {...data, quantity: 1}];
        // cart = updatedCart;
      }
      // cart.push(data);
      console.log(cart);
      localStorage.setItem("shopCart", JSON.stringify(cart));
    });
  renderShopCart();
}

function renderShopCart() {
  const cartDiv = document.querySelector("#cartDiv");
  cartDiv.innerHTML = "";
  const shoppingCartDiv = document.createElement("div");
  shoppingCartDiv.setAttribute("class", "shopCartDiv");
  const totalAmountContainer = document.createElement("div");
  totalAmountContainer.setAttribute("class", "totalAmountContainer");

  if (shopCartVisible) {
    // shoppingCartDiv.innerHTML = "varukorgen är tom";

    for (let i = 0; i < cart.length; i++) {
      shoppingCartDiv.innerHTML += `
      <div class="shopCartItem">
      <p>${cart[i].name}</p>
      <p>${cart[i].quantity} st</p>
      <p>${cart[i].price} sek </p>
      <p>${cart[i].price * cart[i].quantity} sek</p>
      </div>
      `;
    }

    const total = calculateCartTotal(cart);
    totalAmountContainer.innerHTML = `
      totalsum: ${total} sek<br>
      <button id="orderBtn">order</button><br>
      <p id="errorMsg" class="errorMsg"></p>
    `;

    const orderBtn = totalAmountContainer.querySelector("#orderBtn");
    const errorMsg = totalAmountContainer.querySelector("#errorMsg");

    if (localStorage.getItem("userName")) {
      orderBtn.disabled = false;
    } else {
      orderBtn.disabled = true;
      errorMsg.innerText = "you have to be logged in to make an order.";
    }

    orderBtn.addEventListener("click", () => {
      console.log("click to order!");
      sendOrder();
    });
  } else {
    cartDiv.innerHTML = "";
    shoppingCartDiv.style.padding = 0;
  }

  function calculateCartTotal(cart) {
    return cart.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  }

  cartDiv.appendChild(shoppingCartDiv);
  shoppingCartDiv.appendChild(totalAmountContainer);
}

let shopCartVisible = false;

shopCartBtn.addEventListener("click", () => {
  console.log("click shopCart");
  shopCartVisible = !shopCartVisible;
  renderShopCart();
});

/*******************************************************************
 ******************** RENDER SHOPCART ******************************
 *******************************************************************/

function sendOrder() {
console.log('function sendOrder')
const cart = JSON.parse(localStorage.getItem('shopCart'));
console.log(cart);

//array products
//user
}


showProducts();
