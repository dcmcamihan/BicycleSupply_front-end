function initEmployeeEditIcons() {
    const editIcons = document.querySelectorAll(".edit-icon");
    const editEmployeeModal = document.getElementById("editEmployeeModal");
    const closeModal = document.querySelector(".close-modal");
    const editEmployeeForm = document.getElementById("editEmployeeForm");
  
    let currentRow = null; // track which row is being edited
    let currentImageCell = null;
  
    editIcons.forEach(icon => {
      icon.addEventListener("click", () => {
        currentRow = icon.closest("tr");
        
        const empNameCell = currentRow.cells[1];
        const genderCell = currentRow.cells[2];
        const statusCell = currentRow.cells[3];
        const contactCell = currentRow.cells[4];
        currentImageCell = currentRow.cells[0];
  
        document.getElementById("editEmpName").value = empNameCell.textContent.trim();
        document.getElementById("editEmpGender").value = genderCell.textContent.trim();
        const statusSpan = statusCell.querySelector("span");
        document.getElementById("editEmpStatus").value = statusSpan.textContent.trim();
        document.getElementById("editEmpContact").value = contactCell.textContent.trim();
  
        editEmployeeModal.style.display = "block";
      });
    });
  
    closeModal.addEventListener("click", () => {
      editEmployeeModal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      if (e.target === editEmployeeModal) {
        editEmployeeModal.style.display = "none";
      }
    });
  
    editEmployeeForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      if (!currentRow) return;
  
      const newName = document.getElementById("editEmpName").value;
      const newGender = document.getElementById("editEmpGender").value;
      const newStatus = document.getElementById("editEmpStatus").value;
      const newContact = document.getElementById("editEmpContact").value;
      const newImageFile = document.getElementById("editEmpImage").files[0];
  
      currentRow.cells[1].textContent = newName;
      currentRow.cells[2].textContent = newGender;
      const statusSpan = currentRow.cells[3].querySelector("span");
      statusSpan.textContent = newStatus;
      statusSpan.classList.remove("active", "on-leave", "terminated");
      if (newStatus === "Active") statusSpan.classList.add("active");
      else if (newStatus === "On Leave") statusSpan.classList.add("on-leave");
      else if (newStatus === "Terminated") statusSpan.classList.add("terminated");
      currentRow.cells[4].textContent = newContact;
  
      if (newImageFile && currentImageCell) {
        const imgElem = currentImageCell.querySelector("img");
        imgElem.src = URL.createObjectURL(newImageFile);
      }
  
      editEmployeeModal.style.display = "none";
      editEmployeeForm.reset();
    });
  }
  