# RAKUDA Invoice — 引き継ぎドキュメント

最終更新: 2026-03-24

---

## 1. プロジェクト概要

| 項目 | 内容 |
|------|------|
| サービス名 | ラクダInvoice（AI請求書自動作成） |
| 技術スタック | Next.js 15 + React 19 + TypeScript |
| CSS | Tailwind CSS v4 + globals.css + インラインstyle |
| ホスティング | GitHub Pages（静的エクスポート） |
| リポジトリ | https://github.com/shuheiuesugi/rakuda-invoice |
| 本番URL | https://shuheiuesugi.github.io/rakuda-invoice/ |
| basePath | `/rakuda-invoice` |

---

## 2. 公開URL一覧

### メインページ
| ページ | URL | ソースコード |
|--------|-----|-------------|
| メインLP | https://shuheiuesugi.github.io/rakuda-invoice/ | `src/app/page.tsx` |
| コストLP | https://shuheiuesugi.github.io/rakuda-invoice/lp/cost | `src/app/lp/cost/page.tsx` |
| Easy LP | https://shuheiuesugi.github.io/rakuda-invoice/lp/easy | `src/app/lp/easy/page.tsx` |
| サインアップ | https://shuheiuesugi.github.io/rakuda-invoice/signup | `src/app/signup/page.tsx` |
| 導入相談 | https://shuheiuesugi.github.io/rakuda-invoice/book-call | `src/app/book-call/page.tsx` |

### 法的ページ
| ページ | URL | ソースコード |
|--------|-----|-------------|
| 利用規約 | https://shuheiuesugi.github.io/rakuda-invoice/terms | `src/app/terms/page.tsx` |
| プライバシーポリシー | https://shuheiuesugi.github.io/rakuda-invoice/privacy | `src/app/privacy/page.tsx` |
| 特定商取引法 | https://shuheiuesugi.github.io/rakuda-invoice/tokushoho | `src/app/tokushoho/page.tsx` |
| セキュリティ | https://shuheiuesugi.github.io/rakuda-invoice/security | `src/app/security/page.tsx` |

### LP用途
- **メインLP**: SEOオーガニック流入用（robots: index）
- **コストLP** (`/lp/cost`): コスト削減訴求。経理担当・管理部門向け広告用（robots: noindex）
- **Easy LP** (`/lp/easy`): かんたん訴求。非技術者・個人事業主向け広告用（robots: noindex）

---

## 3. ディレクトリ構造

```
rakuda-invoice/
├── public/
│   └── favicon.svg          # RAKUDAラクダシルエットSVG
├── src/app/
│   ├── layout.tsx           # 共通レイアウト（OGP）
│   ├── globals.css          # 全ページ共通CSS
│   ├── page.tsx             # メインLP
│   ├── signup/page.tsx      # サインアップ
│   ├── book-call/page.tsx   # 導入相談フォーム
│   ├── terms/page.tsx       # 利用規約
│   ├── privacy/page.tsx     # プライバシーポリシー
│   ├── tokushoho/page.tsx   # 特定商取引法
│   ├── security/page.tsx    # セキュリティ
│   └── lp/
│       ├── cost/
│       │   ├── layout.tsx   # meta設定（noindex）
│       │   └── page.tsx     # コスト訴求LP
│       └── easy/
│           ├── layout.tsx   # meta設定（noindex）
│           └── page.tsx     # やさしい言葉LP
├── next.config.ts           # output: "export", basePath: "/rakuda-invoice"
├── package.json             # Next.js 15, React 19
├── HANDOFF.md               # 本ドキュメント
└── out/                     # ビルド成果物（gh-pagesにデプロイ）
```

---

## 4. 料金プラン

| プラン | 月額 | 主な機能 |
|--------|------|----------|
| Free | ¥0 | 月5通、AI自動作成、インボイス制度対応、PDF DL、取引先5社 |
| Pro | ¥980 | 無制限、定期請求自動化、入金ステータス管理、カスタムテンプレート、会計ソフト連携（freee/MF/弥生）、年払い¥9,800/年 |
| Enterprise | 要問合せ | チーム無制限、SSO/SAML、REST API/Webhook、専任CS、SLA 99.9%、監査ログ |

> 同等機能の請求書ソフトが月3,000〜5,000円の中、月額980円〜。他社の約1/3。

---

## 5. ソーシャルプルーフ（実績数値）

メインLPのヒーロー下部に表示されるカウントアップアニメーション付き実績数値:

| 指標 | 値 | ソースコード位置 |
|------|-----|-----------------|
| AI作成時間 | 27秒 | `stat1 = useCountUp(27)` |
| 累計発行数 | 1,284通 | `stat2 = useCountUp(1284)` |
| 正確性 | 99% | `stat3 = useCountUp(99)` |
| 導入事業者 | 120社 | `stat4 = useCountUp(120)` |

> **更新履歴**: 2026-03-24 累計発行数 128,400→1,284、導入事業者 4,200→120 に変更

---

## 6. デザインシステム

### ブランド統一仕様（Reception/Hub/Mail/Invoice共通）
- **ヘッダー**: 透明背景 → スクロールで白半透明。ロゴSVG 白→ネイビー切替
- **CTA**: 2ボタン構成（`btn-dark` 無料相談 + `btn-cta-call` アンバー 無料で始める）
- **フッター**: RAKUDA AIロゴ + サポートメール + 法的リンク4本 + コピーライト
- **ファビコン**: ラクダシルエットSVG（`public/favicon.svg`）

---

## 7. 広告運用対応状況

### ローンチ前TODO
| 項目 | 優先度 | 詳細 |
|------|--------|------|
| GTM/GA4設定 | 🔴 必須 | `layout.tsx` にGTMまたはGA4タグを追加 |
| Clarity ID設定 | 🔴 必須 | `layout.tsx` にClarityスクリプトを追加 |
| CVトラッキング実装 | 🔴 必須 | signup: `sign_up`、book-call: `generate_lead`イベント |
| OGP画像作成 | 🟡 推奨 | `og:image` 用の1200x630画像 |
| robots.txt作成 | 🟡 推奨 | `public/robots.txt` が未作成 |
| Meta Pixel追加 | 🟡 推奨 | Facebook/Instagram広告を使う場合 |

---

## 8. 既知の課題・制限

### 高優先度
1. **GTM/Clarity未設定**（layout.tsxにタグなし）
2. **CVトラッキング未実装**（signup/book-callにイベント発火なし）
3. **フォーム送信がモック**（`setSubmitted(true)` でUI切替するだけ）

### 中優先度
4. LP variants間でコード重複が大きい → コンポーネント化推奨
5. UTMパラメータの引き継ぎ未実装
6. robots.txt が未作成

### 低優先度
7. favicon.ico は未作成（SVG版のみ）
8. モバイルハンバーガーメニューのonClickハンドラ未実装

---

## 9. 開発・デプロイ手順

### ローカル開発
```bash
cd ${OUTPUT_BASE}/rakuda-redesign/rakuda-invoice
npm install
npm run dev        # http://localhost:3000/rakuda-invoice/
```

### ビルド & デプロイ（必ずセットで実行）
```bash
# 1. ソースコードをコミット&プッシュ
git add src/app/... && git commit -m "変更内容" && git push origin master

# 2. ビルド
npm run build

# 3. gh-pagesブランチにデプロイ
TMPDIR=$(mktemp -d) && cp -r out/* "$TMPDIR/" && touch "$TMPDIR/.nojekyll" && \
cd "$TMPDIR" && git init && git checkout -b gh-pages && git add -A && \
git commit -m "deploy" && git remote add origin https://github.com/shuheiuesugi/rakuda-invoice.git && \
git push -f origin gh-pages
```

> **重要**: `.nojekyll` ファイルがないと `_next/` ディレクトリが404になる

### リンクパスのルール
| ページ階層 | 兄弟ページへのリンク | 例 |
|-----------|-------------------|-----|
| ルート直下（/signup, /terms等） | `./` | `href="./signup"` |
| LP配下（/lp/cost, /lp/easy） | `../` | `href="../signup"` |
| ページ内アンカー | `#` | `href="#pricing"` |

---

## 10. 関連リソース

| リソース | URL |
|---------|-----|
| RAKUDA AI比較 LP | https://shuheiuesugi.github.io/rakuda-hub/ |
| RAKUDA メール LP | https://shuheiuesugi.github.io/rakuda-mail/ |
| RAKUDA Reception LP | https://shuheiuesugi.github.io/rakuda-reception/ |
