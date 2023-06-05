# ベースとなるDockerイメージの指定
FROM node:17

# 作業ディレクトリの指定
WORKDIR /app

# 依存関係ファイルをコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# ソースコードをコピー
COPY . .

# TypeScriptをJavaScriptにコンパイル
RUN npm run build

# ポートの指定
EXPOSE 3000

# アプリケーションの起動
CMD [ "npm", "run", "start" ]
