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
  
  // Modal handling for Add Return/Exchange
  const btnAddReturn = document.getElementById("btnAddReturn");
  const addReturnModal = document.getElementById("addReturnModal");
  const closeAddReturnModal = document.getElementById("closeAddReturnModal");
  
  if (btnAddReturn) {
    btnAddReturn.addEventListener("click", () => {
      addReturnModal.style.display = "block";
    });
  }
  
  if (closeAddReturnModal) {
    closeAddReturnModal.addEventListener("click", () => {
      addReturnModal.style.display = "none";
    });
  }
  
  window.addEventListener("click", (e) => {
    if (e.target === addReturnModal) {
      addReturnModal.style.display = "none";
    }
  });
  
  // (Additional event listeners for edit/delete actions can be added here)
});
