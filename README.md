# figma-plugin

## 初期セットアップはこちら

Figmaプラグインを動かすための初期セットアップ手順を説明します。  
公式ドキュメントはこちらです。

  https://www.figma.com/plugin-docs/plugin-quickstart-guide/

まず、NPMが同梱された **Node.js** をインストールします。  

  https://nodejs.org/en/download/

次に、以下のコマンドで TypeScript をグローバルインストールします。

  npm install -g typescript

続いて、プラグインのフォルダ（このファイルがある場所）で、次のコマンドを実行します。

  npm install --save-dev @figma/plugin-typings

開発には **Visual Studio Code** の使用をおすすめします。

1. まだインストールしていない場合は、https://code.visualstudio.com/ からダウンロードします。
2. このディレクトリを Visual Studio Code で開きます。
3. TypeScript を JavaScript にコンパイルするには、メニューから「Terminal > Run Build Task...」を選び、
   一覧から `npm: watch` を選択します。VS Code を再起動した場合は、再度このタスクを実行してください。

これでセットアップ完了です。  
以降は、ファイルを保存するたびに Visual Studio Code が自動で JavaScript ファイルを再生成してくれます。

## ハンズオンガイド

### 流れ

1. 作りたいものを考える
2. セットアップ
   1. プロジェクトのzipダウンロード
   2. ツール（NPM, TypeScript, Visual Studio Code, Figma）をインストール
3. プラグイン開発にチャレンジ
   1. `npm i`
   2. `npm run watch`
   3. Figmaからプラグインを開く
   4. バイブコーディング
4. 作ったものを共有

### 作りたいもの

- 要素の端数を切り捨てるFigmaプラグイン

### 編集するファイル

- [ui.html](ui.html)
  - UI（文字・ボタンやそれらのデザイン）を構築するファイルです。
- [code.ts](code.ts)
  - ロジック（ボタンを押した時の処理）を記述するファイルです。

### プロンプト

- [prompt.md](prompt.md) を参考に、AIとやりとりしてみましょう。
