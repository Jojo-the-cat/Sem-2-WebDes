const loginForm = document.getElementById("loginForm");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

loginForm.addEventListener("submit", function(event) {
   event.preventDefault();

   const username = usernameInput.value.trim();
   const password = passwordInput.value.trim();

   if (!username || !password) {
      message.textContent = "Please fill in both fields.";
      message.style.color = "#D32F2F";
      message.style.fontFamily = "'Outfit', sans-serif";

   } else if (username.length < 3) {
      message.textContent = "Username must contain at least 3 characters.";
      message.style.color = "#D32F2F";
      message.style.fontFamily = "'Outfit', sans-serif";

   } else if (password.length < 6) {
      message.textContent = "Password must contain at least 6 characters.";
      message.style.color = "#D32F2F";
      message.style.fontFamily = "'Outfit', sans-serif";

   } else {
      message.textContent = "Welcome to the Sanctuary.";
      message.style.color = "#527A57";
      message.style.fontFamily = "'Outfit', sans-serif";

      window.location.href = "index.html";
   }

});

