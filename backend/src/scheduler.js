// ==============================================
// SCHEDULER (node-cron)
// ==============================================
// Har 5 soatda avtomatik ingestion

const cron = require('node-cron');
const ingestService = require('./services/ingest');

// Cron expression: "0 */5 * * *" = Har 5 soatda 0-minutda
const cronExpression = process.env.SCHEDULE_CRON || '0 */5 * * *';

let isRunning = false;

/**
 * Scheduled ingestion task
 */
async function scheduledIngestion() {
  if (isRunning) {
    console.log('⏳ Ingestion allaqachon ishlayapti, o\'tkazib yuborildi');
    return;
  }
  
  isRunning = true;
  console.log(`\n⏰ Scheduled ingestion boshlandi: ${new Date().toISOString()}`);
  
  try {
    const result = await ingestService.runIngestion({ saveSnapshots: false });
    console.log(`✅ Scheduled ingestion yakunlandi:`, {
      runId: result.runId,
      inserted: result.stats.itemsInserted,
      updated: result.stats.itemsUpdated,
      unchanged: result.stats.itemsUnchanged
    });
  } catch (err) {
    console.error('❌ Scheduled ingestion xatosi:', err.message);
  } finally {
    isRunning = false;
  }
}

/**
 * Scheduler ni ishga tushirish
 */
function startScheduler() {
  if (!cron.validate(cronExpression)) {
    console.error(`❌ Noto'g'ri cron expression: ${cronExpression}`);
    return null;
  }
  
  const task = cron.schedule(cronExpression, scheduledIngestion, {
    scheduled: true,
    timezone: 'Asia/Tashkent'
  });
  
  console.log(`📅 Scheduler ishga tushdi: "${cronExpression}" (Toshkent vaqti)`);
  console.log(`   Keyingi ishga tushish: har 5 soatda`);
  
  return task;
}

/**
 * Scheduler ni to'xtatish
 */
function stopScheduler(task) {
  if (task) {
    task.stop();
    console.log('⏹️ Scheduler to\'xtatildi');
  }
}

module.exports = {
  startScheduler,
  stopScheduler,
  scheduledIngestion
};
