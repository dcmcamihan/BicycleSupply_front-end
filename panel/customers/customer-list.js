document.addEventListener("DOMContentLoaded", function() {
    // DOM elements
    const searchInput = document.getElementById("searchInput");
    const filterCriteria = document.getElementById("filterCriteria");
    const customerTbody = document.getElementById("customerTbody");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageNumberSpan = document.getElementById("pageNumber");
    const btnAddCustomer = document.getElementById("btnAddCustomer");
    const btnAddCustomerBottom = document.getElementById("btnAddCustomerBottom");
    const addCustomerModal = document.getElementById("addCustomerModal");
    const closeAddCustomerModal = document.getElementById("closeAddCustomerModal");
    const addCustomerForm = document.getElementById("addCustomerForm");
    const editCustomerModal = document.getElementById("editCustomerModal");
    const closeEditCustomerModal = document.getElementById("closeEditCustomerModal");
    const editCustomerForm = document.getElementById("editCustomerForm");
  
    // Sample data – in a real application, this might be fetched from an API
    let customerData = [
      {
        customer_id: 101,
        first_name: "John",
        middle_name: "",
        last_name: "Doe",
        gender: "M",
        contact: "+123456789"
      },
      {
        customer_id: 102,
        first_name: "Jane",
        middle_name: "A.",
        last_name: "Smith",
        gender: "F",
        contact: "jane.smith@example.com"
      },
      {
        customer_id: 103,
        first_name: "Michael",
        middle_name: "B.",
        last_name: "Johnson",
        gender: "M",
        contact: "+1987654321"
      }
    ];
    
    // Pagination variables
    let currentPage = 1;
    const rowsPerPage = 10;
    
    // Render table based on filtered data and pagination
    function renderTable() {
      const filteredData = filterSearchData();
      const totalRows = filteredData.length;
      const maxPage = Math.ceil(totalRows / rowsPerPage);
      if (currentPage > maxPage && maxPage !== 0) {
        currentPage = maxPage;
      }
      pageNumberSpan.textContent = currentPage.toString();
      prevPageBtn.disabled = currentPage <= 1;
      nextPageBtn.disabled = currentPage >= maxPage;
      
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const pageData = filteredData.slice(startIndex, endIndex);
      
      customerTbody.innerHTML = "";
      pageData.forEach((cust, idx) => {
        const row = document.createElement("tr");
        const fullName = `${cust.first_name} ${cust.middle_name ? cust.middle_name + " " : ""}${cust.last_name}`;
        row.innerHTML = `
          <td>${cust.customer_id}</td>
          <td>${fullName}</td>
          <td>${cust.gender}</td>
          <td>${cust.contact}</td>
          <td>
            <i class="fa-solid fa-pen-to-square edit-customer"></i>
            <i class="fa-solid fa-trash delete-customer"></i>
          </td>
        `;
        
        // Edit button event
        const editIcon = row.querySelector(".edit-customer");
        editIcon.addEventListener("click", () => {
          openEditModal(cust, startIndex + idx);
        });
        
        // Delete button event
        const deleteIcon = row.querySelector(".delete-customer");
        deleteIcon.addEventListener("click", () => {
          if (confirm("Are you sure you want to delete this customer?")) {
            // Remove the customer and re-render the table
            customerData.splice(startIndex + idx, 1);
            renderTable();
          }
        });
        
        customerTbody.appendChild(row);
      });
    }
    
    // Filtering function – returns customers that match search
    function filterSearchData() {
      const criteria = filterCriteria.value;
      const searchVal = searchInput.value.toLowerCase().trim();
      
      return customerData.filter(cust => {
        let textToSearch = "";
        switch (criteria) {
          case "all":
            textToSearch = `${cust.customer_id} ${cust.first_name} ${cust.middle_name} ${cust.last_name} ${cust.gender} ${cust.contact}`;
            break;
          case "name":
            textToSearch = `${cust.first_name} ${cust.middle_name} ${cust.last_name}`;
            break;
          case "gender":
            textToSearch = cust.gender;
            break;
          default:
            textToSearch = `${cust.customer_id} ${cust.first_name} ${cust.middle_name} ${cust.last_name} ${cust.gender} ${cust.contact}`;
        }
        return textToSearch.toLowerCase().includes(searchVal);
      });
    }
    
    // Modal handling for adding customer
    btnAddCustomer.addEventListener("click", () => {
      addCustomerModal.style.display = "block";
    });
    btnAddCustomerBottom.addEventListener("click", () => {
      addCustomerModal.style.display = "block";
    });
    closeAddCustomerModal.addEventListener("click", () => {
      addCustomerModal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      if (e.target === addCustomerModal) {
        addCustomerModal.style.display = "none";
      }
    });
    
    // Add Customer Form submit
    addCustomerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const firstName = document.getElementById("customerFirstName").value.trim();
      const middleName = document.getElementById("customerMiddleName").value.trim();
      const lastName = document.getElementById("customerLastName").value.trim();
      const gender = document.getElementById("customerGender").value;
      const contact = document.getElementById("customerContact").value.trim();
      
      // Auto-generate new customer ID
      const newID = customerData.length ? Math.max(...customerData.map(c => c.customer_id)) + 1 : 101;
      const newCustomer = {
        customer_id: newID,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        gender: gender,
        contact: contact
      };
      customerData.push(newCustomer);
      renderTable();
      addCustomerForm.reset();
      addCustomerModal.style.display = "none";
    });
    
    // Modal handling for editing customer
    function openEditModal(cust, index) {
      document.getElementById("editCustomerIndex").value = index;
      document.getElementById("editCustomerFirstName").value = cust.first_name;
      document.getElementById("editCustomerMiddleName").value = cust.middle_name;
      document.getElementById("editCustomerLastName").value = cust.last_name;
      document.getElementById("editCustomerGender").value = cust.gender;
      document.getElementById("editCustomerContact").value = cust.contact;
      editCustomerModal.style.display = "block";
    }
    closeEditCustomerModal.addEventListener("click", () => {
      editCustomerModal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      if (e.target === editCustomerModal) {
        editCustomerModal.style.display = "none";
      }
    });
    editCustomerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const index = document.getElementById("editCustomerIndex").value;
      customerData[index].first_name = document.getElementById("editCustomerFirstName").value.trim();
      customerData[index].middle_name = document.getElementById("editCustomerMiddleName").value.trim();
      customerData[index].last_name = document.getElementById("editCustomerLastName").value.trim();
      customerData[index].gender = document.getElementById("editCustomerGender").value;
      customerData[index].contact = document.getElementById("editCustomerContact").value.trim();
      renderTable();
      editCustomerForm.reset();
      editCustomerModal.style.display = "none";
    });
    
    // Pagination controls
    prevPageBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
      }
    });
    nextPageBtn.addEventListener("click", () => {
      const totalRows = filterSearchData().length;
      const maxPage = Math.ceil(totalRows / rowsPerPage);
      if (currentPage < maxPage) {
        currentPage++;
        renderTable();
      }
    });
    
    // Attach search & filter events
    searchInput.addEventListener("input", () => {
      currentPage = 1;
      renderTable();
    });
    filterCriteria.addEventListener("change", () => {
      currentPage = 1;
      renderTable();
    });
    
    // Initial render
    renderTable();
  });
  