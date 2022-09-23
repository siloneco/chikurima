import { DataTypes, Model, Sequelize } from 'sequelize';

export function ReportInfo(sequelize: Sequelize) {
  class ReportDB extends Model {}

  return ReportDB.init(
    {
      targetId: {
        // レポート対象者のID
        type: DataTypes.STRING,
        allowNull: true
      },
      reporterId: {
        // レポート送信者のID
        type: DataTypes.STRING,
        allowNull: false
      },
      reason: {
        // レポート理由
        type: DataTypes.STRING,
        allowNull: false
      },
      proof: {
        // レポートの証拠(メッセージリンク・添付ファイルのリンク)
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { sequelize, modelName: 'report_logs' }
  );
}
