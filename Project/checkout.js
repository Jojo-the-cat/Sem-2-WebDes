const STORAGE_KEY = "auscultaCart";

const checkoutForm = document.getElementById("checkoutForm");
const checkoutContent = document.getElementById("checkoutContent");
const confirmation = document.getElementById("confirmation");
const orderItems = document.getElementById("orderItems");
const orderTotal = document.getElementById("orderTotal");

/*--- I need to write down all these because i can't remember ---*/
/*--- For Currency Formatting ---*/


function formatRM(amount) {

   return `RM${amount.toFixed(2)}`;

}


/*--- For retrieving Cart info ---*/

function readCart() {
   return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}


/*--- For calculating the total price ---*/

function calculateTotal(cart) {
   let total = 0;

   cart.forEach(item => {
      total += item.price * item.quantity;
   });

   return total;
}


function showSummary() {
   const cart = readCart();
   orderItems.innerHTML = "";

   if (cart.length === 0) {
      checkoutContent.innerHTML = `
         <p>Your basket is empty.
            <a href="mainShop.html">Return to the shop</a>
         </p>
      `;
      return;
   }

   cart.forEach(item => {
      const row = document.createElement("div");
      row.className = "summary-item";

      row.innerHTML = `
         <span></span>
         <span>${formatRM(item.price * item.quantity)}</span>
      `;

      row.querySelector("span").textContent = `${item.name} × ${item.quantity}`;
      orderItems.append(row);
   });

   orderTotal.textContent = formatRM(calculateTotal(cart));
}


/*--- For Form Submission for checkout ---*/

checkoutForm.addEventListener("submit", (event) => {
   event.preventDefault();

   const cart = readCart();

   if (cart.length === 0) {
      showSummary();
      return;
   }

   const customerName = document.getElementById("customerName").value.trim();
   const total = calculateTotal(cart);
   const orderNumber = `AO-${Date.now()}`;


   // Clears cart after confirmed order.

   localStorage.removeItem(STORAGE_KEY);
   checkoutContent.hidden = true;
   confirmation.hidden = false;


/*--- For order Confirmation Message ---*/

   confirmation.innerHTML = `
      <h2>Your Order Is Confirmed!</h2>

      <p id="customerGreeting"></p>

      <p>Order reference: ${orderNumber}</p>

      <p>Order Total: ${formatRM(total)}</p>

      <p>May your newly collected sounds bring wonder, comfort and harmony to your days.</p>

      <a href="mainShop.html">Continue Exploring</a>
   `;

   document.getElementById("customerGreeting").textContent =
      `Thank you, ${customerName}, for choosing Ausculta Oasis.`;

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


showSummary();
