// Toggle Sidebar Collapsing
const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");
const mainContent = document.querySelector(".main-content");
const logoImg = document.getElementById("jolensLogo");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const icon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {
  // Toggle the light-mode class on the body
  document.body.classList.toggle("light-mode");

  // Check if we are now in light mode
  if (document.body.classList.contains("light-mode")) {
    // Switch icon to moon
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    // Switch to dark logo for light background
    logoImg.src = "img/logo-dark.png";
  } else {
    // Switch icon to sun
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    // Switch back to light logo for dark background
    logoImg.src = "img/logo.png";
  }
});
