//문자열 메소드 String method

let html = '<div class="box_title">제목 영역</div>';
let desc = "it's 3 0'clock.";
let name = "Mike";
let result = `My name is ${name}.`;
let add = `2 더하기 3은 ${2 + 3}입니다.`;
console.log(html);
console.log(desc);
console.log(name);
console.log(result);
console.log(add);
//백틱은 여러줄도 가능

//length: 문자열 길이
let greet = "안녕하세요.";
console.log(greet.length);

//특정 위치에 접근
console.log(greet[3]); //'세' 번호는 index순

greet[4] = "용";
console.log(greet[4]); //'요'
console.log(greet); //'안녕하세요'
//배열과다르게 한글자만 넣고 한다해봤자 아무런 변화없음

//toUpperCase() / toLowerCase()
//모든 영문을 대문자로 / 모든 영문을 소문자로
console.log(result.toUpperCase()); //MY NAME IS MIKE.
console.log(result.toLowerCase()); //my name is mike.

//str.indexOf(text)
//문자를 인수로 받아 몇번째 수인지 알려줌 (index번호)
console.log(result.indexOf("Mi")); //11
//복수라도 첫번째 글자의 번호를 반환
console.log(result.indexOf("Bella")); //-1
//없으면 -1을 반환

if (result.indexOf("My")) {
	console.log("My가 포함된 문장입니다.");
}
//결과값이 안나옴 My는 인덱스번호로 0이기때문에 false
if (result.indexOf("My") > -1) {
	console.log("My가 포함된 문장입니다.");
}
//따라서 이렇게 해주어야 함.

//str.slice(n,m) n부터 m까지의 문자열을 반환
//n- 시작점, m- 없으면 문자열 끝까지, 양수면 그 숫자까지(포함하지 않음), 음수면 끝에서부터 센다.

let alphabet = "abcdefg";

console.log(alphabet.slice(2)); //'cdefg'
console.log(alphabet.slice(0, 5)); //'abcde'
console.log(alphabet.slice(2, -2)); //'cde'
//인덱스 2에서 끝에서 인덱스 2번째자리까지 반환

//str.substriong(n,m)
//n과 m사이의 문자열을 반환, slice와 유사하지만 m,n 순서를 바꾸어도 반환
//음수를 허용하지않는다. 음수는 0으로 인식한다.

console.log(alphabet.substring(2, 5)); //'cde'
console.log(alphabet.substring(5, 2)); //'cde'

//str.substr(n,m)
//n부터 시작, m개를 가져옴(m은 개수)

console.log(alphabet.substr(2, 4)); //'cdef'
console.log(alphabet.substr(-4, 2)); //'de'

//str.trim(): 앞 뒤 공백 제거
let text = " coding          ";
console.log(text.trim()); //"coding"

//str.repeat(n) : n번 반복
let hello = "hello!";
console.log(hello.repeat(4)); //"hello!hello!hello!hello!"

//문자열 비교

console.log(1 < 3); //true
console.log("a" < "c"); //true
//문자의 번호를 얻는 방법 : codePointAt()
console.log("a".codePointAt(0)); //97
//대문자보다 소문자가 크다

//예제1
//책의 목차에서 숫자는 제외하고 글자만 뽑아내기
let list = [
	"01. 들어가며",
	"02. JS의 역사",
	"03. 자료형",
	"04. 함수",
	"05. 배열",
];

let newList = [];

for (let i = 0; i < list.length; i++) {
	newList.push(list[i].slice(4));
}
console.log(newList);
//(5) ['들어가며', 'JS의 역사', '자료형', '함수', '배열']

//예제2
//금칙어 : 콜라
function hasCola(str) {
	if (str.indexOf("콜라") > -1) {
		console.log("금칙어가 있습니다.");
	} else {
		console.log("통과");
	}
}
hasCola("와 사이다가 짱이야!"); //통과
hasCola("무슨소리, 콜라가 최고"); //금칙어가 있습니다.
hasCola("콜라"); //금칙어가 있습니다.

//예제2+
//금칙어 : 콜라
//includes
//문자가 있으면 true
//없으면 false로 반환

function hasCola2(str) {
	if (str.includes("콜라")) {
		console.log("금칙어가 있습니다.");
	} else {
		console.log("통과");
	}
}
hasCola2("와 사이다가 짱이야!"); //통과
hasCola2("무슨소리, 콜라가 최고"); //금칙어가 있습니다.
hasCola2("콜라"); //금칙어가 있습니다.
