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