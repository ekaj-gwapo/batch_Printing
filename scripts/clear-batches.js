import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function clearBatches() {
  try {
    const db = await open({
      filename: path.join(process.cwd(), 'data.db'),
      driver: sqlite3.Database,
    });

    console.log('Connected to database...');

    // Delete all batch transactions first (due to foreign key)
    const batchTxResult = await db.run('DELETE FROM batch_transactions');
    console.log(`Deleted ${batchTxResult.changes} batch transaction records`);

    // Delete all batches
    const batchResult = await db.run('DELETE FROM transaction_batches');
    console.log(`Deleted ${batchResult.changes} batch records`);

    // Verify transactions are still there
    const txCount = await db.get('SELECT COUNT(*) as count FROM transactions');
    console.log(`✓ Success! Your transactions are preserved. Transaction count: ${txCount.count}`);

    await db.close();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

clearBatches();
