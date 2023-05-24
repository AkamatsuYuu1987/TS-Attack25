import express from 'express';
import path from 'path';

const app = express();
const port = 8080;

// 静的ファイルのホスティング
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
