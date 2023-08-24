// Fetch data from '/payment'
async function fetchData() {
    const response = await fetch('/payment'); // Update the route URL
    const data = await response.json();
    return data;
  }
  
  // Create the table
  async function createTable() {
    const data = await fetchData();
  
    // Process data to get unique products
    const uniqueProducts = {};
    data.forEach(item => {
      const product = item.Product;
      if (!uniqueProducts[product]) {
        uniqueProducts[product] = item.WorkingDays;
      }
    });
  
    // Create the table HTML
    const customTableContainer = document.getElementById('customTableContainer'); // Use the new container name here
    const paymentTable = document.createElement('table');
    paymentTable.className = 'table table-bordered';
  
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Product', 'Working Day'];
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    paymentTable.appendChild(thead);
  
    // Create table body
    const tbody = document.createElement('tbody');
    for (const product in uniqueProducts) {
      const row = document.createElement('tr');
      const productNameCell = document.createElement('td');
      const workingDayCell = document.createElement('td');
  
      productNameCell.textContent = product;
      workingDayCell.textContent = uniqueProducts[product];
  
      row.appendChild(productNameCell);
      row.appendChild(workingDayCell);
      tbody.appendChild(row);
    }
    paymentTable.appendChild(tbody);
  
    // Append the table to the new container
    customTableContainer.appendChild(paymentTable); // Use the new container name here
  }
  
  // Call the function to create the table
  createTable();
  
  
  
