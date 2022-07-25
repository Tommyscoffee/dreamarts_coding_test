
export default function numberToKanji(num)
{
	if ( num.length > 16)
	{
		return (-1)
	}
	if (num == undefined || num === null || num == ' '){
		return '';
	}
	if (!(/^-?[0-9]+$/g).test(num)){
		return (-1)
	}
	num = Number(num);
	if (!Number.isSafeInteger(num) || num < 0){
		return (-1)
	}
	if (num == 0){
		return '零';
	}
	let ans = '';
	const kanjiNums = ['','壱','弐','参','四','五','六','七','八','九'];
	const kanjiNames = ['拾','百','千','万','億','兆'];
	const exponents = [1,2,3,4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68];
	const exponentsLen = exponents.length;
	for (let i = exponentsLen; i >= 0; --i){
		const bias = Math.pow(10, exponents[i]);
		if (num >= bias) {
			const top = Math.floor(num / bias);
			if (top >= 10){
				ans += numberToKanji(top);
			} else {
				ans += kanjiNums[top];
			}
			ans += kanjiNames[i];
			num -= top * bias;
		}
	}
	ans += kanjiNums[num];
	return ans;
}