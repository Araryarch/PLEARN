# Next.js + Bun.js + ShadCN テンプレート

このテンプレートは **Next.js**、**Bun.js**、そして **ShadCN UI**（**Tailwind CSS** ベース）を使用した、モダンで高速な Web アプリケーション開発のためのスタータープロジェクトです。

作者：[Ararya](https://github.com/Araryarch)

---

## ✨ 特徴

- ⚡ **Bun.js** — 超高速なランタイム＆バンドラー
- 🧱 **ShadCN UI** — Tailwind CSS ベースの再利用可能な UI コンポーネント
- ⚙️ **Next.js** — React フレームワーク
- 🚀 ビルドおよび起動の最適化済み

---

## 🔧 前提条件

以下のツールがインストールされていることを確認してください：

- [Node.js](https://nodejs.org/)
- [Bun.js](https://bun.sh/)

```bash
curl -fsSL https://bun.sh/install | bash
```

---

## 🚀 インストール手順

```bash
git clone https://github.com/Araryarch/template-next-bun.git
cd template-next-bun
bun install
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

---

## 📱 Android 向けビルド手順

```bash
rm -rf android # iOS の場合は ios を削除
bun run build:android
bun x cap add android
bun x cap sync android
bun x cap open android
```

---

## 📚 ドキュメント

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Bun.js ドキュメント](https://bun.sh/docs)
- [ShadCN UI ドキュメント](https://shadcn.dev/docs)

---

## 📄 ライセンス

このプロジェクトは **GNU General Public License v3.0 (GPL-3.0)** のもとで公開されています。
同じライセンス条件のもとで、自由に使用・改変・再配布することができます。
