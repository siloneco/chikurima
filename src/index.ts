import { Client, GatewayIntentBits, WebhookClient } from 'discord.js';
import { sendCommandConsole, sendDBConsole } from './util/logger.js';
import { MessageReportCommand } from './command/messageReportCommand.js';
import { ReportInfo } from './db/reportDB.js';
import { Sequelize } from 'sequelize';
import { UserReportCommand } from './command/userReportCommand.js';
import { deployCommand } from './command/deploy.js';
import dotenv from 'dotenv';
import { extractEnv } from './util/envManager.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

dotenv.config();
const {
  DISCORD_BOT_TOKEN: token,
  MARIADB_HOST: host,
  MARIADB_NAME: name,
  MARIADB_USERNAME: username,
  MARIADB_PASSWORD: password,
  REPORT_WEBHOOK: webhookUrl
} = extractEnv(
  [
    'DISCORD_BOT_TOKEN',
    'MARIADB_HOST',
    'MARIADB_NAME',
    'MARIADB_USERNAME',
    'MARIADB_PASSWORD',
    'REPORT_WEBHOOK'
  ],
  {
    MARIADB_HOST: 'localhost',
    MARIADB_NAME: 'chikurima_db'
  }
);

// mariadbのインスタンス作成｀
const sequelize = new Sequelize(name, username, password, {
  host: host,
  dialect: 'mariadb',
  logging: false
});

// webhookのインスタンス作成
const webhookClient = new WebhookClient({ url: webhookUrl });

client.on('ready', async () => {
  console.time('startup:');

  if (client.user == null) {
    throw new Error(
      'クライアントユーザーの取得に失敗しました。起動できません。'
    );
  }
  console.log(`${client.user.tag}(${client.user.id}) に接続を開始しました。`);

  // mariadbとの接続
  try {
    sendDBConsole('データベースに接続しています... (Step 1/2)');
    await sequelize.authenticate();
    ReportInfo(sequelize);
    sendDBConsole('データベースへの接続に成功しました。(Step 1/2)');
  } catch (e) {
    console.log(e);
    throw new Error('データベースへの接続に失敗しました。起動できません。');
  }

  // コマンドの登録
  try {
    sendCommandConsole('ギルドコマンドを登録中... (Step 2/2)');
    await deployCommand(client.user.id);
    sendCommandConsole('ギルドコマンドの登録に成功しました。(Step 2/2)');
  } catch (e) {
    console.error(e);
    throw new Error('コマンドの登録に失敗しました。起動できません。');
  }

  console.log('Done!');
  console.timeEnd('startup:');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const guild = interaction.guild;
  if (!guild) return;
  if (!interaction.guild.available) {
    await interaction.reply({
      content: 'このギルドは利用できない状態です。運営に連絡してください。',
      ephemeral: true
    });
    return;
  }

  switch (interaction.commandName) {
    case 'report': {
      await UserReportCommand(sequelize, interaction, webhookClient);
      await MessageReportCommand(
        sequelize,
        interaction,
        webhookClient,
        guild.id
      );
    }
  }
});

client.login(token).catch(console.error);
