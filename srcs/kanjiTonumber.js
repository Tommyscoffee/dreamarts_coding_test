
export default function kanjiToNumber(kanji)
{
	let isError = 0;
	if (kanji.length > 25)
	{
		return (-1)
	}
	if (kanji == undefined || kanji === null || kanji == ' '){
		return '';
	}
	if (!(/^-?[零壱弐参四五六七八九拾百千万億兆]+$/g).test(kanji)){
		return (-1);
	}
	isError = checkInput(kanji);
	if (isError > 0)
	{
		return (-1);
	}
	const exponents= ['兆','億','万','千','百','拾'];
	let beforeChangedKanji = [];
	let ans = 0;
	beforeChangedKanji = findExponents(kanji, exponents);
	beforeChangedKanji.forEach(Kanji =>{
		ans += change2number(Kanji);
	})
	return ans;
}

function checkInput(kanji)
{
	let isError = 0;

	isError += checkDupExponents(kanji);
	isError += checkDupNum(kanji);
	return (isError);
}

function checkDupNum(kanji)
{
	const ten_kanjis=['零','壱','弐','参','四','五','六','七','八','九'];
	let i = 0;
	let isError = 0;
	while (i < kanji.length)
	{
		if (ten_kanjis.indexOf(kanji[i]) >= 0 && ten_kanjis.indexOf(kanji[i + 1]) >= 0)//二連続で数字がくるのはおかしい
		{
			console.log(`連続`);
			isError = 1;
		}
		i++;
	}
	return (isError);
}

function checkDupExponents(kanji)
{
	let checkArray = [];
	let i = 0;
	let isError = 0;
	const powerRef = ['兆','億','万'];
	powerRef.forEach(pow =>{
		checkArray[i] = kanji.match(new RegExp(pow, "g") || []); 
		i++;
	})
	checkArray.forEach(elem =>{
		if (elem && elem.length >= 2){
			isError = 1;
		}
	})

	return (isError);
}

function change2number(kanji)
{
	const ten_kanjis=['零','壱','弐','参','四','五','六','七','八','九'];
	const powerRef = ['兆','億','万'];
	const exponents_min= ['拾', '百', '千'];
	let basePower = 0;
	let sectionPower = 0;
	let i = 0;
	let j = 0;
	let sectionTotal = 0;

	basePower = powerRef.indexOf(kanji.slice(-1)) > 0 ? (3 - powerRef.indexOf(kanji.slice(-1)) ) * 4 : 0;
	while (j < kanji.length) {
		if (exponents_min.indexOf(kanji[j + 1]) >= 0)
			sectionPower = 10 ** (exponents_min.indexOf(kanji[j + 1]) + 1);
		else
			sectionPower = 1;
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
			if(kanji_array[i] === exponents[j]){
				ans[j] = kanji_array.slice(offset, i + 1);
				offset = i + 1;
				flag = 1;
			}
			i++;
		}
		j++;
		flag = 0;
	}
	if (ten_kanjis.indexOf(kanji_array[i]) !== -1 )
	{
		ans[j] = kanji_array[i];
	} else if (ans[ans.length - 1] !== '拾')
	{
		ans[j] = kanji_array[i - 1];
	}
	return ans;
}