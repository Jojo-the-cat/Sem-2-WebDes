console.log("Shop JavaScript is loaded.");

const shopCards = document.querySelectorAll(".shopCard");
const categoryButtons = document.querySelectorAll(".categoryButton");

const categoryColors = {
   verdant: {
      accent: "#6F8F72",
      light: "#DCE5D3"
   },
   tempest: {
      accent: "#7098AC",
      light: "#DFE9E8"
   },
   hearthside: {
      accent: "#DA864E",
      light: "#F3E3C7"
   },
   melodic: {
      accent: "#A58AA6", 
      light: "#EEE0D7"
   },
   wandering: {
      accent: "#B17D63",
      light: "#EAD9C8"
   },
   arcane: {
      accent: "#9381AD",
      light: "#E9E2F1"
   },
   forbidden: {
      accent: "#745B68",
      light: "#D8C8C6"
   },
   peculiar: {
      accent: "#B97578",
      light: "#F0D7CE"
   }
};

categoryButtons.forEach(button => {

   button.addEventListener("click", () => {

      categoryButtons.forEach(btn => {
         btn.classList.remove("active");
      });

      button.classList.add("active");

      const category = button.dataset.category;
      const colors = categoryColors[category];

      if (colors) {
         document.documentElement.style.setProperty("--category-accent", colors.accent);
         document.documentElement.style.setProperty("--category-light", colors.light);
      }

      shopCards.forEach(card => {

         if (card.dataset.category === category) {
            card.hidden = false;
         } else {
            card.hidden = true;

            const audio = card.querySelector("audio");

            if (audio) {
               audio.pause();
            }
         }

      });

   });

});

document.querySelector('button[data-category="verdant"]').click();


const addToCartButtons = document.querySelectorAll(".addToCart");

addToCartButtons.forEach(button => {
   button.addEventListener("click", () => {
      const card = button.closest(".shopCard");
      const id = button.dataset.id;
      const name = card.querySelector("h3").textContent.trim();
      const image = card.querySelector(".productImage").getAttribute("src");

      const priceText = [...card.querySelectorAll("p")]
         .map(p => p.textContent.trim())
         .find(text => /^RM\s*\d/.test(text));

      if (!id || !priceText) {
         alert("Product information is incomplete.");
         return;
      }

      const price = Number(
         priceText.replace("RM", "").replace(/,/g, "").trim()
      );

      const cart = JSON.parse(localStorage.getItem("auscultaCart") || "[]");
      const existing = cart.find(item => item.id === id);

      if (existing) {
         existing.quantity += 1;
      } else {
         cart.push({
            id: id,
            name: name,
            image: image,
            price: price,
            quantity: 1
         });
      }

      localStorage.setItem("auscultaCart", JSON.stringify(cart));

      const originalText = "Add to Cart";
      button.textContent = "Added!";
      setTimeout(() => {
         button.textContent = originalText;
      }, 1200);
   });
});


/*--- Audio Playback Control, so no overlaps ---*/

const audioPlayers = document.querySelectorAll("audio");

audioPlayers.forEach(audio => {

   audio.addEventListener("play", () => {

      audioPlayers.forEach(otherAudio => {

         if (otherAudio !== audio) {
            otherAudio.pause();
         }

      });

   });

});
