document.addEventListener("DOMContentLoaded", function() {
  // Get the context of the canvas element
  const ctx = document.getElementById('productBarChart').getContext('2d');

  // Create the bar chart
  const productBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Deore XT Groupset', 'Road Bike Helmet', 'MTB Chain Lube'],
      datasets: [
        {
          label: 'Cost',
          data: [350, 120, 8],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Price',
          data: [450, 200, 80],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Profit',
          data: [100, 100, 50],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Quantity',
          data: [10, 30, 60],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});
