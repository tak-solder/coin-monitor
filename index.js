"use strict";

const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');


// メインウィンドウはGCされないようにグローバル宣言
let win;

// Electronの初期化完了後に実行
app.on("ready", () => {
    //ウィンドウサイズを1280*720（フレームサイズを含まない）に設定する
    win = new BrowserWindow({
        width: 940,
        height: 90,
        useContentSize: true,
        resizable: false,
        title: 'Coin Monitor'
    });
    //使用するhtmlファイルを指定する
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/htdocs/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // ウィンドウが閉じられたらアプリも終了
    win.on("closed", () => {
        win = null
    });

    win.setMenu(null);
});

app.on("window-all-closed", () => {
    if (process.platform != "darwin") {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});
