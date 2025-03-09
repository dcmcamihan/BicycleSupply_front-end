document.addEventListener("DOMContentLoaded", function() {
    // Toggle child rows for collapsible table
    const toggleButtons = document.querySelectorAll('.collapsible-table .toggle-btn');
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('rotated');
        const parentRow = btn.closest('.parent-row');
        const childRow = parentRow.nextElementSibling;
        childRow.style.display = (childRow.style.display === 'table-row') ? 'none' : 'table-row';
      });
    });
    
    // Modal handling for Add Stock Out (both top and bottom buttons)
    const btnAddStockoutTop = document.getElementById("btnAddStockoutTop");
    const btnAddStockoutBottom = document.getElementById("btnAddStockoutBottom");
    const addStockoutModal = document.getElementById("addStockoutModal");
    const closeAddStockoutModal = document.getElementById("closeAddStockoutModal");
    
    if (btnAddStockoutTop) {
      btnAddStockoutTop.addEventListener("click", () => {
        addStockoutModal.style.display = "block";
      });
    }
    if (btnAddStockoutBottom) {
      btnAddStockoutBottom.addEventListener("click", () => {
        addStockoutModal.style.display = "block";
      });
    }
    if (closeAddStockoutModal) {
      closeAddStockoutModal.addEventListener("click", () => {
        addStockoutModal.style.display = "none";
      });
    }
    
    window.addEventListener("click", (e) => {
      if (e.target === addStockoutModal) {
        addStockoutModal.style.display = "none";
      }
    });
    
    // (Additional event listeners for edit and delete actions can be added here)
  });
  