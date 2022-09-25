import { sendReport, sendReportNoice } from '../util/sendReport.js';
import type { Interaction } from 'discord.js';
import type { Sequelize } from 'sequelize';
import type { User } from 'discord.js';
import type { WebhookClient } from 'discord.js';
import { saveDatabase } from '../db/saveDB.js';
import { sendErrorMessage } from '../util/sendErrorMessage.js';

export async function UserReportCommand(
  sequelize: Sequelize,
  interaction: Interaction,
  webhookClient: WebhookClient
) {
  if (!interaction.isChatInputCommand()) {
    return;
  }
  if (interaction.options.getSubcommand() !== 'user') {
    return;
  }

  const target = interaction.options.getUser('target');
  if (!checkUser(target) && !checkUser(interaction.user)) {
    await sendErrorMessage(
      interaction,
      'このユーザーを通報することはできません。',
      'Botやシステムユーザーを通報することはできません。'
    );
    return;
  }
  if (!target) {
    return;
  }

  const targetId = target.id;
  const reporterId = interaction.user.id;
  if (!reporterId) return;
  const reason = interaction.options.getString('reason');
  if (!reason) return;
  const proof = interaction.options.getAttachment('proof')?.url;
  if (!proof) return;
  await saveDatabase(sequelize, targetId, reporterId, reason, proof);
  await sendReport(webhookClient, reporterId, reason, targetId, proof);
  await sendReportNoice(interaction);
}

function checkUser(user: User | null): boolean {
  if (!user) return false;
  return !(user.system && user.bot);
}
