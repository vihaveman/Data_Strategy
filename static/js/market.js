function fetchMarketDataAndDrawPieChart() {
    fetch('/market') // Replace with your actual market route
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the data to check its structure
        const labels = data.map(item => item["Market "]); // Note the space
        const demands = data.map(item => item.Demand);
  
        var ctx = document.getElementById('marketChart').getContext('2d');
        var marketChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Market Distribution',
              data: demands,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }]
          }
        });
      })
      .catch(error => {
        console.error('Error fetching market data:', error);
      });
  }
  
  // Call the function when the page loads
  fetchMarketDataAndDrawPieChart();
  
  
  