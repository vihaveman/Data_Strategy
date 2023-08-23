// Load data Flask app
d3.json('/employee').then(data => {
    // Process data and cluster based on Satisfaction
    const clusters = {};
  
    data.forEach(item => {
      const department = item.Department;
      const satisfaction = parseFloat(item.Satisfaction);
  
      if (!clusters[satisfaction]) {
        clusters[satisfaction] = [];
      }
  
      clusters[satisfaction].push(department);
    });
  
    // Convert clusters to an array of objects
    const clusterArray = Object.keys(clusters).map(satisfaction => ({
      satisfaction: parseFloat(satisfaction),
      departments: clusters[satisfaction]
    }));
  
    // Create a simple bar chart using D3.js
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    const svg = d3.select('#clusterContainer')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    const xScale = d3.scaleBand()
      .domain(clusterArray.map(d => d.satisfaction))
      .range([0, width])
      .padding(0.1);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(clusterArray, d => d.departments.length)])
      .range([height, 0]);
  
    svg.selectAll('.bar')
      .data(clusterArray)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.satisfaction))
      .attr('y', d => yScale(d.departments.length))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.departments.length));
  
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
      .text('Department Clustering by Satisfaction');
  });
  
  




