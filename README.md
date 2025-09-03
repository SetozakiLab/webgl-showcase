## Unity WebGL Showcase

研究室で作成した複数の Unity WebGL プロジェクトを一覧表示し、各外部ホスティング先に遷移するハブサイトです。

### 使い方

1. ローカル起動

```bash
npm run dev
```

http://localhost:3000 を開きます。

2. コンテンツの追加

- `src/data/contents.json` にエントリを追加します。
- サムネイルは `public/thumbnails/` に配置し、`thumbnail` にそのパスを指定します（例: `/thumbnails/foo.png`）。
- `externalUrl` には外部ホスティング（Netlify, Cloudflare Pages など）の公開 URL を設定します。

3. リライト/リダイレクト

- 既定では Vercel Rewrites を使用し、`/contents/<id>` の URL を維持したまま外部を配信します。
- 環境変数 `USE_REWRITES=false` を指定すると、`/contents/<id>` はサーバーリダイレクトします。
- クライアント側ではフォールバックとして `window.location.replace` による遷移も試みます。

### デプロイ

- Vercel に接続して push/PR ごとに Preview、main マージで Production に自動デプロイされます。
