function fetchData() {
  const url = '/marketdemand';

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const products = [...new Set(data.map(item => item.Product))];
      const productDropdown = document.getElementById("productDropdown");

      products.forEach(product => {
        const option = document.createElement("option");
        option.text = product;
        productDropdown.appendChild(option);
      });

      // When a dropdown value is changed, update the bar chart.
      productDropdown.addEventListener("change", updateBarChart);
      updateBarChart();

      function updateBarChart() {
        const selectedProduct = productDropdown.value;
        const filteredData = data.filter(item => item.Product === selectedProduct);
        const processedData = convertData(filteredData);
        
        const month = processedData.map(d => d.Month);
        const total = processedData.map(d => d.Total);
        
        const trace = {
          x: month,
          y: total,
          type: 'bar',
          marker: {
            
        };
        
        const layout = {
          title: 'Market Demand',
          xaxis: {
            title: 'Month'
          },
          yaxis: {
            title: 'Total Demand'
          },
          legend: {
            x: 0,
            y: 1,
            traceorder: 'normal',
            bgcolor: 'rgba(0,0,0,0)',
            bordercolor: 'rgba(0,0,0,0)',
            borderwidth: 0,
            orientation: 'h',
            itemsizing: 'constant',
            itemwidth: 80,
            itemheight: 20,
            itemclick: false,
            xanchor: 'left'
          }
        };
        
        const dataPlotly = [trace];
        
        Plotly.newPlot('barChartContainer', dataPlotly, layout);
      }
    })
    .catch(error => console.log(error));
}

function convertData(data) {
  return data.map(item => ({
    ...item,
    Date: new Date(item.Date),
    Total: parseFloat(item.Total)
  }));
}

fetchData();




