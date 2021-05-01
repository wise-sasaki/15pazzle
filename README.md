# 15pazzle
pure javascriptでどれぐらい書けるのか？というテーマで作成した15パズル。
* 「Start」ボタンをクリックするとゲームが開始されます。
* 空いているスペースに隣合っている数字パネルをクリックすればパネルを移動できます。
* 左上から１～１５の順番に並べ替えるとゲームクリアです。

# DEMO
https://master.dc2vsl1ityb0h.amplifyapp.com/html/index.html

# Features
* id属性に「pazzle-wrap」をつけたdiv要素置いておくだけで、画面表示時にパズルが呼び出されます。
```
<!DOCTYPE HTML>
<html>
    <head>
        <title>15パズル</title>
        <link rel="stylesheet" type="text/css" href="../css/15pazzle.css">
        <script src="../js/15pazzle.js"></script>
    </head>
    <body>
        <div id="pazzle-wrap"></div>
    </body>
</html>
```

* カラーバリエーション：特定のclass属性を指定するとパズルのデザインを変更することができます。
  * デフォルト：なし
    ```
    <div id="pazzle-wrap"></div>
    ```
  * 赤：pazzle-red
    ```
    <div id="pazzle-wrap" class="pazzle-red"></div>
    ```
  * 青：pazzle-blue
    ```
    <div id="pazzle-wrap" class="pazzle-blue"></div>
    ```
  * 緑：pazzle-green
    ```
    <div id="pazzle-wrap" class="pazzle-green"></div>
    ```

# Requirement
none

# Note
研修とかに使えたらいいなぁと思って作成しました。

# Author
* wise-sasaki
* 株式会社ワイズ・システム(https://wisesystem.jp)
* E-mail

# License
15pazzle is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
