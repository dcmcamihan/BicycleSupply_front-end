// Toggle Sidebar Collapsing
const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");
const mainContent = document.querySelector(".main-content");
const logoImg = document.getElementById("jolensLogo");

// Select all collapsible items
const collapsibleItems = document.querySelectorAll(".sidebar-nav li.collapsible");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");

  // If the sidebar is now collapsed, remove "active" from each collapsible item
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

const navLinks = document.querySelectorAll(".nav-link");
const defaultDashboard = document.getElementById("defaultDashboard");
const mainContentDiv = document.getElementById("mainContent");

function loadPage(pageUrl) {
  fetch(pageUrl)
    .then(response => response.text())
    .then(html => {
      mainContentDiv.innerHTML = html;
      defaultDashboard.style.display = "none";
      mainContentDiv.style.display = "block";
      // Re-run the code to attach collapsible table logic
      initProductToggles();
      initEmployeeEditIcons();
    })
    .catch(err => console.error("Failed to load page:", err));
}

// On click, remove .active from all, then add to the clicked link
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // Remove 'active' from all links and add it to the clicked one.
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Get the page URL from data-page attribute
    const pageUrl = link.getAttribute("data-page");

    if (pageUrl) {
      loadPage(pageUrl);
    } // If the user clicks "Dashboard" (no data-page)
    else {
      // Remove inline display from defaultDashboard so CSS can reapply grid
      defaultDashboard.style.display = "";
      // or defaultDashboard.style.display = "grid";
      mainContentDiv.style.display = "none";
    }
  });
});

// A function to attach toggle listeners to newly loaded content
function initProductToggles() {
  const toggleButtons = document.querySelectorAll('.collapsible-table .toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Rotate the arrow
      btn.classList.toggle('rotated');
      
      // The closest parent row (parent-row)
      const parentRow = btn.closest('.parent-row');
      // The next sibling row is the child row
      const childRow = parentRow.nextElementSibling;

      // Toggle display
      if (childRow.style.display === 'table-row') {
        childRow.style.display = 'none';
      } else {
        childRow.style.display = 'table-row';
      }
    });
  });
}

function handleImageError(imgElement) {
  // Prevent infinite loop if the fallback also fails
  imgElement.onerror = null;
  imgElement.style.display = 'none';
  const avatarContainer = imgElement.parentElement;
  // Show the default avatar element
  avatarContainer.querySelector('.default-avatar').style.display = 'flex';
}
