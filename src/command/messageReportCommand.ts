import type { Interaction } from 'discord.js';
import type { Sequelize } from 'sequelize';
import type { WebhookClient } from 'discord.js';
import { saveDatabase } from '../db/saveDB.js';
import { sendReport } from '../util/sendReport.js';

// eslint-disable-next-line max-params
export async function MessageReportCommand(
  sequelize: Sequelize,
  interaction: Interaction,
  webhookClient: WebhookClient,
  guild_id: string
) {
  if (!interaction.isChatInputCommand()) {
    return;
  }
  if (interaction.options.getSubcommand() !== 'message') {
    return;
  }

  const target = interaction.options.getString('message-link');
  if (!target) return;
  if (!checkMessage(target, guild_id)) {
    await webhookClient.send({
      content: `<@${interaction.user.id}>の通報は情報が正しくないため、棄却されました。`
    });
    return;
  }

  const reporterId = interaction.user.id;
  if (!reporterId) return;
  const reason = interaction.options.getString('reason');
  if (!reason) return;
  await saveDatabase(sequelize, target, reporterId, reason);
  await sendReport(webhookClient, target, reporterId, reason);
  await interaction.reply({
    content: '通報は正しく送信されました。ご協力感謝いたします。',
    ephemeral: true
  });
}

function checkMessage(messagelink: string, guildId: string): boolean {
  if (!messagelink.match(guildId)) {
    return false;
  }
  return true;
}
