function fetchDemandDataAndCreateTable() {
  fetch('/demand')
      .then(response => response.json())
      .then(data => {
          // Create a table element
          const table = document.createElement('table');
          table.classList.add('table'); // Add any classes you want for styling

          // Create the table header
          const thead = document.createElement('thead');
          const headerRow = document.createElement('tr');
          ['Product', 'Demand'].forEach(headerText => {
              const th = document.createElement('th');
              th.innerText = headerText;
              headerRow.appendChild(th);
          });
          thead.appendChild(headerRow);
          table.appendChild(thead);

          // Create the table body
          const tbody = document.createElement('tbody');
          data.forEach(item => {
              const row = document.createElement('tr');
              const tdProduct = document.createElement('td');
              tdProduct.innerText = item.Product;
              const tdDemand = document.createElement('td');
              tdDemand.innerText = item.Demand;
              row.appendChild(tdProduct);
              row.appendChild(tdDemand);
              tbody.appendChild(row);
          });
          table.appendChild(tbody);

          // Append the table to the placeholder div
          document.getElementById('demandTable').appendChild(table);
      })
      .catch(error => {
          console.error('Error fetching demand data:', error);
      });
}

// Call the function when the page loads
fetchDemandDataAndCreateTable();





  
  
  

  
  