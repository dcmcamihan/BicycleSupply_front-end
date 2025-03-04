// Toggle Sidebar Collapsing
const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");
const mainContent = document.querySelector(".main-content");
const logoImg = document.getElementById("jolensLogo");

// 1. Select all collapsible items
const collapsibleItems = document.querySelectorAll(".sidebar-nav li.collapsible");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");

  // 2. If the sidebar is now collapsed, remove "active" from each collapsible item
  if (sidebar.classList.contains("collapsed")) {
    collapsibleItems.forEach(item => {
      item.classList.remove("active");
    });
  }
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

// Collapsible Menu functionality
const collapsibleHeaders = document.querySelectorAll('.sidebar-nav li.collapsible > .collapsible-header');

collapsibleHeaders.forEach(header => {
  header.addEventListener('click', () => {
    // If the sidebar is collapsed, do not expand sub-menus
    if (sidebar.classList.contains('collapsed')) {
      return;
    }
    // Otherwise, toggle the parent li active class
    const parentLi = header.parentElement;
    parentLi.classList.toggle('active');
  });
});

