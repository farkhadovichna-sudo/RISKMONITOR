// ============================================
// EXPORT FUNCTIONS - PDF/Excel/CSV
// ============================================

const Export = {
  // Export to CSV
  toCSV(data, filename = 'export.csv') {
    if (!data || data.length === 0) {
      alert('Eksport uchun ma\'lumot yo\'q');
      return;
    }
    
    const headers = Object.keys(data[0]);
    const csvRows = [];
    
    // Add headers
    csvRows.push(headers.join(','));
    
    // Add data rows
    for (const row of data) {
      const values = headers.map(header => {
        let value = row[header];
        // Handle special characters
        if (typeof value === 'string') {
          value = value.replace(/"/g, '""');
          if (value.includes(',') || value.includes('\n') || value.includes('"')) {
            value = `"${value}"`;
          }
        }
        return value;
      });
      csvRows.push(values.join(','));
    }
    
    const csvContent = '\uFEFF' + csvRows.join('\n'); // BOM for Excel UTF-8
    this.downloadFile(csvContent, filename, 'text/csv;charset=utf-8');
    
    this.showExportSuccess('CSV');
  },
  
  // Export tenders to Excel-compatible CSV
  tendersToExcel(tenders = mockData.TENDERS) {
    const data = tenders.map(t => ({
      'Tender ID': t.id,
      'Buyurtmachi': t.buyurtmachi,
      'G\'olib': t.golib,
      'Summa': t.summa,
      'Soha': t.soha,
      'Hudud': t.hudud,
      'Ishtirokchilar': t.ishtirokchilar,
      'Risk Score': t.riskScore,
      'Risk Band': mockData.getRiskBandLabel(t.riskBand),
      'Sana': t.sana
    }));
    
    const date = new Date().toISOString().split('T')[0];
    this.toCSV(data, `tenderlar_${date}.csv`);
  },
  
  // Export cases to Excel-compatible CSV
  casesToExcel(cases = mockData.CASES) {
    const data = cases.map(c => ({
      'Case ID': c.id,
      'Tender ID': c.tenderId,
      'Buyurtmachi': c.tenderSummary.buyurtmachi,
      'G\'olib': c.tenderSummary.golib,
      'Summa': c.tenderSummary.summa,
      'Risk Score': c.tenderSummary.riskScore,
      'Status': c.status,
      'Inspektor': c.assignedTo,
      'Yaratilgan': c.createdAt,
      'Yangilangan': c.updatedAt,
      'Qaror': c.decision || ''
    }));
    
    const date = new Date().toISOString().split('T')[0];
    this.toCSV(data, `cases_${date}.csv`);
  },
  
  // Export report to PDF (simplified HTML-to-print approach)
  reportToPDF(title = 'RiskMonitor Hisobot') {
    const stats = mockData.getStats();
    const topBuyers = mockData.getTopRiskyBuyers().slice(0, 5);
    const topCompanies = mockData.getTopSignaledCompanies().slice(0, 5);
    const date = new Date().toLocaleDateString('uz-UZ');
    
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            padding: 40px;
            color: #1a1a2e;
            line-height: 1.6;
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px; 
            padding-bottom: 20px;
            border-bottom: 3px solid #6366f1;
          }
          .logo { font-size: 32px; margin-bottom: 10px; }
          h1 { color: #1a1a2e; font-size: 24px; margin-bottom: 5px; }
          .date { color: #666; font-size: 14px; }
          .section { margin-bottom: 30px; }
          .section-title { 
            font-size: 18px; 
            font-weight: 600; 
            margin-bottom: 15px;
            color: #6366f1;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 8px;
          }
          .kpi-grid { 
            display: grid; 
            grid-template-columns: repeat(4, 1fr); 
            gap: 15px; 
            margin-bottom: 30px;
          }
          .kpi-card { 
            background: #f8fafc; 
            padding: 15px; 
            border-radius: 8px;
            text-align: center;
            border: 1px solid #e5e7eb;
          }
          .kpi-value { 
            font-size: 28px; 
            font-weight: 700; 
            color: #1a1a2e; 
          }
          .kpi-label { font-size: 12px; color: #666; margin-top: 5px; }
          .kpi-card.red .kpi-value { color: #ef4444; }
          .kpi-card.yellow .kpi-value { color: #f59e0b; }
          .kpi-card.green .kpi-value { color: #10b981; }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 10px;
          }
          th, td { 
            padding: 10px 12px; 
            text-align: left; 
            border-bottom: 1px solid #e5e7eb;
          }
          th { 
            background: #f1f5f9; 
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .footer { 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
          @media print {
            body { padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🛡️</div>
          <h1>RiskMonitor - ${title}</h1>
          <div class="date">Hisobot sanasi: ${date}</div>
        </div>
        
        <div class="section">
          <div class="section-title">📊 Umumiy statistika</div>
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-value">${stats.total}</div>
              <div class="kpi-label">Jami tenderlar</div>
            </div>
            <div class="kpi-card red">
              <div class="kpi-value">${stats.high}</div>
              <div class="kpi-label">Yuqori risk</div>
            </div>
            <div class="kpi-card yellow">
              <div class="kpi-value">${stats.medium}</div>
              <div class="kpi-label">O'rta risk</div>
            </div>
            <div class="kpi-card green">
              <div class="kpi-value">${stats.low}</div>
              <div class="kpi-label">Past risk</div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">🏛️ Eng riskli buyurtmachilar (Top-5)</div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Buyurtmachi</th>
                <th>O'rtacha risk</th>
                <th>Tenderlar</th>
              </tr>
            </thead>
            <tbody>
              ${topBuyers.map((b, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${b.name}</td>
                  <td><strong>${b.avgRisk}</strong></td>
                  <td>${b.tenderCount}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="section">
          <div class="section-title">🏢 Eng ko'p signal olgan kompaniyalar (Top-5)</div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Kompaniya</th>
                <th>Signallar soni</th>
              </tr>
            </thead>
            <tbody>
              ${topCompanies.map((c, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${c.name}</td>
                  <td><strong>${c.signalCount}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="footer">
          <p>Bu hisobot RiskMonitor tizimi tomonidan avtomatik tarzda yaratildi.</p>
          <p style="margin-top: 5px;">🤖 AI faqat signal beradi — yakuniy qaror inspektor mas'uliyati.</p>
        </div>
        
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    this.showExportSuccess('PDF');
  },
  
  // Download file helper
  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
  
  // Show export success notification
  showExportSuccess(format) {
    if (window.RealTime && window.RealTime.showToast) {
      RealTime.showToast({
        type: 'success',
        icon: '📥',
        title: 'Eksport muvaffaqiyatli',
        message: `${format} fayli yuklab olindi`,
        duration: 4000
      });
    }
  }
};

// Export
window.Export = Export;
