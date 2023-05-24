# ベースとなるDockerイメージ指定
FROM node:16

# コンテナ内に作業ディレクトリを作成
WORKDIR /usr/src/app

# 依存関係ファイルをコンテナ内にコピー
COPY package*.json ./

# TypeScriptとts-nodeをインストール
RUN npm install -g typescript ts-node

# 必要なライブラリをインストール
RUN npm install

# ローカルのソースコードをコンテナの作業ディレクトリにコピー
COPY . .

# TypeScriptをJavaScriptにトランスパイル
RUN npm run build

# ポートのマッピング
EXPOSE 8080

# コンテナ起動時に実行されるコマンド
CMD [ "node", "dist/main.js" ]