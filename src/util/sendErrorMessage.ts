import { Colors, EmbedBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';

/**
 * エラーメッセージを送信します。
 * @param interaction スラッシュコマンドのインタラクション
 * @param errorMessage エラーメッセージ
 * @param reason エラーの理由
 */
export async function sendErrorMessage(
  interaction: ChatInputCommandInteraction,
  errorMessage: string,
  reason: string
) {
  await interaction.reply({
    embeds: [buildEmbed(errorMessage, reason)],
    ephemeral: true
  });
}

function buildEmbed(errorMessage: string, reason: string) {
  return new EmbedBuilder()
    .setTitle('通報に失敗')
    .setDescription(errorMessage)
    .setColor(Colors.Red)
    .addFields({ name: '理由', value: reason });
}
