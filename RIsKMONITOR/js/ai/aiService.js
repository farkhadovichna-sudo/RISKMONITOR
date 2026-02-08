// AI Service - Azure OpenAI Integration
// Mock mode bilan ishlaydi, keyinchalik real API ga o'tish mumkin

const AIService = {
  
  // ========================================
  // 1. AI RISK TAHLILI
  // ========================================
  async analyzeRisk(tender) {
    if (AIConfig.isRealApiAvailable()) {
      return this._callAzureOpenAI(this._buildRiskAnalysisPrompt(tender));
    }
    return this._mockRiskAnalysis(tender);
  },
  
  _buildRiskAnalysisPrompt(tender) {
    return `
Siz davlat xaridlari bo'yicha risk tahlilchisisiz. Quyidagi tender ma'lumotlarini tahlil qiling va o'zbek tilida batafsil risk tahlili bering.

Tender: ${tender.id}
Buyurtmachi: ${tender.buyurtmachi}
Summa: ${tender.summa}
G'olib: ${tender.golib}
Ishtirokchilar soni: ${tender.ishtirokchilar}
Risk ball: ${tender.riskBall}/100
Risk darajasi: ${tender.riskBand}

Risk sabablari:
${tender.riskReasons?.map(r => `- ${r.sabab}: ${r.ball} ball`).join('\n')}

Tahlil qiling:
1. Asosiy xavflar
2. Mumkin bo'lgan korrupsiya belgilari
3. Tavsiyalar
4. Xulosalar
    `;
  },
  
  _mockRiskAnalysis(tender) {
    const riskLevel = tender.riskBand || 'medium';
    const responses = {
      high: this._generateHighRiskAnalysis(tender),
      medium: this._generateMediumRiskAnalysis(tender),
      low: this._generateLowRiskAnalysis(tender)
    };
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          analysis: responses[riskLevel],
          generatedAt: new Date().toISOString(),
          model: 'mock-gpt-4o'
        });
      }, AIConfig.mockResponseDelay);
    });
  },
  
  _generateHighRiskAnalysis(tender) {
    return `## 🔴 Yuqori Risk Tahlili

### 📊 Umumiy Baho
Bu tender **jiddiy xavf** belgileriga ega. Risk bali ${tender.riskBall}/100 bo'lib, bu chuqur tekshiruv talab qiladi.

### ⚠️ Aniqlangan Xavflar

**1. Narx Anomaliyasi**
Tender summasi bozor narxlaridan sezilarli farq qiladi. Bu sun'iy ravishda narxni oshirish (bid rigging) belgisi bo'lishi mumkin.

**2. Ishtirokchilar Muammosi**
${tender.ishtirokchilar || 2} ta ishtirokchi - bu kam raqobat. Tender shartlari ataylab cheklangan bo'lishi mumkin.

**3. G'olib Kompaniya**
"${tender.golib || 'Noma\'lum'}" kompaniyasi yaqinda tashkil etilgan yoki byudjet sohasida tajribasi kam bo'lishi mumkin.

### 🔍 Korrupsiya Indikatorlari
- ✗ Texnik talablar haddan tashqari spetsifik
- ✗ Qisqa muddatli e'lon
- ✗ Bitta kompaniyaga moslangan shartlar

### 💡 Tavsiyalar
1. Tender hujjatlarini qayta ko'rib chiqish
2. Bozor narxlarini solishtirish
3. G'olib kompaniya benefitsiarlarini tekshirish
4. Oxirgi 3 yildagi o'xshash tenderlarni tahlil qilish

### 📋 Xulosa
> **Tezkor chora ko'rish talab etiladi.** Bu tender Davlat moliyaviy nazorat qo'mitasiga yo'naltirilishi kerak.`;
  },
  
  _generateMediumRiskAnalysis(tender) {
    return `## 🟡 O'rta Risk Tahlili

### 📊 Umumiy Baho
Bu tender **o'rtacha xavf** darajasiga ega. Risk bali ${tender.riskBall}/100. Qo'shimcha monitoring tavsiya etiladi.

### ⚠️ E'tiborli Jihatlar

**1. Raqobat Darajasi**
${tender.ishtirokchilar || 3} ta ishtirokchi - bu maqbul raqobat, lekin tenderda yangi ishtirokchilar kam.

**2. Narx Tahlili**
Tender summasi bozor narxlariga yaqin, lekin ayrim pozitsiyalarda farq mavjud.

**3. Kompaniya Profili**
G'olib kompaniyaning tajribasi yetarli, lekin byudjet loyihalarida faoliyati kam.

### 🔍 Kuzatuv Kerak
- △ Shartnoma bajarilishini monitoring qilish
- △ To'lov jadvalini nazorat qilish
- △ Sifat tekshiruvini o'tkazish

### 💡 Tavsiyalar
1. Shartnoma bajarilishini muntazam tekshirish
2. Oraliq hisobotlarni talab qilish
3. Sifat ekspertizasini o'tkazish

### 📋 Xulosa
> **Oddiy monitoring** yetarli. Shartnoma bajarilishi davrida qo'shimcha e'tibor berilsin.`;
  },
  
  _generateLowRiskAnalysis(tender) {
    return `## 🟢 Past Risk Tahlili

### 📊 Umumiy Baho
Bu tender **past xavf** darajasiga ega. Risk bali ${tender.riskBall}/100. Standart jarayonlar yetarli.

### ✅ Ijobiy Jihatlar

**1. Yaxshi Raqobat**
${tender.ishtirokchilar || 5}+ ishtirokchi - bu sog'lom raqobatni ko'rsatadi.

**2. Maqbul Narx**
Tender summasi bozor narxlariga mos va iqtisodiy jihatdan samarali.

**3. Ishonchli G'olib**
"${tender.golib || 'Kompaniya'}" - tasdiqlangan tajribaga ega, byudjet loyihalarida ijobiy track record.

### ✓ Tasdiqlangan
- ✓ Ochiq tender jarayoni
- ✓ Yetarli raqobat
- ✓ Bozorga mos narx
- ✓ Ishonchli pudratchi

### 📋 Xulosa
> **Standart monitoring** kifoya. Ushbu tender qonunchilikka mos va samarali o'tkazilgan.`;
  },
  
  // ========================================
  // 2. AVTOMATIK HISOBOT GENERATSIYASI
  // ========================================
  async generateReport(data, reportType = 'weekly') {
    if (AIConfig.isRealApiAvailable()) {
      return this._callAzureOpenAI(this._buildReportPrompt(data, reportType));
    }
    return this._mockReportGeneration(data, reportType);
  },
  
  _buildReportPrompt(data, reportType) {
    return `
Siz davlat xaridlari bo'yicha hisobot yozuvchisisiz. Quyidagi ma'lumotlar asosida ${reportType} hisobot yozing.

Ma'lumotlar:
${JSON.stringify(data, null, 2)}

Hisobot tuzilishi:
1. Executive Summary
2. Asosiy ko'rsatkichlar
3. Risk tahlili
4. Tavsiyalar
5. Xulosa
    `;
  },
  
  _mockReportGeneration(data, reportType) {
    const today = new Date().toLocaleDateString('uz-UZ');
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          report: `# 📊 Haftalik Risk Monitoring Hisoboti

**Sana:** ${today}
**Davr:** Oxirgi 7 kun
**Tayyorladi:** AI Risk Tahlil Tizimi

---

## 📋 Executive Summary

Hisobot davrida **${data?.totalTenders || 127}** ta tender tahlil qilindi. Umumiy risk ko'rsatkichlari oldingi davrga nisbatan **12%** ga yaxshilandi.

### Asosiy Topilmalar:
- 🔴 **${data?.highRisk || 8}** ta tender yuqori risk
- 🟡 **${data?.mediumRisk || 23}** ta tender o'rta risk  
- 🟢 **${data?.lowRisk || 96}** ta tender past risk

---

## 📈 Asosiy Ko'rsatkichlar

| Ko'rsatkich | Qiymat | O'zgarish |
|-------------|--------|-----------|
| Jami tenderlar | ${data?.totalTenders || 127} | +15% |
| O'rtacha risk ball | ${data?.avgRisk || 42} | -8% |
| Yuqori risk ulushi | ${data?.highRiskPercent || '6.3%'} | -2.1% |
| Aniqlangan anomaliyalar | ${data?.anomalies || 5} | -3 |

---

## ⚠️ Diqqatga Sazovor Tenderlar

### 1. TND-2024-00089
- **Summa:** 2.8 mlrd so'm
- **Risk:** 89/100 (Yuqori)
- **Sabab:** Bitta taklifchi, yuqori narx

### 2. TND-2024-00102
- **Summa:** 1.2 mlrd so'm
- **Risk:** 76/100 (Yuqori)
- **Sabab:** Yangi kompaniya g'olib

---

## 💡 Tavsiyalar

1. **Tezkor tekshiruv** - TND-2024-00089 bo'yicha qo'shimcha ekspertiza
2. **Monitoring kuchaytirish** - O'rta risk tenderlarni kuzatish
3. **Profilaktika** - Buyurtmachilar uchun trening o'tkazish

---

## 📊 Xulosa

Umumiy risk holati **barqaror**. Yuqori risk tenderlar soni kamaygan, bu monitoring samaradorligini ko'rsatadi.

> **Keyingi qadam:** Aniqlangan 8 ta yuqori risk tender bo'yicha chuqur tahlil o'tkazish.

---

*Bu hisobot AI Risk Tahlil tizimi tomonidan avtomatik yaratildi*`,
          generatedAt: new Date().toISOString(),
          model: 'mock-gpt-4o'
        });
      }, AIConfig.mockResponseDelay + 500);
    });
  },
  
  // ========================================
  // 3. ANOMALIYA ANIQLASH
  // ========================================
  async detectAnomalies(tenders) {
    if (AIConfig.isRealApiAvailable()) {
      return this._callAzureOpenAI(this._buildAnomalyPrompt(tenders));
    }
    return this._mockAnomalyDetection(tenders);
  },
  
  _buildAnomalyPrompt(tenders) {
    return `
Quyidagi tenderlar ro'yxatini tahlil qiling va g'ayrioddiy pattern'larni aniqlang:

${JSON.stringify(tenders.slice(0, 20), null, 2)}

Quyidagilarni tekshiring:
1. Narx anomaliyalari
2. Vaqt pattern'lari
3. Kompaniya aloqalari
4. Geografik anomaliyalar
    `;
  },
  
  _mockAnomalyDetection(tenders) {
    const anomalies = [
      {
        id: 'ANM-001',
        type: 'price_anomaly',
        severity: 'high',
        title: 'Narx Anomaliyasi',
        description: '3 ta tender bir xil narxda yakunlangan - bu kelishuv belgisi',
        affectedTenders: ['TND-2024-00089', 'TND-2024-00091', 'TND-2024-00095'],
        confidence: 87,
        icon: '💰'
      },
      {
        id: 'ANM-002',
        type: 'timing_pattern',
        severity: 'medium',
        title: 'Vaqt Pattern',
        description: 'Oxirgi daqiqada takliflar - 5 ta tender bir xil vaqtda yakunlangan',
        affectedTenders: ['TND-2024-00102', 'TND-2024-00103'],
        confidence: 72,
        icon: '⏰'
      },
      {
        id: 'ANM-003',
        type: 'company_network',
        severity: 'high',
        title: 'Kompaniya Aloqasi',
        description: 'Epsilon va Delta kompaniyalari bir xil manzilda ro\'yxatdan o\'tgan',
        affectedTenders: ['TND-2024-00087'],
        confidence: 94,
        icon: '🔗'
      },
      {
        id: 'ANM-004',
        type: 'geographic',
        severity: 'low',
        title: 'Geografik Anomaliya',
        description: 'Toshkent kompaniyasi Xorazm tenderlarida doimiy g\'olib',
        affectedTenders: ['TND-2024-00078', 'TND-2024-00082'],
        confidence: 58,
        icon: '🗺️'
      },
      {
        id: 'ANM-005',
        type: 'bid_rotation',
        severity: 'high',
        title: 'Taklifchilar Rotatsiyasi',
        description: '4 ta kompaniya navbatma-navbat g\'olib bo\'lmoqda',
        affectedTenders: ['TND-2024-00065', 'TND-2024-00071', 'TND-2024-00080', 'TND-2024-00088'],
        confidence: 81,
        icon: '🔄'
      }
    ];
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          anomalies: anomalies,
          totalAnalyzed: tenders?.length || 127,
          detectedCount: anomalies.length,
          generatedAt: new Date().toISOString(),
          model: 'mock-gpt-4o'
        });
      }, AIConfig.mockResponseDelay);
    });
  },
  
  // ========================================
  // AZURE OPENAI API CALL
  // ========================================
  async _callAzureOpenAI(prompt) {
    try {
      const response = await fetch(
        `${AIConfig.endpoint}/openai/deployments/${AIConfig.deploymentName}/chat/completions?api-version=${AIConfig.apiVersion}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': AIConfig.apiKey
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: 'Siz davlat xaridlari bo\'yicha risk tahlilchisisiz. O\'zbek tilida javob bering.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 2000
          })
        }
      );
      
      if (!response.ok) {
        throw new Error(`Azure OpenAI error: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        analysis: data.choices[0].message.content,
        generatedAt: new Date().toISOString(),
        model: AIConfig.deploymentName
      };
    } catch (error) {
      console.error('Azure OpenAI Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },
  
  // ========================================
  // TYPING EFFECT HELPER
  // ========================================
  async typeText(element, text, speed = AIConfig.typingDelay) {
    element.innerHTML = '';
    element.className = 'ai-analysis-content';
    const lines = text.split('\n');
    
    for (const line of lines) {
      if (line.startsWith('##')) {
        // H2 Headers with emoji
        const headerText = line.replace(/^#+\s*/, '');
        const headerEl = document.createElement('h2');
        headerEl.className = 'ai-header-h2';
        element.appendChild(headerEl);
        await this._typeInElement(headerEl, headerText, speed);
      } else if (line.startsWith('#')) {
        // H1 Headers
        const headerText = line.replace(/^#+\s*/, '');
        const headerEl = document.createElement('h1');
        headerEl.className = 'ai-header-h1';
        element.appendChild(headerEl);
        await this._typeInElement(headerEl, headerText, speed);
      } else if (line.startsWith('|')) {
        // Table row - render as-is
        const pre = document.createElement('div');
        pre.className = 'ai-table-row';
        pre.textContent = line;
        element.appendChild(pre);
      } else if (line.startsWith('>')) {
        // Blockquote
        const quote = document.createElement('blockquote');
        quote.className = 'ai-quote-box';
        element.appendChild(quote);
        await this._typeInElement(quote, line.replace(/^>\s*/, ''), speed);
      } else if (line.startsWith('-') || line.startsWith('*') || line.match(/^\d+\./)) {
        // List item
        const li = document.createElement('div');
        li.className = 'ai-list-item-styled';
        element.appendChild(li);
        await this._typeInElement(li, line, speed);
      } else if (line.trim()) {
        // Paragraph
        const p = document.createElement('p');
        p.className = 'ai-paragraph-styled';
        element.appendChild(p);
        await this._typeInElement(p, line, speed);
      } else {
        // Empty line - add spacing
        const spacer = document.createElement('div');
        spacer.className = 'ai-spacer';
        element.appendChild(spacer);
      }
    }
  },
  
  async _typeInElement(element, text, speed) {
    // Parse markdown for bold text
    const parsedText = this._parseMarkdown(text);
    
    if (speed > 0 && text.length < 200) {
      // Type effect for short text
      element.innerHTML = '';
      for (let i = 0; i < parsedText.length; i++) {
        element.innerHTML = parsedText.slice(0, i + 1);
        await new Promise(r => setTimeout(r, speed));
      }
    } else {
      // Instant render for long text
      element.innerHTML = parsedText;
    }
  },
  
  _parseMarkdown(text) {
    // Convert **text** to bold
    let parsed = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Convert *text* to italic
    parsed = parsed.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    // Convert `code` to code
    parsed = parsed.replace(/`([^`]+)`/g, '<code>$1</code>');
    return parsed;
  }
};

// Export
window.AIService = AIService;
