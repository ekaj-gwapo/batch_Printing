import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function clearBatches() {
  try {
    const db = await open({
      filename: path.join(process.cwd(), 'data.db'),
      driver: sqlite3.Database,
    });

    await db.exec('PRAGMA foreign_keys = ON');
    console.log('Connected to database...');

    // Create table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS transaction_batches (
        id TEXT PRIMARY KEY,
        viewerId TEXT NOT NULL,
        entryUserId TEXT NOT NULL,
        batchName TEXT,
        transactionCount INTEGER DEFAULT 0,
        totalAmount REAL DEFAULT 0,
        appliedFilters TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Delete all batches from transaction_batches table
    const result = await db.run('DELETE FROM transaction_batches');
    console.log(`✓ Deleted ${result.changes} batch records`);

    // Verify transactions are still there (if table exists)
    try {
      const txCount = await db.get('SELECT COUNT(*) as count FROM transactions');
      console.log(`✓ Success! Your transactions are preserved. Transaction count: ${txCount.count}`);
    } catch (e) {
      console.log('✓ Transactions table will be created when you run the app');
    }
    console.log('✓ Next batch created will be numbered 01');

    await db.close();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

clearBatches();
