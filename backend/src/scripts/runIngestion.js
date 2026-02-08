// ==============================================
// MANUAL INGESTION SCRIPT
// ==============================================
// Ishga tushirish: npm run ingest

require('dotenv').config();

const { runIngestion } = require('../services/ingest');

async function main() {
  console.log('🔄 Manual ingestion boshlandi...\n');
  
  try {
    const result = await runIngestion({ saveSnapshots: true });
    
    console.log('\n════════════════════════════════════════');
    console.log('✅ INGESTION YAKUNLANDI');
    console.log('════════════════════════════════════════');
    console.log(`Run ID:      ${result.runId}`);
    console.log(`Topildi:     ${result.stats.itemsFound}`);
    console.log(`Yangi:       ${result.stats.itemsInserted}`);
    console.log(`Yangilandi:  ${result.stats.itemsUpdated}`);
    console.log(`O'zgarishsiz:${result.stats.itemsUnchanged}`);
    console.log(`Xatolar:     ${result.errors.length}`);
    console.log('════════════════════════════════════════\n');
    
    process.exit(0);
    
  } catch (err) {
    console.error('\n❌ Ingestion muvaffaqiyatsiz:', err.message);
    process.exit(1);
  }
}

main();
