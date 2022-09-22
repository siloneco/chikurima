import { Client, GatewayIntentBits } from 'discord.js';
import { ReportInfo } from './db/ReportDB.js';
import { Sequelize } from 'sequelize';
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
  MARIADB_PASSWORD: password
} = extractEnv([
  'DISCORD_BOT_TOKEN',
  'MARIADB_HOST',
  'MARIADB_NAME',
  'MARIADB_USERNAME',
  'MARIADB_PASSWORD'
]);

// mariadbのインスタンス作成｀
const sequelize = new Sequelize(name, username, password, {
  host: host,
  dialect: 'mariadb',
  logging: (...msg) => console.log(msg)
});

client.on('ready', async () => {
  console.log('準備完了');

  // mariadbとの接続
  try {
    console.log('Connecting to database ....');
    await sequelize.authenticate();
    ReportInfo(sequelize);
    console.log('Successfully connected to database');
  } catch (e) {
    console.error(`Failed to connect to database`);
    console.error(e);
  }
});

client.login(token).catch(console.error);
