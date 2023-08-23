function fetchData() {
  const url = '/tradinginfo';

  fetch(url)
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
      tickerDropdown.addEventListener("change", updateVisualizations.bind(null, data, tickerDropdown));
      // Call updateVisualizations with the fetched data
      updateVisualizations(data, tickerDropdown);
    })
    .catch(error => console.log(error));
}

function updateVisualizations(data, tickerDropdown) {
  const selectedTicker = tickerDropdown.value;
  const filteredData = data.filter(item => item.Ticker === selectedTicker);
  drawCandlestickChart(filteredData);
}

function drawCandlestickChart(data) {
  const dates = [];
  const lows = [];
  const opens = [];
  const closes = [];
  const highs = [];

  data.forEach(item => {
    const dateValue = new Date(Date.parse(item.Date));
    const lowValue = parseFloat(item.Low);
    const openValue = parseFloat(item.Open);
    const closeValue = parseFloat(item.Close);
    const highValue = parseFloat(item.High);

    dates.push(dateValue);
    lows.push(lowValue);
    opens.push(openValue);
    closes.push(closeValue);
    highs.push(highValue);
  });

  const trace = {
    x: dates,
    close: closes,
    high: highs,
    low: lows,
    open: opens,
    type: 'candlestick',
    increasing: { line: { color: 'green' } },
    decreasing: { line: { color: 'red' } },
  };

  const layout = {
    title: 'Monthly Trading',
    xaxis: {
      title: 'Date'
    },
    yaxis: {
      title: 'Price'
    }
  };

  const dataPlotly = [trace];

  Plotly.newPlot('candlestickChart', dataPlotly, layout);
}

fetchData();




