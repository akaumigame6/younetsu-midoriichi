# 🎨 イベント向け AI感想共有アプリ (プロトタイプ)

このプロジェクトは、イベント会場で来場者が作家（クリエイター）へ感想を送信し、AI（Gemini）を用いて感情豊かで前向きな文章に整形して作家へ届けるためのWebアプリケーションです。

> **⚠️ 注意**
> 本プロジェクトはあくまで**プロトタイプ（試作品）**として開発されたものです。
> 本番環境での大規模な運用や完全な動作を保証するものではありません。

---

## 📸 スクリーンショット（UIイメージ）


1. 来場者の入力画面
   ![来場者入力画面](./images/SURVEY_Motion.png)
   ![来場者入力画面](./images/SURVEY_Check.png)

2. 管理画面のダッシュボード
   ![管理画面ダッシュボード](./images/ADMIN_Board.png)

3. 作家さん用閲覧ページ
   ![作家さん閲覧ページ](./images/CREATOR_Check.png)

---

## ✨ 主な機能

- **来場者向けフォーム**: 感情（ワクワクした、感動した等）を選択し、場所や理由を直感的に入力できるフォーム。
- **AI・定型文による文章整形**: 質問内容から感想を、Gemini APIや定型文を用いて丁寧な文章に自動整形。
- **作家専用ページ**: 作家ごとに発行される専用URLから、自分宛ての感想一覧や「感情の割合グラフ」を閲覧可能（既読機能つき）。
- **管理ダッシュボード**: イベント主催者向けの管理画面。参加作家の登録、QRコードのダウンロード、アンケート結果のCSV出力機能。

## 🛠 技術スタック

- **Frontend**: Next.js (App Router), React, TypeScript
- **Styling**: CSS (Vanilla, Glassmorphism design), Lucide React (Icons)
- **Backend / Database**: Supabase (PostgreSQL, Auth, Storage)
- **AI Integration**: Google Gemini API

## 🚀 ローカル環境での起動方法

### 1. 必要な環境変数の設定
プロジェクトのルートディレクトリに `.env` ファイルを作成し、以下の情報を記述してください。

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

### 2. パッケージのインストール
```bash
npm install
```

### 3. 開発サーバーの起動
```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

---

## 📝 開発メモ

- 当初は `React + Vite` で開発を開始しましたが、APIの秘匿化やSSRの必要性から `Next.js` に移行しました。
- 認証には Supabase Auth を使用し、Middleware（`proxy.ts`）で管理画面（`/admin`）のルートガードを行っています。
