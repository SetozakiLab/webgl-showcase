# Unity WebGL ショーケースサイト 要件定義書

## 1. 概要

本ドキュメントは、Next.js を使用して構築する Unity WebGL コンテンツのショーケース（ハブ）サイトに関する要件を定義する。

- 目的: 研究室で作成された複数の Unity プロジェクトを一覧紹介する「ハブ」として機能し、各コンテンツの公開先（例: Netlify, Cloudflare Pages など）へ遷移させる。
- 方針: このリポジトリには WebGL ビルドファイルを含めない。各コンテンツは外部ホスティング先に配置し、本サイトはその外部 URL へ遷移（クライアントリダイレクト）または外部リンクを提供する。
- 主要技術: Next.js (App Router), TypeScript（SSG/ISR/SSR を状況に応じて選択）
- デプロイ対象: Vercel（Preview/Production）

## 2. 機能要件

### 2.1. 必須要件 (Must-have)

#### 2.1.1. コンテンツ一覧ページ (トップページ)

- サイトで公開している全てのコンテンツをリスト形式で表示する。
- リストの各項目には、以下の情報を含める。
  - コンテンツのサムネイル画像
  - コンテンツのタイトル
- 各項目は、対応するコンテンツプレイページへのリンクとして機能する。

#### 2.1.2. コンテンツ遷移ページ

- ルート `/contents/[id]` は、対応する外部公開先 URL（Netlify 等）へ即時にクライアントリダイレクトする（window.location.replace など）。
- リダイレクト前に簡易情報（タイトル）を表示し、遷移できない場合に備えて外部リンク（新規タブで開く）と「一覧に戻る」リンクを設ける。
- 直接の WebGL 埋め込みは行わない（埋め込みは任意の拡張要件として扱う）。

#### 2.1.3. 共通レイアウト

- PC、タブレット、スマートフォンなど、異なるデバイスサイズで見やすいレスポンシブデザインに対応する。
- ヘッダーやフッターなど、全ページで共通の基本的なレイアウトを持つ。

### 2.2. 拡張要件 (Nice-to-have)

- 一覧ページの拡張:
  - 各コンテンツに短い説明文を追加表示する。
  - 「アクション」「パズル」などのカテゴリやタグを付与し、ユーザーが特定のタグでコンテンツを絞り込めるフィルタリング機能。
- 遷移ページ（/contents/[id]）の拡張:
  - リダイレクト前に表示する詳しい説明や操作方法のエリア。
  - 埋め込みプレビュー（iframe）を提供（外部側の CSP/COOP 設定により制約を受ける点に留意）。
  - X (旧 Twitter) などで遷移先を共有するための SNS シェアボタン。
- その他:
  - サイト内のコンテンツをキーワードで検索できる検索機能。

## 3. 技術仕様

### 3.1. ディレクトリ構成

本プロジェクトには WebGL ビルドファイルを含めないため、`public` 直下はサムネイル等の静的アセットのみを配置する。

```text
public/
└── thumbnails/
  ├── cool-action-game.png   # コンテンツIDに対応するサムネイル画像（拡張子は .png/.jpg/.svg など任意）
  └── puzzle-master.png
```

### 3.2. データ管理

- コンテンツのメタデータ（ID, タイトル, 説明, 外部公開先 URL 等）は、プロジェクト内の単一の JSON ファイルで一元管理する。
- ファイルパス: `src/data/contents.json`
- データ構造（例）:

```json
[
  {
    "id": "cool-action-game",
    "title": "クールアクションゲーム",
    "description": "これはすごいアクションゲームです。",
    "thumbnail": "/thumbnails/cool-action-game.png",
    "externalUrl": "https://cool-action-game.netlify.app/", // 外部ホスティング先 URL（必須）
    "tags": ["アクション", "2D"]
  },
  {
    "id": "puzzle-master",
    "title": "パズルマスター",
    "description": "頭を使うパズルゲーム。",
    "thumbnail": "/thumbnails/puzzle-master.png",
    "externalUrl": "https://puzzle-master.example.pages.dev/",
    "tags": ["パズル", "思考"]
  }
]
```

### 3.3. ページ構成 (Next.js App Router)

- 一覧ページ: `src/app/page.tsx`
  - `src/data/contents.json` を読み込み、SSG もしくは ISR で配信する。
- 遷移ページ: `src/app/contents/[id]/page.tsx`
  - 動的ルートセグメントを利用。
  - `generateStaticParams` で `contents.json` の全 ID を事前生成（推奨）。必要に応じて ISR/動的レンダリングも可。
  - サーバーリダイレクト（`next/navigation` の `redirect()`）を基本とし、フォールバックとしてクライアントリダイレクト（`window.location.replace(...)`）を提供する。
  - フォールバックとして、外部 URL を開くリンク（target="\_blank" rel="noopener"）と「一覧に戻る」を表示する。

#### 3.3.1. レンダリング方針（Vercel 前提）

- 一覧ページは SSG または ISR を採用。
- 遷移ページは `redirect()` によるサーバーリダイレクト（推奨）または ISR。
- 画像最適化は `next/image` を利用可能。

## 4. 開発ロードマップ

- Step 1: 最小構成の実装
- Step 2: データ連携と一覧ページの構築
  - `src/data/contents.json` を作成し、メタデータを定義する。
  - 一覧ページ（`/page.tsx`）で JSON を読み込み、コンテンツリストとプレイページへのリンクを動的に生成する。
- Step 3: スタイリング
  - Tailwind CSS や CSS Modules などを利用して、サイト全体の UI/UX を設計・実装する。レスポンシブ対応もこの段階で行う。
- Step 4: 拡張機能の実装
  - 必須要件が完了次第、2.2 に記載されている拡張機能（フィルタリング、検索など）の設計と実装に着手する。

## 5. デプロイ/ホスティング（Vercel）

### 5.1. 方針

- GitHub リポジトリを Vercel に接続し、PR ごとに Preview、`main` マージで Production を自動デプロイ。
- basePath/assetPrefix の設定は不要。ルート `/` を基準とした絶対パスで参照する。

### 5.2. ビルド/配信要件

- `next build` によりビルド（起動は Vercel が管理）。
- 画像最適化は有効（`next/image`）。必要に応じて外部ドメイン許可を追加。
- 静的アセットは `public/` から配信。

### 5.3. Unity WebGL ビルドに関する重要事項（外部ホスティング側/Vercel）

- 各コンテンツは Netlify / Cloudflare Pages / Vercel 等の外部ホスティングに配置する（本リポジトリにはビルドを含めない方針は継続）。
- 外部ホスティング側では、必要に応じてレスポンスヘッダー（COOP/COEP, CSP）や圧縮（br/gzip）を設定可能。
  - Threads（SharedArrayBuffer が必要）を利用する場合は、Cross-Origin Isolation（COOP/COEP）を適切に構成する。
  - 圧縮配信はホスティング側の機能を利用するか、Unity の Decompression Fallback を有効化して互換性を確保する。
- ファイルサイズや LFS 制約は各ホスティングのポリシーに従う（一般に Git LFS は避けることを推奨）。

### 5.4. CI/CD（参考）

- Vercel の Git 連携で Push/PR を自動デプロイ（Preview/Production）。
- 必要に応じて GitHub Actions はテストや Lint のみ実行し、デプロイは Vercel に任せる。

### 5.5. リンクとパス

- basePath/assetPrefix の考慮は不要。
- 例: `<a href="/contents/${id}">`、`iframe src="/contents/${id}/index.html"`（埋め込みを行う場合）。

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

- 各コンテンツページで `<title>` と `<meta name="description">` を `contents.json` から生成。
- OGP/Twitter カード（タイトル、説明、サムネイル）を出力。
- サイトマップ（`sitemap.xml`）の生成は任意（静的エクスポートの構成上、簡易に生成可能）。

### 6.4. エラーハンドリング

- `contents.json` に `externalUrl` が存在しない、または URL 形式が不正なエントリはビルド時にエラーとするか、スキップ対象とする。
- `/contents/[id]` で存在しない ID は 404 を返す。
- 遷移ページで外部サイトへのリダイレクトがブロック/失敗した場合、外部リンク（新規タブ）と再試行リンクを提示する。

## 7. 受け入れ基準（抜粋・Vercel 前提）

- ルーティング/リンク
  - Top `/` および `/contents/<id>/` が正しく解決される（例: `/contents/cool-action-game/`）。
  - 一覧の各カードはタイトル・サムネイルを表示し、クリック/Enter で遷移できる。
- 遷移ページ
  - タイトル表示、「一覧に戻る」リンク、外部サイトを開く代替リンクがある。
  - サーバーリダイレクト（`redirect()`）が機能し、必要時にクライアントリダイレクトへフォールバックする。
  - リダイレクト不可時でもユーザーが手動で外部サイトを開ける。
- ビルド/配信
  - Vercel の Preview/Production でエラーなく配信される。
  - 本リポジトリには Unity ビルドアセットを含めない。
  - Lighthouse（モバイル）で Performance 80+ / Accessibility 90+ を満たす。

## 8. 補足（実装メモ）

- `src/data/contents.json` の型定義・バリデーション
  - TypeScript 型 `Content`（id, title, description, thumbnail, externalUrl, tags など）と Zod 等でスキーマ検証を行い、ビルド時に不整合を検出。
- `generateStaticParams` は `contents.json` の ID 群から生成（`public/contents/...` の存在確認は不要）。
- 埋め込みプレビューを行う場合は、外部サイト側の CSP/COOP により iframe 許可可否が決まるため事前確認する。
- iOS/Safari 制約（オーディオ自動再生など）は外部ホスティング側の実装方針に従う。
