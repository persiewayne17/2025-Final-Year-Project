document.addEventListener("DOMContentLoaded", function () {
  // Load the navigation bar from navbar.html into the #navbar-container
  fetch("navbar.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;

      // Add event listener to toggle button after nav is loaded
      const toggleBtn = document.querySelector(".toggle-btn");
      const menu = document.querySelector(".nav-links"); // Changed from ID to class for dynamic menus
      const navbar = document.querySelector(".navbar");

      if (!toggleBtn || !menu || !navbar) {
        throw new Error("Toggle button or menu not found in the loaded HTML");
      }

      // Toggle menu visibility on click
      toggleBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent the click from bubbling up
        menu.classList.toggle("active");
        toggleBtn.classList.toggle("active");
        navbar.classList.toggle("menu-active"); // Activate overlay

        toggleBtn.setAttribute(
          "aria-expanded",
          menu.classList.contains("active")
        );

        // Trigger reflow to ensure animation works on both open and close
        menu.style.display = "none";
        menu.offsetHeight; // Trigger reflow
        menu.style.display = "";
      });

      // Close menu if clicked outside
      document.addEventListener("click", function (event) {
        if (
          menu.classList.contains("active") &&
          !menu.contains(event.target) &&
          !toggleBtn.contains(event.target)
        ) {
          menu.classList.remove("active");
          toggleBtn.classList.remove("active");
          navbar.classList.remove("menu-active");
          toggleBtn.setAttribute("aria-expanded", "false");
        }
      });

      // Add keyboard accessibility
      toggleBtn.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleBtn.click();
        }
      });
    })
    .catch((error) => {
      console.error("Error loading navigation:", error);
      document.getElementById("navbar-container").innerHTML =
        "<p>Error loading navigation. Please refresh the page.</p>";
    });
});
