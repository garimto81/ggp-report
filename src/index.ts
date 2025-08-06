import dotenv from 'dotenv';
import { Scheduler } from './services/scheduler';
import { ReportGenerator } from './services/reportGenerator';

dotenv.config();

async function main() {
  console.log('Camera Work Auto Report System Starting...');
  
  const args = process.argv.slice(2);
  
  // '--run-once' 옵션이 있으면 한 번만 실행
  if (args.includes('--run-once')) {
    console.log('Running camera report generation once...');
    const generator = new ReportGenerator();
    const success = await generator.generateReport();
    process.exit(success ? 0 : 1);
  } else {
    // 스케줄러로 정기 실행
    const scheduler = new Scheduler();
    scheduler.start();
    setupShutdownHandlers(scheduler);
  }
}

// 정상 종료를 위한 핸들러
function setupShutdownHandlers(scheduler: Scheduler) {
  const shutdown = () => {
    console.log('\nShutting down...');
    scheduler.stop();
    process.exit(0);
  };
  
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});