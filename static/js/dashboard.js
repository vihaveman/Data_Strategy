d3.json("/production").then(data => {
    console.log(data);

    // Populate the ticker dropdown with the unique tickers from the data.
    const products = [...new Set(data.map(item => item.Product))];
    const productDropdown = d3.select("#productDropdown");
    products.forEach(ticker => {
        productDropdown.append("option").text(product);
    });

    // When a dropdown value is changed, update the visualizations.
    d3.select("#productDropdown").on("change", updateVisualizations);

    function updateVisualizations() {
        const selectedProduct = productDropdown.node().value;

        // Filter the data based on the selected ticker.
        const filteredData = data.filter(item => item.Product === selectedProduct);

        // Get the container to add the table to
        const product = d3.select("#product");

        // Clear the previous contents.
        product.html(""); 

        // Check if filteredData is not empty
        if (filteredData.length > 0) {
            // Create the table
            createTable(filteredData, product);
        } else {
            // Handle the case where filteredData is empty, e.g., display a message
            console.log("No data matches the selected product.");
        }
    }

    // Call the function to update the visualizations initially.
    updateVisualizations();

   