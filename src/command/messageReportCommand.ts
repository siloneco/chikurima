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
    await interaction.reply({
      content:
        'メッセージリンクが不正です。そのギルド内のメッセージリンクのみ通報できます。',
      ephemeral: true
    });
    return;
  }

  const reporterId = interaction.user.id;
  if (!reporterId) return;
  const reason = interaction.options.getString('reason');
  if (!reason) return;
  await saveDatabase(sequelize, reporterId, reason, undefined, target);
  await sendReport(webhookClient, reporterId, reason, undefined, target);
  await interaction.reply({
    content: '通報は正しく送信されました。ご協力感謝いたします。',
    ephemeral: true
  });
}

function checkMessage(targetMessagelink: string, guildId: string): boolean {
  const modelMessagelink =
    /https:\/\/(?:ptb\.|canary\.)?discord(?:app)?\.com\/channels\/(\d+)\/(\d+)\/(\d+)/;

  const target = targetMessagelink.match(modelMessagelink);
  if (!target) {
    return false;
  }

  const [, targetGuildId, ,] = target;
  if (targetGuildId !== guildId) return false;

  return true;
}
