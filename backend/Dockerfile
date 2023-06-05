# ベースとなるDockerイメージの指定
FROM node:lts

# 作業ディレクトリの指定
WORKDIR /app

# 依存関係ファイルをコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# TypeScriptをJavaScriptにコンパイル
RUN npm run build

# ソースコードをコピー
COPY . .

# ポートの指定
EXPOSE 3000

# アプリケーションの起動
CMD [ "node", "dist/app.js" ]
