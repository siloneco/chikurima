/**
 * データベースのログを出力する
 * @param message ログメッセージ
 */
export function sendDBConsole(message: string) {
  return console.log('[DB] ' + message);
}

/**
 * コマンドのログを出力する
 * @param message ログメッセージ
 */
export function sendCommandConsole(message: string) {
  return console.log('[Command] ' + message);
}

/**
 * Webhookのログを出力する
 * @param message ログメッセージ
 */
export function sendWebhookConsole(message: string) {
  return console.log('[Webhook] ' + message);
}
