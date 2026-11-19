const menuToggle = document.getElementById("menuToggle");
const mainNavigation = document.getElementById("mainNavigation");

menuToggle.addEventListener("click", () => {

   mainNavigation.classList.toggle("open");   // Toggle "open" class on nav menu 

   const isOpen = mainNavigation.classList.contains("open");   // Checks if menu is open using classList.contains()

   menuToggle.setAttribute("aria-expanded", isOpen);   // Updates aria-expanded (open = true, closed = false)

});

document.addEventListener("keydown", (event) => {
  
   if (event.key === "Escape") {
   
      mainNavigation.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");
   
   }
});

document.addEventListener("click", (event) => {

   if (!mainNavigation.contains(event.target) && !menuToggle.contains(event.target)) {
      
      mainNavigation.classList.remove("open");
      
      menuToggle.setAttribute("aria-expanded", "false");

   }
});
