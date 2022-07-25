
export default function kanjiToNumber(kanji)
{
	console.log(`length ${kanji.length}`);
	if (kanji.length > 25)
	{
		throw new TypeError('範囲を超えました',204);
	}
	if (kanji == undefined || kanji === null || kanji == ' '){
		return '';
	}
	if (!(/^-?[零壱弐参四五六七八九拾百千万億兆]+$/g).test(kanji)){
		throw new TypeError('漢数字以外の文字が含まれています。数字に変換できませんでした。-> '+ kanji);
	}
	let ret = '';

	console.log(`kanji[0] ${kanji[0]}`);
	// console.log(`kanji[0] ${kanji.length}`);
	let i = 0;
	let j = 0;
	let length = kanji.length;
	const ten_kanjis=['零','壱','弐','参','四','五','六','七','八','九'];
	let beforeTranslatedKanji = [];
	const exponents= ['兆','億','万','千','百','拾'];
	// const exponents_min= ['千','百','拾'];
	// const powerRef = ['兆','億','万'];
	let beforeChangedKanji = [];
	let foundIndex = [];
	let power = 0;
	let exponentsLength = exponents.length;
	let ans = 0;
	beforeChangedKanji = findExponents(kanji, exponents);
	beforeChangedKanji.forEach(Kanji =>{
		console.log(`+=+=+ kanji ${Kanji}`);
		ans += change2number(Kanji);
	})
	console.log(`\n ans ${ans}`);
	// beforeTranslatedKanji.forEach(section =>{
	// 	console.log(`section ${section}`);

	// 	console.log(`section.slice(-1) ${section.slice(-1)}`);
	// 	power = powerRef.indexOf(section.slice(-1)) > 0 ? (3 - powerRef.indexOf(section.slice(-1)) ) * 4 : 1;
	// 	console.log(`power ${power}`);

	// 	console.log('\n');
	// 	i++;
	// })


	return ans;
}
function change2number(kanji)
{
	const ten_kanjis=['零','壱','弐','参','四','五','六','七','八','九'];
	const exponents= ['兆','億','万','千','百','拾'];
	const exponents_min= ['拾', '百', '千'];
	const powerRef = ['兆','億','万'];
	let foundIndex = [];
	let basePower = 0;
	let sectionPower = 0;
	let i = 0;
	let j = 0;
	let sectionTotal = 0;
	console.log('\n\n\n');
	console.log(`kanji ${kanji}`);
	console.log(`kanji.slice(-1) ${kanji.slice(-1)}`);
	basePower = powerRef.indexOf(kanji.slice(-1)) > 0 ? (3 - powerRef.indexOf(kanji.slice(-1)) ) * 4 : 0;
	console.log(`basePower ${basePower}`);
	while (j < kanji.length) {
		// if (exponents_min.indexOf(kanji[j + 1]) >= 0){
			if (exponents_min.indexOf(kanji[j + 1]) >= 0)
				sectionPower = 10 ** (exponents_min.indexOf(kanji[j + 1]) + 1);
			else
				sectionPower = 1;
			console.log(`exponents.indexOf(kanji[j * 2]) ${exponents_min.indexOf(kanji[j + 1])}`);
			console.log(`sectionPower ${sectionPower}`);
			console.log(`-=-=-=- ${ten_kanjis.indexOf(kanji[j])}`);
			console.log(`kanji[${j}] ${kanji[j]}`);
			sectionTotal += Number(ten_kanjis.indexOf(kanji[j])) * Number(sectionPower);
		j+= 2;
	}
	sectionTotal *= (10 ** basePower) ;
	i++;
	return sectionTotal;
}

function findExponents(kanji_array, exponents)
{
	const ten_kanjis=['零','壱','弐','参','四','五','六','七','八','九'];
	let i = 0;
	let ans =[];
	let j = 0;
	let flag = 0;
	let offset = 0;
	while (j < 6)
	{
		i = offset;
		while (kanji_array[i] && !flag)
		{
			if(kanji_array[i] === exponents[j]){//ここで上の桁からのひとまとまりがかかる。
				// console.log(`kanji_array[${i}] ${kanji_array[i]}`);
				ans[j] = kanji_array.slice(offset, i + 1);
				offset = i + 1;
				// array
				flag = 1;
			}
			i++;
		}
		j++;
		flag = 0;
	}
	console.log(`i = ${i}`);
	console.log(`j = ${j}`);
	console.log(`kanji_array[${i}] ${kanji_array[i - 1]}`);
	console.log(`ten_kanjis.indexOf(kanji_array[i]) ${ten_kanjis.indexOf(kanji_array[i])}`);
	if (ten_kanjis.indexOf(kanji_array[i - 1]) !== -1)
		ans[j] = kanji_array[i - 1];
	return ans;
}