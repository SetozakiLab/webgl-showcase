# Unity WebGL ショーケースサイト 要件定義書

## 1. 概要

本ドキュメントは、Next.js を使用して構築する Unity WebGL ゲームのショーケースサイトに関する要件を定義する。

- 目的: 複数の Unity WebGL ビルドを一覧公開し、ブラウザ上で直接プレイできる静的サイトを提供する。
- 主要技術: Next.js (App Router), 静的サイト生成 (SSG), TypeScript
- デプロイ対象: GitHub Pages（プロジェクトページ）

## 2. 機能要件

### 2.1. 必須要件 (Must-have)

#### 2.1.1. ゲーム一覧ページ (トップページ)

- サイトで公開している全てのゲームをリスト形式で表示する。
- リストの各項目には、以下の情報を含める。
  - ゲームのサムネイル画像
  - ゲームのタイトル
- 各項目は、対応するゲームプレイページへのリンクとして機能する。

#### 2.1.2. ゲームプレイページ

- Unity WebGL ビルドを画面に埋め込み、ユーザーが直接プレイできる。
- ゲームのタイトルを表示する。
- サイトのトップ（一覧ページ）に戻るためのナビゲーションリンク（例: 「一覧に戻る」ボタン）を設置する。

#### 2.1.3. 共通レイアウト

- PC、タブレット、スマートフォンなど、異なるデバイスサイズで見やすいレスポンシブデザインに対応する。
- ヘッダーやフッターなど、全ページで共通の基本的なレイアウトを持つ。

### 2.2. 拡張要件 (Nice-to-have)

- 一覧ページの拡張:
  - 各ゲームに短い説明文を追加表示する。
  - 「アクション」「パズル」などのカテゴリやタグを付与し、ユーザーが特定のタグでゲームを絞り込めるフィルタリング機能。
- プレイページの拡張:
  - ゲームの詳しい説明や操作方法を記載する専用エリアを設ける。
  - ゲーム画面をフルスクリーンで表示する切り替えボタンを設置する。
  - X (旧 Twitter) などでプレイページを共有するための SNS シェアボタンを設置する。
- その他:
  - サイト内のゲームをキーワードで検索できる検索機能。

## 3. 技術仕様

### 3.1. ディレクトリ構成

プロジェクトの `public` ディレクトリを以下のように構成する。

```text
public/
├── games/
│   ├── cool-action-game/      # ゲームIDごとのフォルダ
│   │   ├── index.html
│   │   ├── Build/
│   │   └── TemplateData/
│   └── puzzle-master/
│       ├── index.html
│       ├── Build/
│       └── TemplateData/
└── thumbnails/
    ├── cool-action-game.png   # ゲームIDに対応するサムネイル画像
    └── puzzle-master.png
```

### 3.2. データ管理

- ゲームのメタデータ（ID, タイトル, 説明等）は、プロジェクト内の単一の JSON ファイルで一元管理する。
- ファイルパス: `src/data/games.json`
- データ構造（例）:

```json
[
  {
    "id": "cool-action-game",
    "title": "クールアクションゲーム",
    "description": "これはすごいアクションゲームです。",
    "thumbnail": "/thumbnails/cool-action-game.png",
    "tags": ["アクション", "2D"]
  },
  {
    "id": "puzzle-master",
    "title": "パズルマスター",
    "description": "頭を使うパズルゲーム。",
    "thumbnail": "/thumbnails/puzzle-master.png",
    "tags": ["パズル", "思考"]
  }
]
```

### 3.3. ページ構成 (Next.js App Router)

- 一覧ページ: `src/app/page.tsx`
  - ビルド時に `src/data/games.json` を読み込み、静的な HTML を生成する。
- プレイページ: `src/app/games/[id]/page.tsx`
  - 動的ルートセグメントを利用する。
  - `generateStaticParams` 関数を使い、`games.json` 内の全ゲーム ID に基づいてビルド時に全てのプレイページを静的生成する。
  - ゲーム本体の埋め込みには `<iframe>` タグを使用する。
  - 例（GitHub Pages のプロジェクトページ配下に配置するため、`basePath` を考慮する）:

```html
<!-- basePath 例: /webgl-showcase -->
<iframe
  src="{basePath}/games/cool-action-game/index.html"
  allow="fullscreen; autoplay"
></iframe>
```

#### 3.3.1. SSG と静的エクスポート

- 本サイトは完全静的エクスポート（`next export`）を用いる。
- 設定例（参考）：

```ts
// next.config.ts（参考）
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/webgl-showcase" : ""; // リポジトリ名に合わせて変更

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true }, // GitHub Pages では最適化サーバー非対応
  trailingSlash: true, // /path/ 形式で index.html を解決
};

export default nextConfig;
```

## 4. 開発ロードマップ (推奨ステップ)

- Step 1: 最小構成の実装
  - Next.js プロジェクトをセットアップする。
  - サンプルの WebGL ビルドを 1 つ `public` ディレクトリに配置する。
  - 単一のゲームプレイページ（`/games/[id]/page.tsx`）を作成し、`<iframe>` でゲームが正しく表示されることを確認する。
- Step 2: データ連携と一覧ページの構築
  - `src/data/games.json` を作成し、メタデータを定義する。
  - 一覧ページ（`/page.tsx`）で JSON を読み込み、ゲームリストとプレイページへのリンクを動的に生成する。
- Step 3: スタイリング
  - Tailwind CSS や CSS Modules などを利用して、サイト全体の UI/UX を設計・実装する。レスポンシブ対応もこの段階で行う。
- Step 4: 拡張機能の実装
  - 必須要件が完了次第、2.2 に記載されている拡張機能（フィルタリング、検索など）の設計と実装に着手する。

## 5. デプロイ/ホスティング（GitHub Pages）

### 5.1. 方針

- GitHub Pages（プロジェクトページ）にデプロイする。
- ブランチ戦略: `main`（ソース）→ GitHub Actions でビルド → Pages アーティファクトを `gh-pages`/Pages に公開。
- ルートパスは `https://<owner>.github.io/<repo>/` となるため、`basePath`/`assetPrefix` を `<repo>` に設定する。

### 5.2. ビルド/配信要件

- 完全静的: `next build && next export` を利用。
- 出力には `.nojekyll` を必ず含める（Jekyll 処理を無効化）。
- 404 ページは `404.html` を出力（Next.js のエクスポートで自動生成）。
- 画像最適化は無効化（`images.unoptimized: true`）。

### 5.3. Unity WebGL ビルドに関する重要事項（Pages 制約対応）

- セキュリティヘッダー（COOP/COEP, CSP 等）や `Content-Encoding` は GitHub Pages で任意設定できない。
  - そのため、Unity の「スレッド（Multithreading）」は使用しない（SharedArrayBuffer が必要となり COOP/COEP が必須なため）。
  - 圧縮配信のためのサーバー側 `Content-Encoding: br/gzip` も設定できない。
- 推奨ビルド設定（Unity Editor の WebGL Player Settings）
  - Compression Format: Brotli または Gzip
  - Decompression Fallback: 有効（必須）
    - サーバーが `Content-Encoding` を返さなくても、Unity ローダーがクライアント側で解凍可能。
  - Threads（Enable Threads）: 無効
  - Data Caching（IndexedDB）: 有効（初回以降の高速化）
  - WebGL 2.0: 既定のまま。古い端末の互換性に留意。
- MIME/拡張子
  - GitHub Pages は `.wasm` に `application/wasm` を返すが、念のためローダー側のフォールバックに依存できる構成（Decompression Fallback）とする。
  - `.data`, `.bundle`, `.br`, `.gz` は `application/octet-stream` でも動作する前提（Unity ローダーで解決）。
- ファイルサイズと LFS
  - GitHub Pages は Git LFS で配信されるファイルをサポートしないため、LFS は使用しない。
  - 個々のファイルは 100MB 未満、リポジトリ全体の Pages 配信容量は 1GB 未満に抑える。
  - Unity ビルドを小さく保つ（テクスチャ圧縮、圧縮形式選定、不要アセットの除去）。

### 5.4. CI/CD（参考ワークフロー）

GitHub Actions 例（概要）:

1. `on: push`（`main`）をトリガーに実行
2. `npm ci && npm run build && npm run export` を実行
3. `out/` を Pages アーティファクトとして公開
4. ルートに `.nojekyll` を配置

（実ファイルは別途 `.github/workflows/deploy.yml` を用意）

### 5.5. ベースパスとリンク

- アプリ内のリンクや iframe の `src` は `basePath` を考慮する。
- 例: `<iframe src={`${basePath}/games/${id}/index.html`}>`
- `assetPrefix` も同一値に設定し、静的アセット解決を一元化。

## 6. 非機能要件（追加）

### 6.1. パフォーマンス

- 画像は表示サイズに応じた解像度を用意（`public/thumbnails/`）。
- 一覧ページのサムネイル遅延読み込み（`loading="lazy"`）。
- プレイページの iframe は初期表示領域内のみ読み込み（`loading="eager|lazy` の設計、プレースホルダー実装）。
- Lighthouse 目標（モバイル）: Performance 80+, Accessibility 90+。

### 6.2. アクセシビリティ

- すべての画像に `alt` を付与。
- キーボード操作でカードにフォーカス可能。
- iframe の全画面切替ボタンにキーボード操作対応。

### 6.3. SEO

- 各ゲームページで `<title>` と `<meta name="description">` を `games.json` から生成。
- OGP/Twitter カード（タイトル、説明、サムネイル）を出力。
- サイトマップ（`sitemap.xml`）の生成は任意（静的エクスポートの構成上、簡易に生成可能）。

### 6.4. エラーハンドリング

- `games.json` と実体（`public/games/<id>/index.html`）の不整合時はビルドを失敗させるか、該当エントリをスキップ（いずれかを規定）。
- `/games/[id]` で存在しない ID は 404 を返す。
- プレイページでロード失敗時、再読み込み誘導とサポート表示を出す（簡易メッセージ）。

## 7. 受け入れ基準（抜粋・GitHub Pages 前提）

- ルーティング/リンク
  - Top `/` および `/games/<id>/` が `basePath` 配下で正しく解決される（例: `/webgl-showcase/games/cool-action-game/`）。
  - 一覧の各カードはタイトル・サムネイルを表示し、クリック/Enter で遷移できる。
- プレイページ
  - タイトル表示、「一覧に戻る」リンクあり。
  - iframe はレスポンシブに表示され、`allow="fullscreen; autoplay"` が付与されている。
  - Unity ビルドは GitHub Pages 上でロードエラーなく起動する（ネットワークパネルで 4xx/5xx/圧縮ヘッダー不整合がない）。
- ビルド/配信
  - `out/` に `.nojekyll` が含まれ、GitHub Pages で正しく配信される。
  - LFS を利用せず、各ファイルサイズが 100MB 未満である。
  - Lighthouse（モバイル）で Performance 80+ / Accessibility 90+ を満たす。

## 8. 補足（実装メモ）

- `src/data/games.json` の型定義・バリデーション
  - TypeScript 型 `Game` と Zod 等でスキーマ検証を行い、ビルド時に不整合を検出。
- `generateStaticParams` で `public/games/<id>/index.html` の存在確認を行うユーティリティを用意（見つからない場合の扱いを統一）。
- iframe の全画面切替 UI をプレイページに実装（`requestFullscreen()` 呼び出し）。
- iOS/Safari 制約（オーディオ自動再生など）に配慮し、ユーザー操作後に BGM 開始する設計とする。
