$(document).ready(function() {
    // Load data from Flask app
    d3.json('/employee').then(data => {
      // Process data and cluster based on Satisfaction
      const clusters = {
        "below3": {},
        "between3and4": {},
        "above4": {}
      };
  
      data.forEach(item => {
        const satisfaction = parseFloat(item.Satisfaction);
        const department = item.Department;
        const gender = item.Gender;
  
        if (satisfaction < 3) {
          if (!clusters["below3"][department]) {
            clusters["below3"][department] = {};
          }
          if (!clusters["below3"][department][gender]) {
            clusters["below3"][department][gender] = 0;
          }
          clusters["below3"][department][gender]++;
        } else if (satisfaction >= 3 && satisfaction <= 4) {
          if (!clusters["between3and4"][department]) {
            clusters["between3and4"][department] = {};
          }
          if (!clusters["between3and4"][department][gender]) {
            clusters["between3and4"][department][gender] = 0;
          }
          clusters["between3and4"][department][gender]++;
        } else {
          if (!clusters["above4"][department]) {
            clusters["above4"][department] = {};
          }
          if (!clusters["above4"][department][gender]) {
            clusters["above4"][department][gender] = 0;
          }
          clusters["above4"][department][gender]++;
        }
      });
  
      // Handle dropdown change event
      $('#scoreDropdown').change(function() {
        const selectedScore = $(this).val();
        populateTable(selectedScore);
      });
  
      // Function to populate the table
      function populateTable(score) {
        const tableContainer = $('#tableContainer');
        tableContainer.empty();
  
          // Add a title element before the table
          const tableTitle = $('<h3>Employee Satisfaction Cluster </h3>');
          tableTitle.appendTo(tableContainer);
  
        const table = $('<table class="table table-bordered table-hover"></table>');
        const thead = $('<thead></thead>').appendTo(table);
        const tbody = $('<tbody></tbody>').appendTo(table);
  
        // Create table header
        const headerRow = $('<tr></tr>').appendTo(thead);
        headerRow.append('<th>Department</th>');
        headerRow.append('<th>Gender</th>');
        headerRow.append('<th>Count</th>');
  
        // Populate table rows
        for (const department in clusters[score]) {
          for (const gender in clusters[score][department]) {
            const count = clusters[score][department][gender];
            const row = $('<tr></tr>').appendTo(tbody);
  
            // Add classes based on gender for styling
            if (gender === 'M') {
              row.addClass('table-info'); // Blue for male
            } else if (gender === 'F') {
              row.addClass('table-pink'); // Pink for female
            }
  
            row.append(`<td>${department}</td>`);
            row.append(`<td>${gender}</td>`);
            row.append(`<td>${count}</td>`);
          }
        }
  
        table.appendTo(tableContainer);
      }
  
      // Initial population of the table
      populateTable("below3");
    });
  });