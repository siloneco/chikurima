import { Colors, EmbedBuilder, WebhookClient } from 'discord.js';

// eslint-disable-next-line max-params
export async function sendReport(
  webhookClient: WebhookClient,
  reporterId: string,
  reason: string,
  targetId?: string,
  proof?: string
) {
  await webhookClient.send({
    embeds: [buildEmbed(reporterId, reason, targetId, proof)]
  });
}

// eslint-disable-next-line max-params
function buildEmbed(
  reporterId: string,
  reason: string,
  targetId?: string,
  proof?: string
) {
  let targetMention: string;
  if (targetId != undefined) {
    targetMention = `<@${targetId}>`;
  } else {
    targetMention = '指定なし';
  }

  const embed = new EmbedBuilder();
  embed.setTitle('Discordからの通報');
  embed.setImage(proof ?? null);
  embed.setTimestamp();
  embed.setColor(Colors.Red);
  embed.addFields(
    { name: '通報者', value: `<@${reporterId}>`, inline: true },
    { name: '通報対象者', value: targetMention, inline: true },
    { name: '理由', value: reason, inline: false },
    { name: '証拠', value: proof ?? '添付なし', inline: true }
  );
  return embed;
}
