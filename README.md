# chikurima

Discord サーバー上にメンバーが利用できる通報コマンドを構築するDiscord Bot

## Usage

```yaml
docker pull ghcr.io/m2en/chikurima:latest
```

それ以外の利用可能なバージョンは [package](https://github.com/m2en/chikurima/packages) ページから確認できます。

## Environment Variables

| Name               | Description        | Default |
|--------------------|--------------------|---------|
| `DISCORD_TOKEN`    | Discord Bot のトークン  | `NULL`  |
| `GUILD_ID`         | 通報コマンドを利用するサーバーのID | `NULL`  |
| `MARIADB_HOST`     | MariaDB のホスト名      | `NULL`  |
| `MARIADB_NAME`     | MariaDB のデータベース名   | `NULL`  |
| `MARIADB_USERNAME` | MariaDB のユーザー名     | `NULL`  |
| `MARIADB_PASSWORD` | MariaDB のパスワード     | `NULL`  |
| `REPORT_WEBHOOK`   | 通報を送信するWebhook URL | `NULL`  |
