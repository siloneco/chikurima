import {
  ChatInputCommandInteraction,
  Colors,
  EmbedBuilder,
  WebhookClient
} from 'discord.js';

// eslint-disable-next-line max-params
export async function sendReport(
  webhookClient: WebhookClient,
  reporterId: string,
  reason: string,
  targetId?: string,
  proof?: string
) {
  await webhookClient.send({
    embeds: [buildReportEmbed(reporterId, reason, targetId, proof)]
  });
}

/**
 * 通報成功のメッセージを送信します。
 * @param interaction スラッシュコマンドのインタラクション
 */
export async function sendReportNoice(
  interaction: ChatInputCommandInteraction
) {
  await interaction.reply({ embeds: [buildSuccessEmbed()], ephemeral: true });
}

/**
 * 通報のEmbedを作成します。
 * @param reporterId 通報者のID
 * @param reason 通報の理由
 * @param targetId 通報対象のID
 * @param proof 証拠
 */
// eslint-disable-next-line max-params
function buildReportEmbed(
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

/**
 * 通報成功時のメッセージEmbedを作成します。
 */
export function buildSuccessEmbed() {
  return new EmbedBuilder()
    .setAuthor({ name: '通報成功' })
    .setDescription('通報は正しく送信されました。ご協力感謝いたします。')
    .setColor(Colors.Green);
}
