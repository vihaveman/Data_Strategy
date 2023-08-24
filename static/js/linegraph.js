function fetchData() {
  const url = '/current';

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const products = [...new Set(data.map(item => item.Product))];
      const productDropdown = document.getElementById("productDropdown");
      productDropdown.innerHTML = ""
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
        const filteredData = data.filter(item => item.Product === selectedProduct);
        const processedData = convertData(filteredData);
        drawLineGraph(processedData);
      }
    })
    .catch(error => console.log(error));
}

function convertData(data) {
  return data.map(item => ({
    ...item,
    ProductionVolume: parseFloat(item.ProductionVolume),
    CostPerUnit: parseFloat(item.CostPerUnit)
  }));
}

function drawLineGraph(data) {
  const margin = { top: 30, right: 20, bottom: 30, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select('#lineChartContainer')
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

  const line = d3.line()
    .x(d => xScale(d.ProductionVolume))
    .y(d => yScale(d.CostPerUnit));

  xScale.domain(d3.extent(data, d => d.ProductionVolume));
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
    .text('Production Volume vs Cost Per Unit');
};