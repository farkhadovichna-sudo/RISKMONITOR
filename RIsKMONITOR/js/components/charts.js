// ============================================
// CHARTS - Simple SVG Charts
// ============================================

const Charts = {
  // Bar Chart
  barChart(data, options = {}) {
    const {
      width = 600,
      height = 300,
      barColor = '#4f46e5',
      labelKey = 'label',
      valueKey = 'value'
    } = options;
    
    const maxValue = Math.max(...data.map(d => d[valueKey]));
    const barWidth = (width - 100) / data.length - 10;
    const chartHeight = height - 60;
    
    let bars = '';
    data.forEach((item, i) => {
      const barHeight = (item[valueKey] / maxValue) * chartHeight;
      const x = 50 + i * (barWidth + 10);
      const y = chartHeight - barHeight + 20;
      
      bars += `
        <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" 
              fill="${barColor}" rx="4" class="chart-bar">
          <title>${item[labelKey]}: ${item[valueKey]}</title>
        </rect>
        <text x="${x + barWidth/2}" y="${height - 5}" text-anchor="middle" 
              fill="#64748b" font-size="11">${item[labelKey].slice(0, 8)}</text>
        <text x="${x + barWidth/2}" y="${y - 5}" text-anchor="middle" 
              fill="#0f172a" font-size="12" font-weight="600">${item[valueKey]}</text>
      `;
    });
    
    return `
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" class="chart">
        ${bars}
      </svg>
    `;
  },
  
  // Multi-line trend chart
  trendChart(data, options = {}) {
    const {
      width = 700,
      height = 300,
      lines = ['high', 'medium', 'low'],
      colors = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' },
      labelKey = 'week'
    } = options;
    
    const chartWidth = width - 80;
    const chartHeight = height - 60;
    const maxValue = Math.max(...data.flatMap(d => lines.map(l => d[l])));
    
    // Generate paths for each line
    const paths = {};
    lines.forEach(line => {
      const points = data.map((d, i) => {
        const x = 50 + (i / (data.length - 1)) * chartWidth;
        const y = 30 + chartHeight - (d[line] / maxValue) * chartHeight;
        return `${x},${y}`;
      });
      paths[line] = `M${points.join(' L')}`;
    });
    
    // X-axis labels
    let labels = '';
    data.forEach((d, i) => {
      const x = 50 + (i / (data.length - 1)) * chartWidth;
      labels += `<text x="${x}" y="${height - 10}" text-anchor="middle" fill="#64748b" font-size="11">${d[labelKey]}</text>`;
    });
    
    // Grid lines
    let grid = '';
    for (let i = 0; i <= 4; i++) {
      const y = 30 + (i / 4) * chartHeight;
      const value = Math.round(maxValue - (i / 4) * maxValue);
      grid += `
        <line x1="50" y1="${y}" x2="${width - 30}" y2="${y}" stroke="#e2e8f0" stroke-dasharray="4"/>
        <text x="40" y="${y + 4}" text-anchor="end" fill="#94a3b8" font-size="11">${value}</text>
      `;
    }
    
    return `
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" class="chart">
        ${grid}
        ${lines.map(line => `
          <path d="${paths[line]}" fill="none" stroke="${colors[line]}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        `).join('')}
        ${labels}
        ${data.map((d, i) => {
          const x = 50 + (i / (data.length - 1)) * chartWidth;
          return lines.map(line => {
            const y = 30 + chartHeight - (d[line] / maxValue) * chartHeight;
            return `<circle cx="${x}" cy="${y}" r="4" fill="${colors[line]}" stroke="white" stroke-width="2"/>`;
          }).join('');
        }).join('')}
      </svg>
    `;
  },
  
  // Horizontal Bar Chart (for top lists)
  horizontalBarChart(data, options = {}) {
    const {
      width = 500,
      height = data.length * 45 + 20,
      barColor = '#4f46e5',
      labelKey = 'name',
      valueKey = 'value'
    } = options;
    
    const maxValue = Math.max(...data.map(d => d[valueKey]));
    const barMaxWidth = width - 200;
    
    let bars = '';
    data.forEach((item, i) => {
      const barWidth = (item[valueKey] / maxValue) * barMaxWidth;
      const y = 10 + i * 45;
      
      bars += `
        <text x="5" y="${y + 20}" fill="#0f172a" font-size="13" font-weight="500">${item[labelKey].slice(0, 25)}${item[labelKey].length > 25 ? '...' : ''}</text>
        <rect x="180" y="${y + 5}" width="${barWidth}" height="24" fill="${barColor}" rx="4" opacity="0.9"/>
        <text x="${185 + barWidth}" y="${y + 22}" fill="#0f172a" font-size="12" font-weight="600">${item[valueKey]}</text>
      `;
    });
    
    return `
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" class="chart">
        ${bars}
      </svg>
    `;
  },
  
  // Donut Chart
  donutChart(data, options = {}) {
    const {
      size = 200,
      strokeWidth = 30,
      colors = ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444']
    } = options;
    
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    
    let currentOffset = 0;
    let segments = '';
    
    data.forEach((item, i) => {
      const percentage = item.value / total;
      const dashLength = circumference * percentage;
      const dashOffset = circumference * currentOffset;
      
      segments += `
        <circle cx="${size/2}" cy="${size/2}" r="${radius}" 
                fill="none" stroke="${colors[i % colors.length]}" stroke-width="${strokeWidth}"
                stroke-dasharray="${dashLength} ${circumference - dashLength}"
                stroke-dashoffset="-${dashOffset}"
                transform="rotate(-90 ${size/2} ${size/2})"/>
      `;
      currentOffset += percentage;
    });
    
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        ${segments}
        <text x="${size/2}" y="${size/2}" text-anchor="middle" dominant-baseline="middle" 
              font-size="24" font-weight="700" fill="#0f172a">${total}</text>
        <text x="${size/2}" y="${size/2 + 20}" text-anchor="middle" 
              font-size="12" fill="#64748b">Jami</text>
      </svg>
    `;
  }
};

// Export
window.Charts = Charts;
