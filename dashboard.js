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
      // Re-run the code to attach collapsible table logic and edit icon logic
      initProductToggles();
    })
    .catch(err => console.error("Failed to load page:", err));
}

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

    // Add Product Modal Logic
    const addProductBtn = document.querySelector(".btn-add-product");
    const addProductModal = document.getElementById("addProductModal");
    const closeAddModal = document.querySelector(".close-modal-add");
  
    // Open the Add Product Modal
    if (addProductBtn) {
      addProductBtn.addEventListener("click", () => {
        addProductModal.style.display = "block";
      });
    }
  
    // Close the Add Product Modal when clicking the close button
    if (closeAddModal) {
      closeAddModal.addEventListener("click", () => {
        addProductModal.style.display = "none";
      });
    }
  
    // Close the Add Product Modal when clicking outside the modal
    window.addEventListener("click", (e) => {
      if (e.target === addProductModal) {
        addProductModal.style.display = "none";
      }
    });
  
    // Function to handle image upload in the add modal
    const addProductImageInput = document.getElementById("addProductImage");
    const addProductImagePreview = document.getElementById("addProductImagePreview");
  
    if (addProductImageInput && addProductImagePreview) {
      addProductImageInput.addEventListener("change", function (e) {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
          const reader = new FileReader(); // Create a FileReader to read the file
          reader.onload = function (event) {
            // Update the image preview with the uploaded image
            addProductImagePreview.src = event.target.result;
          };
          reader.readAsDataURL(file); // Read the file as a data URL
        }
      });
    }
  
    // Handle form submission for adding a product
    const addProductForm = document.getElementById("addProductForm");
    if (addProductForm) {
      addProductForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const name = document.getElementById("addProductName").value;
        const brand = document.getElementById("addProductBrand").value;
        const category = document.getElementById("addProductCategory").value;
        const price = document.getElementById("addProductPrice").value;
  
        let imageSrc = "panel/inventory/inventory-img/generic-product.png";
        if (addProductImageInput.files && addProductImageInput.files[0]) {
          imageSrc = URL.createObjectURL(addProductImageInput.files[0]);
        }
  
        addNewProductRow(imageSrc, name, brand, category, price);
  
        addProductForm.reset();
        addProductModal.style.display = "none";
      });
    }
  
    // Function to add a new product row
    function addNewProductRow(imgSrc, name, brand, category, price) {
      const tableBody = document.querySelector(".collapsible-table tbody");
  
      const parentRow = document.createElement("tr");
      parentRow.classList.add("parent-row");
  
      parentRow.innerHTML = `
        <td class="toggle-cell">
          <i class="fa-solid fa-chevron-right toggle-btn"></i>
        </td>
        <td>
          <img src="${imgSrc}" alt="${name}" class="product-image">
        </td>
        <td>${name}</td>
        <td>${category}</td>
        <td>${brand}</td>
        <td><span class="status in-stock">In Stock</span></td>
        <td>$${price}</td>
        <td>
          <i class="fa-solid fa-pen-to-square edit-product"></i>
          <i class="fa-solid fa-trash delete-product"></i>
        </td>
      `;
  
      const childRow = document.createElement("tr");
      childRow.classList.add("child-row");
      childRow.innerHTML = `
        <td colspan="8">
          <div class="child-content">
            <h3>History</h3>
            <p>No history yet for this new product.</p>
          </div>
        </td>
      `;
  
      tableBody.appendChild(parentRow);
      tableBody.appendChild(childRow);
  
      // Add toggle functionality
      const toggleBtn = parentRow.querySelector(".toggle-btn");
      toggleBtn.addEventListener("click", () => {
        toggleBtn.classList.toggle("rotated");
        childRow.style.display = childRow.style.display === "table-row" ? "none" : "table-row";
      });
  
      // Add edit functionality
      const editIcon = parentRow.querySelector(".edit-product");
      editIcon.addEventListener("click", () => {
        openEditModal(parentRow);
      });
  
    // Add delete functionality
    attachDeleteFunctionality(parentRow);
  }

  // Function to attach delete functionality to a row
  function attachDeleteFunctionality(parentRow) {
    const deleteIcon = parentRow.querySelector(".delete-product");
    if (deleteIcon) {
      deleteIcon.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this product?")) {
          const childRow = parentRow.nextElementSibling;
          parentRow.remove();
          if (childRow && childRow.classList.contains("child-row")) {
            childRow.remove();
          }
        }
      });
    }
  }

  // Attach delete functionality to existing rows
  const existingRows = document.querySelectorAll(".parent-row");
  existingRows.forEach(row => {
    attachDeleteFunctionality(row);
  });
    


  function openEditModal(parentRow) {
    // Ensure the edit modal exists in the DOM
    const editModal = document.getElementById("editProductModal");
    if (!editModal) {
      console.error("Edit modal not found.");
      return;
    }
  
    // Extract product data from the row
    const productName = parentRow.querySelector("td:nth-child(3)").textContent;
    const productBrand = parentRow.querySelector("td:nth-child(4)").textContent;
    const productPrice = parentRow.querySelector("td:nth-child(6)").textContent;
    const productCategory = parentRow.querySelector("td:nth-child(5)").textContent; // Added for category
  
    // Populate the edit modal with the extracted data
    document.getElementById("editProductName").value = productName;
    document.getElementById("editProductBrand").value = productBrand;
    document.getElementById("editProductPrice").value = productPrice.replace("$", "");
    document.getElementById("editProductCategory").value = productCategory; // Set category
  
    // Display the edit modal
    editModal.style.display = "block";
  }

  // Attach "edit" icon logic
  const editIcons = document.querySelectorAll(".edit-product");
  editIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const parentRow = icon.closest(".parent-row");
      openEditModal(parentRow);
    });
  });

  // Close edit modal when clicking the close button
  const closeEditModal = document.querySelector(".close-modal-edit");
  if (closeEditModal) {
    closeEditModal.addEventListener("click", () => {
      const editModal = document.getElementById("editProductModal");
      editModal.style.display = "none";
    });
  }

  // Close edit modal when clicking outside the modal
  window.addEventListener("click", (e) => {
    const editModal = document.getElementById("editProductModal");
    if (e.target === editModal) {
      editModal.style.display = "none";
    }
  });
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

function handleImageError(imgElement) {
  // Prevent infinite loop if the fallback also fails
  imgElement.onerror = null;
  imgElement.style.display = 'none';
  const avatarContainer = imgElement.parentElement;
  // Show the default avatar element
  avatarContainer.querySelector('.default-avatar').style.display = 'flex';
}