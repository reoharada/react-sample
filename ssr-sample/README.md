# ssr-sample
React+ExpressのSSR（Server Side Rendering）サンプルコード
https://medium.com/jspoint/a-beginners-guide-to-react-server-side-rendering-ssr-bf3853841d55

# npmとnodeのバーション
```
$ npm -v
6.14.13
$ node -v
v14.17.0
```

# 構築手順
```
$ npm install
```

# react環境起動
```
$ npm run start
```
URL1: http://localhost:8088
※ 下記のスプレッドシートと通信している
https://docs.google.com/spreadsheets/d/1q4xlzi3k9e0xill87ivc8dq4dlhjjofn8qctv1esnds/edit#gid=0
注意 postのapiのエントリーポイントはexpress環境にあるため、postは失敗する
URL2: http://localhost:8088/detail

# ビルドファイル作成
```
$ npm run build
```
distフォルダ配下にビルドファイルが配置される
```
$ ls -la dist/
```

# SSR環境(Express環境)起動
前提条件：ビルドファイルが作成させていること
```
$ ls -la dist/
total 8
drwxr-xr-x   5 reoharada  staff  160  8  6 14:00 .
drwxr-xr-x  12 reoharada  staff  384  8  6 14:25 ..
drwxr-xr-x   9 reoharada  staff  288  8  6 14:00 build
drwxr-xr-x   3 reoharada  staff   96  8  6 14:00 detail
-rw-r--r--   1 reoharada  staff  510  8  6 14:00 index.html
```
SSR環境起動
```
$ npm run start:ssr
```
URL1: http://localhost:9000
※ 下記のスプレッドシートと通信している
https://docs.google.com/spreadsheets/d/1q4xlzi3k9e0xill87ivc8dq4dlhjjofn8qctv1esnds/edit#gid=0
URL2: http://localhost:9000/detail
