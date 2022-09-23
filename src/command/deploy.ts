import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';

export async function deployCommand(clientId: string) {
  const commands = [
    new SlashCommandBuilder()
      .setName('report')
      .setDescription('通報系統コマンド')
      .addSubcommand((reportUser) =>
        reportUser
          .setName('user')
          .setDescription('ユーザーの迷惑行為を通報します')
          .addUserOption((target) =>
            target
              .setName('target')
              .setDescription('通報対象のユーザーを指定してください。')
              .setRequired(true)
          )
          .addStringOption((reason) =>
            reason
              .setName('reason')
              .setDescription('通報する理由を指定してください。')
              .setRequired(true)
          )
          .addAttachmentOption((proof) =>
            proof
              .setName('proof')
              .setDescription(
                '迷惑行為の証拠となる添付ファイルを指定してください。'
              )
              .setRequired(true)
          )
      )
      .addSubcommand((reportMessage) =>
        reportMessage
          .setName('message')
          .setDescription('ユーザーのメッセージを通報します')
          .addStringOption((link) =>
            link
              .setName('message-link')
              .setDescription('メッセージリンクを指定してください')
              .setRequired(true)
          )
          .addStringOption((reason) =>
            reason
              .setName('reason')
              .setDescription('通報する理由を指定してください。')
              .setRequired(true)
          )
      )
  ].map((command) => command.toJSON());

  dotenv.config();
  const rest = new REST({ version: '10' }).setToken(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.env.DISCORD_BOT_TOKEN
  );

  await rest
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .put(Routes.applicationGuildCommands(clientId, process.env.GUILD_ID), {
      body: commands
    })
    .catch(console.error);
}
