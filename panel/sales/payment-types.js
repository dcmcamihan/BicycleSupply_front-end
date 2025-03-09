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
  
    // Pagination functionality (if needed)
    // For this example, assume static data (3 sale records) so pagination might not be necessary.
    // However, you can implement pagination logic similar to the attendance table if required.
  
    // Example: When you click the "Add Sale" button, show the modal
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
  
    // Similarly, attach event listeners for edit and delete actions as needed.
  });
  