import { ReportInfo } from './reportDB.js';
import type { Sequelize } from 'sequelize';
import { sendDBConsole } from '../util/logger.js';

// eslint-disable-next-line max-params
export async function saveDatabase(
  sequelize: Sequelize,
  reporterId: string,
  reason: string,
  targetId?: string,
  proof?: string
) {
  try {
    sendDBConsole('Starts recording to the database ....');
    const reportDB = ReportInfo(sequelize);
    await reportDB.sync();
    await reportDB.create({
      targetId: targetId,
      reporterId: reporterId,
      reason: reason,
      proof: proof
    });
    sendDBConsole('Successfully recorded in database!');
  } catch (e) {
    sendDBConsole('Failed to record to database');
    console.error(e);
  }
}
