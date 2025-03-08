document.addEventListener("DOMContentLoaded", function() {
  
  const toggleButtons = document.querySelectorAll('.collapsible-table .toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('rotated');
      const parentRow = btn.closest('.parent-row');
      const childRow = parentRow.nextElementSibling;
      childRow.style.display = (childRow.style.display === 'table-row') ? 'none' : 'table-row';
    });
  });

  const addProductBtn = document.querySelector(".btn-add-product");
  const addProductModal = document.getElementById("addProductModal");
  const closeAddModal = document.querySelector(".close-modal-add"); // Updated selector

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

  const addProductForm = document.getElementById("addProductForm");
  const productImageInput = document.getElementById("productImageInput");

  if (addProductForm) {
    addProductForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("productName").value;
      const brand = document.getElementById("productBrand").value;
      const price = document.getElementById("productPrice").value;
      const quantity = document.getElementById("productQuantity").value;

      let imageSrc = "panel/inventory/inventory-img/generic-product.png";
      if (productImageInput.files && productImageInput.files[0]) {
        imageSrc = URL.createObjectURL(productImageInput.files[0]);
      }

      addNewProductRow(imageSrc, name, brand, "In Stock", price, quantity);

      addProductForm.reset();
      addProductModal.style.display = "none";
    });
  }

  function addNewProductRow(imgSrc, name, brand, status, price, quantity) {
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
      <td>${brand}</td>
      <td><span class="status in-stock">${status}</span></td>
      <td>$${price}</td>
      <td>${quantity}</td>
      <td>
        <i class="fa-solid fa-pen-to-square edit-product"></i>
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

    const toggleBtn = parentRow.querySelector(".toggle-btn");
    toggleBtn.addEventListener("click", () => {
      toggleBtn.classList.toggle('rotated');
      childRow.style.display = (childRow.style.display === 'table-row') ? 'none' : 'table-row';
    });

    const editIcon = parentRow.querySelector(".edit-product");
    editIcon.addEventListener("click", () => {
      openEditModal(parentRow); 
    });
  }
});