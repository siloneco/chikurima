import { DataTypes, Model, Sequelize } from 'sequelize';

export function ReportInfo(sequelize: Sequelize) {
  class ReportDB extends Model {}

  return ReportDB.init(
    {
      id: {
        // レポートID
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      date: {
        // レポート受信日時
        type: DataTypes.DATE,
        allowNull: false
      },
      targetId: {
        // レポート対象者のID
        type: DataTypes.NUMBER,
        allowNull: false
      },
      reporterId: {
        // レポート送信者のID
        type: DataTypes.NUMBER,
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
        allowNull: true
      }
    },
    { sequelize, modelName: 'report-logs' }
  );
}
