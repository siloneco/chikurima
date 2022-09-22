import * as dotenv from 'dotenv';

dotenv.config();
export const { DISCORD_BOT_TOKEN: token } = extractEnv([
    'DISCORD_BOT_TOKEN',
]);

export function extractEnv<K extends readonly string[]>(
    keys: K,
    defaults?: Readonly<Partial<Record<K[number], string>>>
): Record<K[number], string> {
    const env: Partial<Record<K[number], string>> = {};
    for (let i = 0; i < keys.length; i++) {
        const key: K[number] = keys[i];
        if (process.env[key] !== undefined && process.env[key] !== '') {
            env[key] = process.env[key];
        } else if (defaults && defaults[key] !== undefined) {
            env[key] = defaults[key];
        } else {
            throw new Error(`${key} is not defined`);
        }
    }

    return env as Record<K[number], string>;
}
