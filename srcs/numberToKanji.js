
export default function numberToKanji(num){

	console.log(`length ${num.length}`);
	if ( num.length > 16)
	{
		throw new TypeError('範囲を超えました',204);
	}
	if (num == undefined || num === null || num == ' '){
		return '';
	}
	if (!(/^-?[0-9]+$/g).test(num)){
		throw new TypeError('半角数字以外の文字が含まれています。漢数字に変換できませんでした。-> '+ num);
	}
	num = Number(num);
	if (!Number.isSafeInteger(num)){
		throw new RangeError('数値が '+ Number.MIN_SAFE_INTEGER +' ～ '+ Number.MAX_SAFE_INTEGER +' の範囲外です。漢数字に変換できませんでした。-> '+ num);
	}
	if (num == 0){
		return '零';
	}
	let ret = '';
	if (num < 0){
		ret += 'マイナス';
		num += -1;
	}
	const numStr = num + '';
	const kanjiNums = ['零','壱','弐','参','四','五','六','七','八','九'];
	const kanjiNames = ['拾','百','千','万','億','兆'];
	const exponents = [1,2,3,4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68];
	const exponentsLen = exponents.length;
	for (let i = exponentsLen; i >= 0; --i){
		const bias = Math.pow(10, exponents[i]);
		if (num >= bias) {
			const top = Math.floor(num / bias);
			if (top >= 10){
				ret += numberToKanji(top);
			} else {
				// if (top == 1 && exponents[i] <= 3){
//先頭の数字が、１かつ、指数が３（線のくらい）以下の場合のみ「ー」を付けない
				// }
				ret += kanjiNums[top];
			}
			ret += kanjiNames[i];
			num -= top * bias;
		}
	}
	ret += kanjiNums[num];
	return ret;
}