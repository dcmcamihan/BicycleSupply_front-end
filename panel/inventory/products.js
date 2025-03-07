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

// Add Product Form
const addProductForm = document.getElementById("addProductForm");
const productImageInput = document.getElementById("productImageInput");

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Gather form data using new field IDs
  const name = document.getElementById("productName").value;
  const brand = document.getElementById("productBrand").value;
  const price = document.getElementById("productPrice").value;
  const quantity = document.getElementById("productQuantity").value;
  
  // Check if an image is uploaded; if not, use a generic image
  let imageSrc = "panel/inventory/inventory-img/generic-product.png"; // fallback image path
  if (productImageInput.files && productImageInput.files[0]) {
    imageSrc = URL.createObjectURL(productImageInput.files[0]);
  }

  // Create a new row in your products table with the updated field names
  addNewProductRow(imageSrc, name, brand, "In Stock", price, quantity);

  // Reset the form fields
  addProductForm.reset();
});

// Helper function to add new product row
function addNewProductRow(imgSrc, name, brand, status, price, quantity) {
  const tableBody = document.querySelector(".collapsible-table tbody");

  // Create the parent row
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
  `;

  // Create the child row (history placeholder)
  const childRow = document.createElement("tr");
  childRow.classList.add("child-row");
  childRow.innerHTML = `
    <td colspan="7">
      <div class="child-content">
        <h3>History</h3>
        <p>No history yet for this new product.</p>
      </div>
    </td>
  `;

  // Append rows to the table body
  tableBody.appendChild(parentRow);
  tableBody.appendChild(childRow);

  // Attach toggle listener to the new row's toggle button
  const toggleBtn = parentRow.querySelector(".toggle-btn");
  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle('rotated');
    childRow.style.display = (childRow.style.display === 'table-row') ? 'none' : 'table-row';
  });
}
