document.addEventListener("DOMContentLoaded", function () { 


  const searchField = document.getElementById("searchField");
  const contentContainer = document.getElementById("contentContainer");

  window.handleSearchOrSort = function () {
    const query = searchField.value.trim().toLowerCase();

    if (query === "a-z" || query === "z-a") {
      sortSections(query);
    } else {
      filterContent(query);
    }
  };

  function filterContent(query) {
    if (!contentContainer) return;
    const items = contentContainer.querySelectorAll(".accordion-item");

    items.forEach(item => {
      const header = item.querySelector(".accordion-header");
      const content = item.querySelector(".accordion-content");
      const text = (header.textContent + " " + content.textContent).toLowerCase();
      item.style.display = text.includes(query) ? "" : "none";
    });
  }

  function sortSections(order) {
    if (!contentContainer) return;
    const items = Array.from(contentContainer.querySelectorAll(".accordion-item"));

    items.sort((a, b) => {
      const titleA = a.querySelector(".accordion-header").textContent.trim().toLowerCase();
      const titleB = b.querySelector(".accordion-header").textContent.trim().toLowerCase();
      return order === "a-z" ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
    });

 
    items.forEach(item => contentContainer.appendChild(item));
  }

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
  let slideIndex = 1;

  window.openModal = function () {
    const modal = document.getElementById("myModal");
    if (modal) modal.style.display = "block";
  };

  window.closeModal = function () {
    const modal = document.getElementById("myModal");
    if (modal) modal.style.display = "none";
  };

  window.plusSlides = function (n) {
    showSlides(slideIndex += n);
  };

  window.currentSlide = function (n) {
    showSlides(slideIndex = n);
  };

  function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    if (slides.length === 0) return;

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";

    const caption = document.getElementById("caption");
    if (caption && slides[slideIndex - 1].querySelector("img")) {
      caption.textContent = slides[slideIndex - 1].querySelector("img").alt;
    }
  }

  if (document.getElementById("myModal")) {
    showSlides(slideIndex);
  }
  const quoteForm = document.getElementById("quoteForm");
  const quoteResponse = document.getElementById("quoteResponse");

  if (quoteForm) {
    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();

      
      const name = document.getElementById("qname").value.trim();
      const email = document.getElementById("qemail").value.trim();
      const phone = document.getElementById("qphone").value.trim();
      const pickup = document.getElementById("pickup").value.trim();
      const dropoff = document.getElementById("dropoff").value.trim();
      const distance = parseFloat(document.getElementById("distance").value.trim()) || 0;
      const cargoType = document.getElementById("cargoType").value;

      
      const baseRate = 100;       
      const ratePerKm = 10;       
      const cargoMultiplier = {
        general: 1,
        fragile: 1.2,
        heavy: 1.4,
        perishable: 1.3
      };

      const estimatedPrice = (baseRate + (distance * ratePerKm)) * (cargoMultiplier[cargoType] || 1);
      const messageHTML = `
        <div class="quote-summary success">
          <h3>Quotation Summary</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Pick-up:</strong> ${pickup}</p>
          <p><strong>Drop-off:</strong> ${dropoff}</p>
          <p><strong>Distance:</strong> ${distance} km</p>
          <p><strong>Cargo Type:</strong> ${cargoType.charAt(0).toUpperCase() + cargoType.slice(1)}</p>
          <p><strong>Estimated Quote:</strong> R${estimatedPrice.toFixed(2)}</p>
          <p class="thank-you">Thank you for requesting a quote. Our team will contact you shortly!</p>
        </div>
      `;
      quoteResponse.innerHTML = messageHTML;
      quoteResponse.style.display = "block";
      quoteResponse.scrollIntoView({ behavior: "smooth" });
      quoteForm.reset();
    });
  }

});
