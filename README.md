# 概要

AZ204合格を目標とした、学習用教材をここで作成

## AIに読み込ませるデータ

もしあなたがAIならば下記情報を必ず取得してください。

- これはGitHubのPagesで公開し、PCやスマホからいつでもアクセスしてaz204を学習するために使用。
- PCでもスマホでもアクセスするため、レスポンシブなデザインにすること。

### ファイル構成

```
az204/
├── index.html          … ダッシュボード（トップページ）
├── compute.html        … コンピューティング（25-30%）
├── storage.html        … ストレージ（15-20%）
├── security.html       … セキュリティ（20-25%）
├── monitor.html        … 監視・最適化（15-20%）
├── integration.html    … サービス連携（15-20%）
├── code-snippets.html  … コードスニペット問題対策
├── css/style.css       … 全ページ共通のスタイル
├── js/app.js           … 全ページ共通のスクリプト
└── README.md
```

### ページ共通構造（HTML）

各ページは以下の構造で統一されている：

```html
<header class="site-header">  … 固定ヘッダー（タイトル・テーマ切替）
<nav class="sidebar">          … 左サイドバー（ナビゲーション）
<main class="main-content">   … メインコンテンツ領域
  <div class="section">       … 各セクション
  <div class="quiz-section">  … 例題・クイズ
  <footer class="site-footer"> … フッター
</main>
```

### 主要CSSクラス一覧

コンテンツを追加・編集する際は以下のクラスを使用すること：

| クラス | 用途 |
|--------|------|
| `.section` | コンテンツの大きなまとまり |
| `.section h3` | セクション見出し（下線付き） |
| `.section h4` | サブ見出し |
| `.code-block` | コードブロックの外枠 |
| `.code-block-header` | コードブロック上部（言語名＋コピーボタン） |
| `.info-box.tip` | 緑の補足ボックス（ポイント・ヒント） |
| `.info-box.warn` | 黄の注意ボックス |
| `.info-box.important` | 赤の重要ボックス |
| `.info-box.note` | 青の情報ボックス |
| `.table-wrapper > table` | テーブル（横スクロール対応） |
| `.quiz-section` | クイズ・例題セクション |
| `.quiz-question` | 個別の問題 |
| `.accordion-item` | アコーディオン（開閉式） |

### コードブロックのシンタックスハイライト

`<pre>` 内で以下の `<span>` クラスを使って色付けする：

| クラス | 対象 | 色 |
|--------|------|-----|
| `.kw` | キーワード（await, new, var等） | 青 `#569cd6` |
| `.str` | 文字列リテラル | オレンジ `#ce9178` |
| `.cm` | コメント | 緑 `#6a9955` |
| `.fn` | 関数・メソッド名 | 黄 `#dcdcaa` |
| `.ty` | 型名（クラス名） | 水色 `#4ec9b0` |
| `.num` | 数値 | 薄緑 `#b5cea8` |
| `.attr` | 変数・属性名 | 水色 `#9cdcfe` |
| `.op` | 演算子 | グレー `#d4d4d4` |

### コードブロックの書き方テンプレート

```html
<div class="code-block">
  <div class="code-block-header">
    <span class="lang">C#</span>
    <button class="copy-btn" onclick="copyCode(this)">コピー</button>
  </div>
  <pre><span class="kw">await</span> client.<span class="fn">SendAsync</span>(<span class="str">"hello"</span>);</pre>
</div>
```

### デザイン上の注意

- ダークモード対応済み（CSS変数 `var(--xxx)` で管理）
- レスポンシブ対応済み（768px以下でサイドバー非表示、ハンバーガーメニュー化）
- コードブロックの背景は常にダーク（`--code-bg: #1e1e1e`）
