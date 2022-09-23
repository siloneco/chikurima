import { Colors, EmbedBuilder, WebhookClient } from 'discord.js';

// eslint-disable-next-line max-params
export async function sendReport(
  webhookClient: WebhookClient,
  targetId: string,
  reporterId: string,
  reason: string,
  proof?: string
) {
  await webhookClient.send({
    embeds: [buildEmbed(targetId, reporterId, reason, proof)]
  });
}

// eslint-disable-next-line max-params
function buildEmbed(
  targetId: string,
  reporterId: string,
  reason: string,
  proof?: string
) {
  const embed = new EmbedBuilder();
  embed.setTitle('Discordからの通報');
  embed.setDescription('Discordのメンバーから通報がありました。');
  embed.setImage(proof ?? null);
  embed.setTimestamp();
  embed.setColor(Colors.Red);
  embed.addFields(
    { name: '通報者', value: `<@${reporterId}>`, inline: true },
    { name: '通報対象者', value: `<@${targetId}>`, inline: true },
    { name: '理由', value: reason, inline: false },
    { name: '証拠', value: proof ?? '添付なし', inline: true }
  );
  return embed;
}
