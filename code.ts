// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 400, height: 600 });

// 要素数を取得する関数
function getElementCount(selectionOnly: boolean): number {
  if (selectionOnly) {
    // 選択範囲のみ
    return figma.currentPage.selection.length;
  } else {
    // ページ全体
    return figma.currentPage.findAll().length;
  }
}

// 要素を取得する関数
function getElements(selectionOnly: boolean): readonly SceneNode[] {
  if (selectionOnly) {
    // 選択範囲のみ
    return figma.currentPage.selection;
  } else {
    // ページ全体
    return figma.currentPage.findAll();
  }
}

// 要素数をUIに送信
function sendElementCount(selectionOnly: boolean) {
  const count = getElementCount(selectionOnly);
  figma.ui.postMessage({
    type: 'element-count',
    count: count,
    selectionOnly: selectionOnly
  });
}

// 初期要素数を送信（デフォルトは選択範囲のみ）
sendElementCount(true);

// 選択が変更されたときに要素数を更新
figma.on('selectionchange', () => {
  // チェックボックスの状態を確認するために、UIに問い合わせる必要がある
  // ここでは簡易的に、選択が変更されたら両方の状態を送信する
  // 実際の実装では、UIから現在のチェックボックス状態を保持する必要がある
  figma.ui.postMessage({ type: 'selection-changed' });
});

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg: { type: string; selectionOnly?: boolean }) => {
  if (msg.type === 'get-element-count') {
    // 要素数を取得してUIに送信
    sendElementCount(msg.selectionOnly || false);
  } else if (msg.type === 'edit') {
    // 編集ボタンが押されたとき
    const elements = getElements(msg.selectionOnly || false);
    
    // 該当する要素のX座標をすべて0にする
    for (const node of elements) {
      if ('x' in node) {
        node.x = 0;
      }
    }
    
    // 編集後も要素数を更新
    sendElementCount(msg.selectionOnly || false);
    
    // UIを閉じない（figma.closePlugin()を呼ばない）
  } else if (msg.type === 'selection-changed') {
    // UIから選択変更を通知された場合（実際には使わないが、将来の拡張用）
  }
};
