d3.json("/stockinfo").then(data => {
    console.log(data);

    // Populate the ticker dropdown with the unique tickers from the data.
    const tickers = [...new Set(data.map(item => item.Ticker))];
    const tickerDropdown = d3.select("#tickerDropdown");
    tickers.forEach(ticker => {
        tickerDropdown.append("option").text(ticker);
    });

    // When a dropdown value is changed, update the visualizations.
    d3.select("#tickerDropdown").on("change", updateVisualizations);

    function updateVisualizations() {
        const selectedTicker = tickerDropdown.node().value;

        // Filter the data based on the selected ticker.
        const filteredData = data.filter(item => item.Ticker === selectedTicker);

        // Get the container to add the table to
        const stockInfo = d3.select("#stockInfo");

        // Clear the previous contents.
        stockInfo.html(""); 

        // Check if filteredData is not empty
        if (filteredData.length > 0) {
            // Create the table
            createTable(filteredData, stockInfo);
        } else {
            // Handle the case where filteredData is empty, e.g., display a message
            console.log("No data matches the selected ticker.");
        }
    }

    // Call the function to update the visualizations initially.
    updateVisualizations();

    function createTable(data, container) {
        // If there's already a table remove it
        container.select("table").remove();
    
        let table = container.append("table").attr("class", "green-table");
        let tbody = table.append("tbody");
    
        // Exclude the "_id" key-value pair
        let filteredData = data.map(d => {
            delete d["_id"];
            return d;
        });
    
        // Transpose the data
        let transposedData = Object.keys(filteredData[0]).map(key => {
            return [key, ...filteredData.map(d => d[key])];
        });
    
        // Append the rows
        let rows = tbody.selectAll("tr")
            .data(transposedData).enter()
            .append("tr");
    
        // Append the cells
        let cells = rows.selectAll("td")
            .data(d => d).enter()
            .append("td").text(d => d);
    }
        
    
}).catch(error => console.log(error));


