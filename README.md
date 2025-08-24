Unity WebGL ショーケース（GitHub Pages 対応 SSG）

## 概要

複数の Unity WebGL ビルドをリスト表示し、各ページで直接プレイできる静的サイトです。Next.js App Router と完全静的エクスポート（next export）を利用します。

## ディレクトリ

- メタデータ: `src/data/games.json`
- 型定義: `src/types/games.ts`
- 一覧ページ: `src/app/page.tsx`
- プレイページ: `src/app/games/[id]/page.tsx`
- WebGL 実体: `public/games/<id>/index.html`
- サムネイル: `public/thumbnails/<id>.(png|jpg|svg)`

## ローカル開発

```
npm run dev
```

## 静的エクスポート

```
npm run build
npm run export
# 出力: out/
```

## GitHub Pages 配信の注意

- `next.config.ts` で `output: "export"`, `basePath/assetPrefix` を production で `/webgl-showcase` に設定。
- `public/.nojekyll` を含める（自動）
- 画像最適化は無効（`images.unoptimized: true`）
- Unity WebGL は Threads 無効・Decompression Fallback 有効でビルドしてください。
