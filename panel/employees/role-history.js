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
    
    // Pagination functionality (if necessary for dynamic data)
    // For static data, pagination is not dynamic but you can extend it if needed.
    
    // Add Sale Modal handling
    const btnAddSale = document.getElementById("btnAddSale");
    const addSaleModal = document.getElementById("addSaleModal");
    const closeAddSaleModal = document.getElementById("closeAddSaleModal");
    
    if (btnAddSale) {
      btnAddSale.addEventListener("click", () => {
        addSaleModal.style.display = "block";
      });
    }
    
    if (closeAddSaleModal) {
      closeAddSaleModal.addEventListener("click", () => {
        addSaleModal.style.display = "none";
      });
    }
    
    window.addEventListener("click", (e) => {
      if (e.target === addSaleModal) {
        addSaleModal.style.display = "none";
      }
    });
    
    // Attach event listeners for edit and delete actions as needed
    // (You can further expand these functions to handle dynamic data)
  });
  