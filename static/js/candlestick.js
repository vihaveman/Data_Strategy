function fetchData() {
  const url = '/production';

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

          // When a dropdown value is changed, update the visualizations.
          productDropdown.addEventListener("change", updateVisualizations);
          updateVisualizations();

          function updateVisualizations() {
              const selectedProduct = productDropdown.value;
              const filteredData = data
                  .filter(item => item.Product === selectedProduct)
                  .filter(item => item.Date.endsWith('-22')); // Filter to only include data from 2023

              const processedData = convertData(filteredData);
              drawLineGraph(processedData);
          }
      })
      .catch(error => console.log(error));
}

function convertData(data) {
  const parseTime = d3.timeParse("%b-%y"); // Parses dates in the format "Jan-23"

  return data.map(item => ({
      ...item,
      Date: parseTime(item.Date), // Convert the string date to a Date object
      ProductionVolume: parseFloat(item.ProductionVolume),
      CostPerUnit: parseFloat(item.CostPerUnit)
  }));
}

function drawLineGraph(data) {
  const margin = { top: 30, right: 20, bottom: 30, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
      .select('#line1ChartContainer')
      .html('') // Clear any existing SVG elements
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.Date)) // Use the Date field here
      .range([0, width]);

  const yScale = d3.scaleLinear()
      .range([height, 0]);

  const line = d3.line()
      .x(d => xScale(d.Date)) // Adjust this to use the Date field
      .y(d => yScale(d.CostPerUnit));

  yScale.domain([0, d3.max(data, d => d.CostPerUnit)]);

  svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)
      .style('stroke', 'red');

  svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

  svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale));

  svg.append('text')
      .attr('x', width / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .text('Monthly Cost Per Unit');
}

// Load D3.js and fetch data
document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
      import('https://d3js.org/d3.v7.min.js'), // Load D3.js from the CDN
      fetchData() // Fetch data and draw the line graph
  ]).catch(error => console.log(error));
});

fetchData();




