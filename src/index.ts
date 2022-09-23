import { Client, GatewayIntentBits, WebhookClient } from 'discord.js';
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
} = extractEnv([
  'DISCORD_BOT_TOKEN',
  'MARIADB_HOST',
  'MARIADB_NAME',
  'MARIADB_USERNAME',
  'MARIADB_PASSWORD',
  'REPORT_WEBHOOK'
]);

// mariadbのインスタンス作成｀
const sequelize = new Sequelize(name, username, password, {
  host: host,
  dialect: 'mariadb',
  logging: false
});

// webhookのインスタンス作成
const webhookClient = new WebhookClient({ url: webhookUrl });

client.on('ready', async () => {
  if (client.user == null) {
    throw new Error('Failed to identify client user');
  }

  // mariadbとの接続
  try {
    console.log('Connecting to database ....');
    await sequelize.authenticate();
    ReportInfo(sequelize);
    console.log('Successfully connected to database');
  } catch (e) {
    console.log(e);
    throw new Error('Failed to connect to database');
  }

  // コマンドの登録
  try {
    console.log('Registering commands ....');
    await deployCommand(client.user.id);
    console.log('Command successfully registered');
  } catch (e) {
    console.error(`Failed to register command`);
    console.error(e);
  }

  console.log(`${client.user.tag}(${client.user.id}) Ready!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const guild = interaction.guild;
  if (!guild) return;
  if (!interaction.guild.available) {
    await interaction.reply({
      content: 'このギルドは利用できない状態です',
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
