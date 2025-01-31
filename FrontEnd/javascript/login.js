// Script for Login-page.html

const loginApi = "http://localhost:5678/api/users/login";

document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();
  submit();
});

async function submit() {
  let user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };
  console.log(user);
  let response = await fetch(loginApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (response.status === 401) {
    if (!document.querySelector(".error-login")) {
      const errorBox = document.createElement("div");
      errorBox.className = "error-login";
      errorBox.innerHTML = "Email ou Mot de passe incorrect";
      document.querySelector("form").prepend(errorBox);
    }
  } else if (response.status === 200) {
    let result = await response.json();
    const token = result.token;
    sessionStorage.setItem("authToken", token);
    window.location.href = "index.html";
  }
};
