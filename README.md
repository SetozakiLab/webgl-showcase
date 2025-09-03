# Unity WebGL ショーケース

Unity WebGL コンテンツのショーケースサイト - Next.js で構築されたハブサイト

![Homepage](https://github.com/user-attachments/assets/61fd77ca-112d-4e24-895f-582fa3ab4310)

## 特徴

- 📱 **レスポンシブデザイン**: PC、タブレット、スマートフォンに対応
- 🎮 **Unity WebGL サポート**: 外部ホスティングされたゲームコンテンツとの連携
- 🔗 **URL プロキシ機能**: URL を維持しながら外部コンテンツを配信（設定時）
- 🎨 **shadcn/ui**: 一貫した美しいUIコンポーネント
- ⚡ **高速**: Next.js の SSG による最適化された配信
- 🌐 **SEO対応**: 各コンテンツページで適切なメタデータを生成

## 実装済み機能

### 必須要件 ✅

- [x] **コンテンツ一覧ページ**: サムネイル付きのゲーム一覧表示
- [x] **動的ルーティング**: `/contents/[id]` でのコンテンツページ
- [x] **URL プロキシ設定**: 外部 URL への rewrite 設定（要実際のURL）
- [x] **フォールバック機能**: rewrite 失敗時の代替表示
- [x] **レスポンシブデザイン**: 全デバイスサイズ対応
- [x] **共通レイアウト**: ヘッダー、フッター統一
- [x] **shadcn/ui コンポーネント**: Card, Button, Badge など活用

### データ管理 ✅

- [x] **JSONデータ管理**: `src/data/contents.json` での一元管理
- [x] **TypeScript 型定義**: 型安全なデータ処理
- [x] **静的生成**: `generateStaticParams` による事前生成

### SEO・メタデータ ✅

- [x] **動的メタデータ**: 各コンテンツページで適切な title, description
- [x] **OGP対応**: SNS シェア用メタタグ
- [x] **Twitter Card**: Twitter での適切な表示

## 技術スタック

- **Next.js 15.5.2** (App Router)
- **TypeScript**
- **Tailwind CSS 4.0**
- **shadcn/ui**
- **Lucide React** (アイコン)

## 開始方法

まず、開発サーバーを起動します：

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

## プロジェクト構成

```
├── src/
│   ├── app/                    # App Router ページ
│   │   ├── contents/[id]/      # 動的コンテンツページ
│   │   ├── globals.css         # グローバルスタイル
│   │   ├── layout.tsx          # ルートレイアウト
│   │   └── page.tsx            # ホームページ
│   ├── components/             # React コンポーネント
│   │   ├── ui/                 # shadcn/ui コンポーネント
│   │   └── refresh-button.tsx  # カスタムコンポーネント
│   ├── data/
│   │   └── contents.json       # コンテンツメタデータ
│   ├── lib/
│   │   └── utils.ts           # ユーティリティ関数
│   └── types/
│       └── content.ts         # TypeScript 型定義
├── public/
│   └── thumbnails/            # サムネイル画像
├── next.config.ts             # Next.js 設定
└── components.json            # shadcn/ui 設定
```

## コンテンツの追加

新しいゲームコンテンツを追加するには：

1. `src/data/contents.json` に新しいエントリを追加
2. `public/thumbnails/` にサムネイル画像を配置
3. 自動的に新しいルートが生成されます

```json
{
  "id": "new-game",
  "title": "新しいゲーム",
  "description": "ゲームの説明",
  "thumbnail": "/thumbnails/new-game.svg",
  "externalUrl": "https://your-game.netlify.app/",
  "tags": ["アクション", "3D"]
}
```

## URL プロキシの有効化（本番環境）

外部URLへの rewrite を有効にするには、`next.config.ts` の該当部分のコメントを解除してください：

```typescript
// コメントアウトされた rewrites を有効化
async rewrites() {
  const contentsData = require("./src/data/contents.json");
  return contentsData.map((content) => ({
    source: `/contents/${content.id}/:path*`,
    destination: `${content.externalUrl}/:path*`,
  }));
},
```

## Vercel へのデプロイ

このアプリを Vercel Platform にデプロイするのが最も簡単です。

[Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) で詳細を確認してください。

## ライセンス

© 2024 Unity WebGL Showcase. All rights reserved.
