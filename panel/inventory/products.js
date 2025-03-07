// Collapsible table toggles 
const toggleButtons = document.querySelectorAll('.collapsible-table .toggle-btn');
toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('rotated');
    const parentRow = btn.closest('.parent-row');
    const childRow = parentRow.nextElementSibling;
    childRow.style.display = (childRow.style.display === 'table-row') ? 'none' : 'table-row';
  });
});

 // "Add Product" form logic  
const addProductForm = document.getElementById("addProductForm");
const productImageInput = document.getElementById("productImageInput");

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Gather form data
  const name = document.getElementById("productName").value;
  const brand = document.getElementById("productBrand").value;
  const price = document.getElementById("productPrice").value;
  const quantity = document.getElementById("productQuantity").value;

  // If no image is uploaded, use a generic image
  let imageSrc = "panel/inventory/inventory-img/generic-product.png";
  if (productImageInput.files && productImageInput.files[0]) {
    imageSrc = URL.createObjectURL(productImageInput.files[0]);
  }

  // Add a new product row
  addNewProductRow(imageSrc, name, brand, "In Stock", price, quantity);

  // Reset the form
  addProductForm.reset();
});

// Helper function to add new product row
function addNewProductRow(imgSrc, name, brand, status, price, quantity) {
  const tableBody = document.querySelector(".collapsible-table tbody");

  // Parent row
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
    <td>${brand}</td>
    <td><span class="status in-stock">${status}</span></td>
    <td>$${price}</td>
    <td>${quantity}</td>
    <td>
      <i class="fa-solid fa-pen-to-square edit-product"></i>
    </td>
  `;

  // Child row
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

  // Collapsible toggles for the new row
  const toggleBtn = parentRow.querySelector(".toggle-btn");
  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle('rotated');
    childRow.style.display = (childRow.style.display === 'table-row') ? 'none' : 'table-row';
  });

  // Attach "edit" icon logic
  const editIcon = parentRow.querySelector(".edit-product");
  editIcon.addEventListener("click", () => {
    openEditModal(parentRow);
  });
}

 // "Edit Product" modal logic 
const editProductModal = document.getElementById("editProductModal");
const closeModal = document.querySelector(".close-modal");
const saveEditBtn = document.getElementById("saveEditProductBtn");
let currentEditRow = null;

// Tab buttons inside modal
const editTabButtons = document.querySelectorAll(".edit-tab-button");
const editTabContents = document.querySelectorAll(".edit-tab-content");

// For switching tabs in the edit modal
editTabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    editTabButtons.forEach(b => b.classList.remove("active"));
    editTabContents.forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.editTab).classList.add("active");
  });
});

function openEditModal(row) {
  currentEditRow = row;
  // Retrieve existing row data
  const cells = row.querySelectorAll("td");
  // cells: [toggle, image, name, brand, status cell, price, quantity, action]
  const nameCell = cells[2];
  const brandCell = cells[3];
  const statusSpan = cells[4].querySelector(".status");
  const priceCell = cells[5];
  const quantityCell = cells[6];

  // Fill fields in the modal
  document.getElementById("editProductName").value = nameCell.textContent.trim();
  document.getElementById("editProductBrand").value = brandCell.textContent.trim();
  document.getElementById("editProductPrice").value = priceCell.textContent.replace("$", "").trim();
  document.getElementById("editProductQuantity").value = quantityCell.textContent.trim();
  document.getElementById("editProductStatus").value = statusSpan.textContent.trim();
  // We also have discount field if needed
  document.getElementById("editDiscount").value = "";

  // Show the modal
  editProductModal.style.display = "block";
}

// Close modal
closeModal.addEventListener("click", () => {
  editProductModal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === editProductModal) {
    editProductModal.style.display = "none";
  }
});

// Save changes in "Edit Product" modal
saveEditBtn.addEventListener("click", () => {
  if (!currentEditRow) return;

  // Gather updated data
  const updatedName = document.getElementById("editProductName").value;
  const updatedBrand = document.getElementById("editProductBrand").value;
  const updatedPrice = document.getElementById("editProductPrice").value;
  const updatedQuantity = document.getElementById("editProductQuantity").value;
  const updatedStatus = document.getElementById("editProductStatus").value;
  const updatedImageFile = document.getElementById("editProductImage").files[0];
  const discount = document.getElementById("editDiscount").value; // if you want to do something with it

  const cells = currentEditRow.querySelectorAll("td");
  const nameCell = cells[2];
  const brandCell = cells[3];
  const statusSpan = cells[4].querySelector(".status");
  const priceCell = cells[5];
  const quantityCell = cells[6];
  const imageCell = cells[1].querySelector("img");

  // Update row
  nameCell.textContent = updatedName;
  brandCell.textContent = updatedBrand;
  priceCell.textContent = `$${updatedPrice}`;
  quantityCell.textContent = updatedQuantity;
  statusSpan.textContent = updatedStatus;

  // Update status color
  statusSpan.classList.remove("in-stock", "out-stock");
  if (updatedStatus === "In Stock") {
    statusSpan.classList.add("in-stock");
  } else {
    statusSpan.classList.add("out-stock");
  }

  // If new image is uploaded
  if (updatedImageFile) {
    const newSrc = URL.createObjectURL(updatedImageFile);
    imageCell.src = newSrc;
  }

  // Hide modal
  editProductModal.style.display = "none";
});