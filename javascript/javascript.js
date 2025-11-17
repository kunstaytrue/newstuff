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
