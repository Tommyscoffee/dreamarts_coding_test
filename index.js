import express from 'express';
import multer from 'multer';
// import v4 from 'uuid/v4';//エラーの原因は uuid/v4だったから。　uudiv4にすれば解決した
import { v4 as uuidv4 } from 'uuid';
import kanjiToNumber from './srcs/kanjiTonumber.js';
// const express = require('express'); // expressモジュールを読み込む
// const multer = require('multer'); // multerモジュールを読み込む
// const uuidv4 = require('uuid/v4'); // uuidモジュールを読み込む
import numberToKanji from './srcs/numberToKanji.js'
const app = express(); // expressアプリを生成する
app.use(multer().none()); // multerでブラウザから送信されたデータを解釈する
app.use(express.static('web')); // webフォルダの中身を公開する

// TODOリストデータ
const todoList = [];

// http://localhost:3000/api/v1/list にアクセスしてきたときに
// TODOリストを返す
app.get('/api/v1/list', (req, res) => {
    // JSONを送信する
    res.json(todoList);
	const query = process.browser ? location.search : ''
	// console.log(`query ${Object.keys(req)}`)
	console.log(`query ${req.query.test}`)
});

// http://localhost:3000/api/v1/add にデータを送信してきたときに
// TODOリストに項目を追加する
app.post('/api/v1/add', (req, res) => {
    // クライアントからの送信データを取得する
    const todoData = req.body;
    const todoTitle = todoData.title;

    // ユニークIDを生成する
    const id = uuidv4();

    // TODO項目を作る
    const todoItem = {
        id,
        title: todoTitle,
        done: false
    };

    // TODOリストに項目を追加する
    todoList.push(todoItem);

    // コンソールに出力する
    console.log('Add: ' + JSON.stringify(todoItem));

    // 追加した項目をクライアントに返す
    res.json(todoItem);
});

app.get('/api/v1/number2kanji/:num', (req, res) => {
    // クライアントからの送信データを取得する
    // const todoData = req.body;
    // const todoTitle = todoData.title;
	// const query = location.search
	// console.log(`query ${query}`)
	// console.log(`res.status ${res.status}`)
	// console.log(`query ${Object.keys(req)}`)
	// console.log(`query ${req.params.num}`)//これで、値を取得
	const number = req.params.num;
	const ans = numberToKanji(number);
	const input_number = Number(req.params.num);
	console.log(`input_number ${input_number/2}`);
	console.log(`ans = ${ans}`);
    // ユニークIDを生成する
    // const id = uuidv4();

    // TODO項目を作る
    // const todoItem = {
    //     id,
    //     title: todoTitle,
    //     done: false
    // };

    // TODOリストに項目を追加する
    // todoList.push(todoItem);

    // コンソールに出力する
    // console.log('Add: ' + JSON.stringify(todoItem));

    // 追加した項目をクライアントに返す
    // res.json(todoItem);
	// try {
	// 	numberToKanji('1a');
	// } catch (e) {
	// 	console.log(e.toString());  // -> TypeError: 半角数字以外の文字が含まれています。漢数字に変換できませんでした。-> 1a
	// }
});

app.get('/api/v1/kanji2number/:kanji', (req, res) => {
    // クライアントからの送信データを取得する
    // const todoData = req.body;
    // const todoTitle = todoData.title;
	// const query = location.search
	// console.log(`query ${query}`)
	// console.log(`res.status ${res.status}`)
	// console.log(`query ${Object.keys(req)}`)
	// console.log(`query ${req.params.num}`)//これで、値を取得
	const kanji = req.params.kanji;
	// console.log(`kanji.length ${kanji.length}`)
	const ans = kanjiToNumber(kanji);
	console.log(`kanji ${kanji}`);

	// const input_number = Number(req.params.kanji);
	// console.log(`input_number ${input_number/2}`);
	console.log(`ans = ${ans}`);
    // ユニークIDを生成する
    // const id = uuidv4();

    // TODO項目を作る
    // const todoItem = {
    //     id,
    //     title: todoTitle,
    //     done: false
    // };

    // TODOリストに項目を追加する
    // todoList.push(todoItem);

    // コンソールに出力する
    // console.log('Add: ' + JSON.stringify(todoItem));

    // 追加した項目をクライアントに返す
    // res.json(todoItem);
	// try {
	// 	numberToKanji('1a');
	// } catch (e) {
	// 	console.log(e.toString());  // -> TypeError: 半角数字以外の文字が含まれています。漢数字に変換できませんでした。-> 1a
	// }
});

// ポート3000でサーバを立てる
app.listen(3330, () => console.log('Listening on port 3330'));