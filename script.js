document.addEventListener("DOMContentLoaded", function () {
  // Load the navigation bar from navbar.html into the #navbar-container
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;

      // Add event listener to toggle button after nav is loaded
      const toggleBtn = document.querySelector(".toggle-btn");
      const menu = document.getElementById("nav-links");

      toggleBtn.addEventListener("click", function () {
        menu.classList.toggle("active");
        toggleBtn.setAttribute(
          "aria-expanded",
          menu.classList.contains("active")
        );
      });

      // Close menu if clicked outside
      document.addEventListener("click", function (event) {
        if (
          menu &&
          !menu.contains(event.target) &&
          !toggleBtn.contains(event.target) &&
          menu.classList.contains("active")
        ) {
          menu.classList.remove("active");
          toggleBtn.setAttribute("aria-expanded", "false");
        }
      });
    })
    .catch((error) => console.error("Error loading navigation:", error));
});
