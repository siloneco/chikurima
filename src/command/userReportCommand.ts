import type { Interaction } from 'discord.js';
import type { Sequelize } from 'sequelize';
import type { User } from 'discord.js';
import type { WebhookClient } from 'discord.js';
import { saveDatabase } from '../db/saveDB.js';
import { sendReport } from '../util/sendReport.js';

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
    await interaction.reply({
      content:
        '通報に失敗しました。Botまたはシステムユーザーは通報できません。',
      ephemeral: true
    });
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
  await sendReport(webhookClient, targetId, reporterId, reason, proof);
  await interaction.reply({
    content: '通報は正しく送信されました。ご協力感謝いたします。',
    ephemeral: true
  });
}

function checkUser(user: User | null): boolean {
  if (!user) return false;
  return !(user.system && user.bot);
}
