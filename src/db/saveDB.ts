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
    sendDBConsole('データベースへの保存を開始します...');
    const reportDB = ReportInfo(sequelize);
    await reportDB.sync();
    await reportDB.create({
      targetId: targetId,
      reporterId: reporterId,
      reason: reason,
      proof: proof
    });
    sendDBConsole('データベースへの保存に成功しました!');
  } catch (e) {
    sendDBConsole('データベースへの保存に失敗しました。');
    console.error(e);
  }
}
