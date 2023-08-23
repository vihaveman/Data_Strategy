function fetchData() {
  const url = '/volume';

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const tickers = [...new Set(data.map(item => item.Ticker))];
      const tickerDropdown = document.getElementById("tickerDropdown");

      tickers.forEach(ticker => {
        const option = document.createElement("option");
        option.text = ticker;
        tickerDropdown.appendChild(option);
      });

      // When a dropdown value is changed, update the visualizations.
      tickerDropdown.addEventListener("change", updateVisualizations);
      updateVisualizations();

      function updateVisualizations() {
        const selectedTicker = tickerDropdown.value;
        const filteredData = data.filter(item => item.Ticker === selectedTicker);
        const processedData = convertData(filteredData);
        drawBarGraph(processedData);
      }
    })
    .catch(error => console.log(error));
}

function convertData(data) {
  return data.map(item => ({
    ...item,
    Date: new Date(item.Date),
    Volume: parseFloat(item.Volume)
  }));
}

function drawBarGraph(data) {
  const dates = data.map(d => d.Date);
  const volumes = data.map(d => d.Volume);

  const bars = d3
    .select('#barChartContainer')
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', d => (d.Volume >= 100 ? 'bar green-bar' : 'bar red-bar'))
    .attr('x', (d, i) => i * 20)
    .attr('y', d => (d.Volume >= 100 ? d.Volume : 0))
    .attr('width', 10)
    .attr('height', d => Math.abs(d.Volume));

  const trace = {
    x: dates,
    y: volumes,
    type: 'bar',
    marker: {
      color: data.map(d => (d.Volume >= 100 ? 'green' : 'red'))
    }
  };

  const layout = {
    title: 'Trading Volume',
    xaxis: {
      title: 'Date'
    },
    yaxis: {
      title: 'Volume (M)'
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

fetchData();



