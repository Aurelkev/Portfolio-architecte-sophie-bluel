// Script for Login-page.html

const loginApi = "http://localhost:5678/api/users/login";

document.getElementById("loginForm").addEventListener("submit", submit);

async function submit() {
  let user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  let response = await fetch(loginApi, {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  let result = await response.json();
  console.log(result);
  console.log(user.email);
  console.log(user.password);
};


/* let user = {
  email: "sophie.bluel@test.tld",
  password: "S0phie"
}; */