// Tab Switching
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    const tabName = btn.getAttribute("data-tab");
    document.getElementById(tabName).classList.add("active");
  });
});

// Modal Handling for Brands & Categories
const bcModal = document.getElementById("bcModal");
const closeModal = document.querySelector(".close-modal");
const addBrandBtn = document.getElementById("addBrandBtn");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const bcForm = document.getElementById("bcForm");
const brandGroup = document.getElementById("brandGroup");
const categoryGroup = document.getElementById("categoryGroup");
const modalTitle = document.getElementById("modalTitle");

let currentEditing = null; 

// Open modal for adding or editing
function openModal(type, element = null) {
  currentEditing = { type, element };
  bcModal.style.display = "block";
  if (type === "brand") {
    modalTitle.textContent = element ? "Edit Brand" : "Add Brand";
    brandGroup.style.display = "block";
    categoryGroup.style.display = "none";
    if (element) {
      // element is a brand card
      document.getElementById("brandName").value = element.querySelector("h3").textContent;
      const originText = element.querySelector("p").textContent.replace("Origin: ", "");
      document.getElementById("brandOrigin").value = originText;
    } else {
      bcForm.reset();
    }
  } else if (type === "category") {
    modalTitle.textContent = element ? "Edit Category" : "Add Category";
    brandGroup.style.display = "none";
    categoryGroup.style.display = "block";
    if (element) {
      // element is a table row
      document.getElementById("categoryCode").value = element.cells[0].textContent;
      document.getElementById("categoryName").value = element.cells[1].textContent;
    } else {
      bcForm.reset();
    }
  }
}

closeModal.addEventListener("click", () => {
  bcModal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === bcModal) {
    bcModal.style.display = "none";
  }
});

// Handle form submission for both brand and category
bcForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentEditing) return;

  if (currentEditing.type === "brand") {
    const newBrandName = document.getElementById("brandName").value;
    const newOrigin = document.getElementById("brandOrigin").value;
    if (currentEditing.element) {
      // Edit existing brand card
      currentEditing.element.querySelector("h3").textContent = newBrandName;
      currentEditing.element.querySelector("p").textContent = "Origin: " + newOrigin;
    } else {
      // Create a new brand card and append it to the brand list
      const brandList = document.querySelector(".brand-list");
      const brandCard = document.createElement("div");
      brandCard.classList.add("brand-card");
      brandCard.innerHTML = `
        <img src="panel/brands/img/generic-brand.png" alt="${newBrandName}">
        <h3>${newBrandName}</h3>
        <p>Origin: ${newOrigin}</p>
        <div class="card-actions">
          <i class="fa-solid fa-pen-to-square edit-brand"></i>
          <i class="fa-solid fa-trash delete-brand"></i>
        </div>
      `;
      brandList.appendChild(brandCard);
      
      brandCard.querySelector(".edit-brand").addEventListener("click", () => {
        openModal("brand", brandCard);
      });
      // You can also attach a delete listener here
    }
  } else if (currentEditing.type === "category") {
    const newCategoryCode = document.getElementById("categoryCode").value;
    const newCategoryName = document.getElementById("categoryName").value;
    if (currentEditing.element) {
      // Edit existing category row
      currentEditing.element.cells[0].textContent = newCategoryCode;
      currentEditing.element.cells[1].textContent = newCategoryName;
    } else {
      // Create a new row in the categories table
      const tableBody = document.querySelector(".categories-table tbody");
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${newCategoryCode}</td>
        <td>${newCategoryName}</td>
        <td>
          <i class="fa-solid fa-pen-to-square edit-category"></i>
          <i class="fa-solid fa-trash delete-category"></i>
        </td>
      `;
      tableBody.appendChild(newRow);
      // Attach event listeners for edit and delete
      newRow.querySelector(".edit-category").addEventListener("click", () => {
        openModal("category", newRow);
      });
    }
  }

  bcModal.style.display = "none";
  bcForm.reset();
});
