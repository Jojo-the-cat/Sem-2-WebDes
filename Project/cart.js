const STORAGE_KEY = "auscultaCart";

const cartItems = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const checkoutLink = document.getElementById("checkoutLink");


/*--- For Currency Formatting ---*/

function formatRM(amount) {
   return `RM${amount.toFixed(2)}`;
}


/*--- For retrieving Cart info ---*/

function readCart() {
   return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}


/*--- Display Shopping Cart ---*/

function renderCart() {
   const cart = readCart();
   let subtotal = 0;

   cartItems.innerHTML = "";

   if (cart.length === 0) {
      cartItems.innerHTML = `<p class="empty">Your basket is empty. Explore the shop to collect some sounds!</p>`;
   }

   cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const row = document.createElement("article");
      row.className = "cart-item";

      row.innerHTML = `
         <img>

         <div class="item-info">
            <h3></h3>
            <p>${formatRM(Number(item.price))} each</p>

            <div class="item-controls">
               <button type="button" aria-label="Decrease quantity">−</button>
               <span></span>
               <button type="button" aria-label="Increase quantity">+</button>
               <button type="button" class="remove">Remove</button>
            </div>
         </div>

         <div class="item-total">${formatRM(itemTotal)}</div>
      `;

      row.querySelector("img").src = item.image;
      row.querySelector("img").alt = item.name;
      row.querySelector("h3").textContent = item.name;
      row.querySelector("span").textContent = item.quantity;

      const buttons = row.querySelectorAll("button");

      buttons[0].onclick = () => updateCart(item.id, -1);
      buttons[1].onclick = () => updateCart(item.id, 1);
      buttons[2].onclick = () => updateCart(item.id, -Number(item.quantity));

      cartItems.append(row);
   });

   cartSubtotal.textContent = formatRM(subtotal);

   checkoutLink.classList.toggle("disabled", cart.length === 0);
   checkoutLink.setAttribute("aria-disabled", cart.length === 0);
}

/*--- For updating and removing Cart Items ---*/


function updateCart(id, change) {
   const cart = readCart();
   const item = cart.find(product => product.id === id);

   if (!item) {
      return;
   }

   item.quantity = Number(item.quantity) + change;

   const updatedCart = cart.filter(product => product.quantity > 0);

   localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCart));

   renderCart();
}


checkoutLink.addEventListener("click", (event) => {
   if (readCart().length === 0) {
      event.preventDefault();
   }
});


/*--- Burger Nav ---*/

const menuToggle = document.getElementById("menuToggle");
const mainNavigation = document.getElementById("mainNavigation");


function closeMenu() {
   mainNavigation.classList.remove("open");
   menuToggle.setAttribute("aria-expanded", "false");
}


menuToggle.addEventListener("click", () => {
   mainNavigation.classList.toggle("open");
   const isOpen = mainNavigation.classList.contains("open");
   menuToggle.setAttribute("aria-expanded", isOpen);
});


document.addEventListener("keydown", (event) => {

   if (event.key === "Escape") {
      closeMenu();
   }
});


document.addEventListener("click", (event) => {

   if (!mainNavigation.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
   }
});


/*--- For displaying the cart upon loading the page. ---*/

renderCart();
