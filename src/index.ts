import { Client, GatewayIntentBits } from 'discord.js'
import { token } from './util/envManager';

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
})

client.on('ready', () => {
    console.log("準備完了")
})

client.login(token).catch(console.error)
