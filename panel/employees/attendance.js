document.addEventListener("DOMContentLoaded", function () {
    // ======= Data & Pagination =======
    let attendanceData = [
      {
        empID: "E001",
        firstName: "Savannah",
        middleName: "",
        lastName: "Nguyen",
        employeeStatus: "Active",
        attendanceStatus: "Present",
        date: "2025-03-10",
        timeIn: "08:00",
        timeOut: "17:00",
        remarks: "On time",
      },
      // Additional records can be added here...
    ];
  
    let currentPage = 1;
    const itemsPerPage = 10;
  
    // ======= Utility Functions =======
    function computeHoursWorked(timeIn, timeOut) {
      let [inH, inM] = timeIn.split(":").map(Number);
      let [outH, outM] = timeOut.split(":").map(Number);
      let start = inH * 60 + inM;
      let end = outH * 60 + outM;
      let diff = end - start;
      if (diff < 0) diff += 24 * 60; // handle overnight shifts
      return (diff / 60).toFixed(2);
    }
  
    function getEmployeeStatusColor(status) {
      const colors = {
        Active: "#2ecc71",
        Probationary: "#3498db",
        "Part-Time": "#9b59b6",
        "Full-Time": "#1abc9c",
        Terminated: "#e74c3c",
        Resigned: "#95a5a6",
        Retired: "#7f8c8d",
      };
      return colors[status] || "#cccccc";
    }
  
    function getAttendanceColor(status) {
      const colors = {
        Present: "#2cae74",
        "Leave of Absence": "#c0392b",
        Suspended: "#f39c12",
        Furloughed: "#9b59b6",
        "Medical Leave": "#3498db",
        "Parental Leave": "#f1c40f",
      };
      return colors[status] || "#cccccc";
    }
  
    // ======= Rendering Functions =======
    function renderTable() {
      const filterCriteria = document.getElementById("filterCriteria").value;
      const searchText = document.getElementById("searchInput").value.trim().toLowerCase();
  
      // Filter data based on criteria
      let filteredData = attendanceData.filter((rec) => {
        const fullName = (
          rec.firstName +
          " " +
          (rec.middleName ? rec.middleName + " " : "") +
          rec.lastName
        ).toLowerCase();
        const hoursWorked = computeHoursWorked(rec.timeIn, rec.timeOut);
        if (filterCriteria === "all") {
          return (
            rec.empID.toLowerCase().includes(searchText) ||
            fullName.includes(searchText) ||
            rec.employeeStatus.toLowerCase().includes(searchText) ||
            rec.attendanceStatus.toLowerCase().includes(searchText) ||
            hoursWorked.toString().includes(searchText)
          );
        } else if (filterCriteria === "attendance") {
          return rec.attendanceStatus.toLowerCase().includes(searchText);
        } else if (filterCriteria === "empstatus") {
          return rec.employeeStatus.toLowerCase().includes(searchText);
        } else if (filterCriteria === "name") {
          return fullName.includes(searchText);
        } else if (filterCriteria === "hours") {
          return hoursWorked.toString().includes(searchText);
        }
        return true;
      });
  
      // Pagination
      const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
      if (currentPage > totalPages) currentPage = totalPages;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  
      // Render table rows
      const tbody = document.getElementById("attendanceTbody");
      tbody.innerHTML = "";
      paginatedData.forEach((rec) => {
        const fullName =
          rec.firstName + (rec.middleName ? " " + rec.middleName : "") + " " + rec.lastName;
        const hoursWorked = computeHoursWorked(rec.timeIn, rec.timeOut);
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${rec.empID}</td>
          <td>${fullName}</td>
          <td><span class="emp-status" style="background-color:${getEmployeeStatusColor(
            rec.employeeStatus
          )};">${rec.employeeStatus}</span></td>
          <td><span class="att-status" style="background-color:${getAttendanceColor(
            rec.attendanceStatus
          )};">${rec.attendanceStatus}</span></td>
          <td>${rec.timeIn}</td>
          <td>${rec.timeOut}</td>
          <td>${hoursWorked}</td>
          <td>${rec.remarks || ""}</td>
          <td>
            <button class="edit-btn" data-index="${attendanceData.indexOf(rec)}">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete-btn" data-index="${attendanceData.indexOf(rec)}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        `;
        tbody.appendChild(row);
      });
  
      // Update pagination controls
      document.getElementById("pageNumber").textContent = currentPage;
      document.getElementById("prevPage").disabled = currentPage === 1;
      document.getElementById("nextPage").disabled = currentPage === totalPages;
  
      // Attach edit and delete events
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const idx = this.getAttribute("data-index");
          openEditModal(idx);
        });
      });
  
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const idx = this.getAttribute("data-index");
          if (confirm("Are you sure you want to delete this attendance record?")) {
            attendanceData.splice(idx, 1);
            refreshSystem();
          }
        });
      });
    }
  
    function updateSummaryBoxes() {
      let counts = {
        Present: 0,
        "Leave of Absence": 0,
        Suspended: 0,
        Furloughed: 0,
        "Medical Leave": 0,
        "Parental Leave": 0,
      };
      attendanceData.forEach((rec) => {
        if (counts.hasOwnProperty(rec.attendanceStatus)) {
          counts[rec.attendanceStatus]++;
        }
      });
      document.getElementById("presentCount").textContent = counts["Present"];
      document.getElementById("onLeaveCount").textContent = counts["Leave of Absence"];
      document.getElementById("otherCount").textContent =
        counts["Suspended"] +
        counts["Furloughed"] +
        counts["Medical Leave"] +
        counts["Parental Leave"];
      // Total employees equals total records
      document.getElementById("totalEmployees").textContent = attendanceData.length;
    }
  
    function refreshSystem() {
      renderTable();
      updateSummaryBoxes();
    }
  
    // ======= Event Listeners for Search, Filter & Pagination =======
    document.getElementById("searchInput").addEventListener("input", () => {
      currentPage = 1;
      renderTable();
    });
  
    document.getElementById("filterCriteria").addEventListener("change", () => {
      currentPage = 1;
      renderTable();
    });
  
    document.getElementById("prevPage").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
      }
    });
  
    document.getElementById("nextPage").addEventListener("click", () => {
      currentPage++;
      renderTable();
    });
  
    // ======= Modal Handling: Add Attendance =======
    const addModal = document.getElementById("addAttendanceModal");
    const btnAddAttendance = document.getElementById("btnAddAttendance");
    const closeAddModal = document.getElementById("closeAddModal");
  
    btnAddAttendance.addEventListener("click", () => {
      addModal.style.display = "block";
    });
  
    closeAddModal.addEventListener("click", () => {
      addModal.style.display = "none";
    });
  
    document.getElementById("addAttendanceForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const newRecord = {
        empID: document.getElementById("addEmpID").value.trim(),
        firstName: document.getElementById("addEmpFirstName").value.trim(),
        middleName: document.getElementById("addEmpMiddleName").value.trim(),
        lastName: document.getElementById("addEmpLastName").value.trim(),
        employeeStatus: document.getElementById("addEmpStatus").value,
        attendanceStatus: document.getElementById("addAttendanceStatus").value,
        date: document.getElementById("addDate").value,
        timeIn: document.getElementById("addTimeIn").value,
        timeOut: document.getElementById("addTimeOut").value,
        remarks: document.getElementById("addRemarks").value.trim(),
      };
      attendanceData.push(newRecord);
      this.reset();
      addModal.style.display = "none";
      refreshSystem();
    });
  
    // ======= Modal Handling: Edit Attendance =======
    const editModal = document.getElementById("editAttendanceModal");
    const closeEditModal = document.getElementById("closeEditModal");
  
    closeEditModal.addEventListener("click", () => {
      editModal.style.display = "none";
    });
  
    document.getElementById("editAttendanceForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const idx = document.getElementById("editRowIndex").value;
      attendanceData[idx] = {
        empID: document.getElementById("editEmpID").value.trim(),
        firstName: document.getElementById("editEmpFirstName").value.trim(),
        middleName: document.getElementById("editEmpMiddleName").value.trim(),
        lastName: document.getElementById("editEmpLastName").value.trim(),
        employeeStatus: document.getElementById("editEmpStatus").value,
        attendanceStatus: document.getElementById("editAttendanceStatus").value,
        date: document.getElementById("editDate").value,
        timeIn: document.getElementById("editTimeIn").value,
        timeOut: document.getElementById("editTimeOut").value,
        remarks: document.getElementById("editRemarks").value.trim(),
      };
      this.reset();
      editModal.style.display = "none";
      refreshSystem();
    });
  
    function openEditModal(index) {
      const record = attendanceData[index];
      if (!record) return;
      document.getElementById("editRowIndex").value = index;
      document.getElementById("editEmpID").value = record.empID;
      document.getElementById("editEmpFirstName").value = record.firstName;
      document.getElementById("editEmpMiddleName").value = record.middleName;
      document.getElementById("editEmpLastName").value = record.lastName;
      document.getElementById("editEmpStatus").value = record.employeeStatus;
      document.getElementById("editAttendanceStatus").value = record.attendanceStatus;
      document.getElementById("editDate").value = record.date;
      document.getElementById("editTimeIn").value = record.timeIn;
      document.getElementById("editTimeOut").value = record.timeOut;
      document.getElementById("editRemarks").value = record.remarks;
      editModal.style.display = "block";
    }
  
    // ======= Initial Render =======
    refreshSystem();
  });