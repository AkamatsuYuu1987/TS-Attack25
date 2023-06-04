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

# ポートの指定
EXPOSE 8080

# アプリケーションの起動
CMD [ "npm", "run", "serve" ]
