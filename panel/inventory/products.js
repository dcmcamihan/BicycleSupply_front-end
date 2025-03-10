// Define an initialization function for the products page
function initProducts() {
  // 1. Toggle collapsible rows for existing rows
  const toggleButtons = document.querySelectorAll('.collapsible-table .toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('rotated');
      const parentRow = btn.closest('.parent-row');
      const childRow = parentRow.nextElementSibling;
      childRow.style.display = (childRow.style.display === 'table-row') ? 'none' : 'table-row';
    });
  });

  // 2. Edit modal image upload handler (for the edit modal)
  const editProductImageInput = document.getElementById("editProductImage");
  const editProductImagePreview = document.getElementById("editProductImagePreview");
  if (editProductImageInput && editProductImagePreview) {
    editProductImageInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          editProductImagePreview.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // 3. Add Product Modal Logic
  const addProductBtn = document.querySelector(".btn-add-product");
  const addProductModal = document.getElementById("addProductModal");
  const closeAddModal = document.querySelector(".close-modal-add");

  if (addProductBtn) {
    addProductBtn.addEventListener("click", () => {
      addProductModal.style.display = "block";
    });
  }
  if (closeAddModal) {
    closeAddModal.addEventListener("click", () => {
      addProductModal.style.display = "none";
    });
  }
  window.addEventListener("click", (e) => {
    if (e.target === addProductModal) {
      addProductModal.style.display = "none";
    }
  });

  // 4. Handle image upload in the add product modal
  const addProductImageInput = document.getElementById("addProductImage");
  const addProductImagePreview = document.getElementById("addProductImagePreview");
  if (addProductImageInput && addProductImagePreview) {
    addProductImageInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          addProductImagePreview.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // 5. Handle Add Product Form Submission
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

  // 6. Function to add a new product row to the table
  function addNewProductRow(imgSrc, name, brand, category, price) {
    const tableBody = document.querySelector(".collapsible-table tbody");
    if (!tableBody) return;

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

    // Attach toggle functionality for the new row
    const toggleBtn = parentRow.querySelector(".toggle-btn");
    toggleBtn.addEventListener("click", () => {
      toggleBtn.classList.toggle("rotated");
      childRow.style.display = (childRow.style.display === "table-row") ? "none" : "table-row";
    });

    // Attach edit functionality for the new row
    const editIcon = parentRow.querySelector(".edit-product");
    editIcon.addEventListener("click", () => {
      openEditModal(parentRow);
    });

    // Attach delete functionality for the new row
    attachDeleteFunctionality(parentRow);
  }

  // 7. Attach delete functionality to a product row (for new rows)
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

  // 8. Function to open and populate the edit modal for a product
  function openEditModal(parentRow) {
    const editModal = document.getElementById("editProductModal");
    if (!editModal) {
      console.error("Edit modal not found.");
      return;
    }

    const productName = parentRow.querySelector("td:nth-child(3)").textContent;
    const productCategory = parentRow.querySelector("td:nth-child(4)").textContent;
    const productBrand = parentRow.querySelector("td:nth-child(5)").textContent;
    const productPrice = parentRow.querySelector("td:nth-child(7)").textContent;

    document.getElementById("editProductName").value = productName;
    document.getElementById("editProductCategory").value = productCategory;
    document.getElementById("editProductBrand").value = productBrand;
    document.getElementById("editProductPrice").value = productPrice.replace("$", "");

    editModal.style.display = "block";
  }

  // 9. Attach edit and delete functionality to existing rows
  const existingEditIcons = document.querySelectorAll(".edit-product");
  existingEditIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const parentRow = icon.closest(".parent-row");
      openEditModal(parentRow);
    });
  });
  const existingDeleteIcons = document.querySelectorAll(".delete-product");
  existingDeleteIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this product?")) {
        const parentRow = icon.closest(".parent-row");
        const childRow = parentRow.nextElementSibling;
        parentRow.remove();
        if (childRow && childRow.classList.contains("child-row")) {
          childRow.remove();
        }
      }
    });
  });

  // 10. Close edit modal when clicking the close button or outside the modal
  const closeEditModal = document.querySelector(".close-modal-edit");
  if (closeEditModal) {
    closeEditModal.addEventListener("click", () => {
      const editModal = document.getElementById("editProductModal");
      if (editModal) editModal.style.display = "none";
    });
  }
  window.addEventListener("click", (e) => {
    const editModal = document.getElementById("editProductModal");
    if (e.target === editModal) {
      editModal.style.display = "none";
    }
  });
}

// Expose the initialization function so it can be called from dashboard.js
window.initProducts = initProducts;
