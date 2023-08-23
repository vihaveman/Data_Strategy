function fetchData() {
  const url = '/marketdemand';

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const products = [...new Set(data.map(item => item.Product))];
      const productDropdown = document.getElementById("selectProduct");

      products.forEach(product => {
        const option = document.createElement("option");
        option.text = product;
        productDropdown.appendChild(option);
      });

      // When a dropdown value is changed, update the chart.
      productDropdown.addEventListener("change", updateChart);
      updateChart();

      function updateChart() {
        const selectedProduct = productDropdown.value;
        const filteredData = data.filter(item => item.Product === selectedProduct);
        const processedData = convertData(filteredData);
        drawBarChart(processedData);
      }
    })
    .catch(error => console.log(error));
}

// Parse date string to Date object
function parseDate(dateStr) {
  const [monthStr, yearStr] = dateStr.split('-');
  const month = new Date(Date.parse(monthStr + ' 1, ' + yearStr)).getMonth();
  const year = 2000 + parseInt(yearStr); // Assuming the years are in 'YY' format
  return new Date(year, month);
}

function convertData(data) {
  return data.map(item => ({
    Month: parseDate(item.Month), // Parse date string to Date object
    Total: parseInt(item.Total)
  }));
}

function drawBarChart(data) {
  const margin = { top: 30, right: 20, bottom: 30, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select('#barChartContainer')
    .html('') // Clear any existing SVG elements
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleTime()
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .range([height, 0]);

  xScale.domain(d3.extent(data, d => d.Month));
  yScale.domain([0, d3.max(data, d => d.Total)]);

  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.Month))
    .attr("y", d => yScale(d.Total))
    .attr("width", width / data.length - 2) // Adjust the width of the bars
    .attr("height", d => height - yScale(d.Total));

  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(data.length).tickFormat(d3.timeFormat('%b-%y')));

  svg.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(yScale));

  svg.append('text')
    .attr('x', width / 2)
    .attr('y', -10)
    .attr('text-anchor', 'middle')
    .text('Total Demand by Month');
}

// Load D3.js and fetch data
document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    import('https://d3js.org/d3.v7.min.js'), // Load D3.js from the CDN
    fetchData() // Fetch data and draw the bar chart
  ]).catch(error => console.log(error));
});








