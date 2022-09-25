# chikurima (チクリ魔)

[![release](https://github.com/m2en/chikurima/actions/workflows/release.yml/badge.svg)](https://github.com/m2en/chikurima/actions/workflows/release.yml)
[![eslint](https://github.com/m2en/chikurima/actions/workflows/eslint.yml/badge.svg)](https://github.com/m2en/chikurima/actions/workflows/eslint.yml)
[![prettier](https://github.com/m2en/chikurima/actions/workflows/prettier.yml/badge.svg)](https://github.com/m2en/chikurima/actions/workflows/prettier.yml)

---

Discord サーバー上にメンバーが利用できる通報コマンドを構築する Discord Bot

## Features

- メンバーが利用できる通報コマンドの構築
  - ユーザーに対しての通報 ( `/report user` )
  - メッセージに対しての通報 ( `/report message` )
- 通報内容をデータベースへ保存し永久化
- データベースを参照し、データを運営が閲覧できる機能 ( 未実装 )

## Usage

Docker Image を用いて利用可能です。

```yaml
docker pull ghcr.io/m2en/chikurima:latest
```

それ以外の利用可能なバージョンは [package](https://github.com/users/m2en/packages/container/package/chikurima) ページから確認できます。

chikurima と接続を行う MariaDB はバンドルとしては用意されていません。Docker 上に MariaDB を構築するか自分で構築を行ってください。

また、コマンドは起動時に自動で登録されます。グローバルコマンドとして登録することはできません。

## Docs

Discord のメンバーに説明を行う際の簡単なドキュメントを用意しています。ぜひご利用ください。

[chikurima の使い方](./docs/README.md)

## Environment Variables

起動時に環境変数として設定する必要がある変数を以下に示します。

例: [.env.example](./.env.example)

| Name               | Description                         | Default        |
| ------------------ | ----------------------------------- | -------------- |
| `DISCORD_TOKEN`    | Discord Bot のトークン              | なし           |
| `GUILD_ID`         | 通報コマンドを利用するサーバーの ID | なし           |
| `MARIADB_HOST`     | MariaDB のホスト名                  | `localhost`    |
| `MARIADB_NAME`     | MariaDB のデータベース名            | `chikurima_db` |
| `MARIADB_USERNAME` | MariaDB のユーザー名                | なし           |
| `MARIADB_PASSWORD` | MariaDB のパスワード                | なし           |
| `REPORT_WEBHOOK`   | 通報を送信する Webhook URL          | なし           |
