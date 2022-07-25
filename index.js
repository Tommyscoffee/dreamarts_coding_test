import express from 'express';
import multer from 'multer';
import kanjiToNumber from './srcs/kanjiTonumber.js';
import numberToKanji from './srcs/numberToKanji.js'
const app = express(); // expressアプリを生成する
app.use(multer().none()); // multerでブラウザから送信されたデータを解釈する
app.use(express.static('web')); // webフォルダの中身を公開する

app.get('/api/v1/number2kanji/:num', (req, res) => {
	const number = req.params.num;
	const ans = numberToKanji(number);
	if (ans < 0)
	{
		res.sendStatus(204);
	} else{
		res.json(ans);
	}
});

app.get('/api/v1/kanji2number/:kanji', (req, res) => {
	const kanji = req.params.kanji;
	const ans = kanjiToNumber(kanji);
	console.log(`ans = ${ans}`);
	if (ans < 0)
	{
		res.sendStatus(204);
	} else{
		res.json(ans);
	}
});

// ポート3330でサーバを立てる
app.listen(3330, () => console.log('Listening on port 3330'));