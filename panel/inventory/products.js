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

  // Function to handle image upload in the edit modal
  const editProductImageInput = document.getElementById("editProductImage");
  const editProductImagePreview = document.getElementById("editProductImagePreview");

  if (editProductImageInput && editProductImagePreview) {
    editProductImageInput.addEventListener("change", function (e) {
      const file = e.target.files[0]; // Get the selected file
      if (file) {
        const reader = new FileReader(); // Create a FileReader to read the file
        reader.onload = function (event) {
          // Update the image preview with the uploaded image
          editProductImagePreview.src = event.target.result;
        };
        reader.readAsDataURL(file); // Read the file as a data URL
      }
    });
  }
});