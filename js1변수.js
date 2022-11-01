//변수 Variable

//var는 선언하기 전에 사용할 수 있다.
var name;
console.log(name); //undefined
name = "Mike"; //할당
//선언은 hoisting되지만 할당은 hoisting 되지 않는다.
//hoisting - 스코프 내부 어디서든 변수 선언은 최상위에 선언된 것 처럼 행동.
//let은 에러가난다. let const도 hoisting이 된다. 그런데 왜?
//TDZ - Temporal Dead Zone의 영향을 받기때문. 이 영역의 변수들은 할당을 하기전에는 사용할 수 없다. 이는 코드를 예측가능하게 하고 잠재적인 변수를 줄여준다.
//hoisting은 스코프 단위로 일어난다.
let age = 30;
function showAge() {
	console.log(age);
	let age = 20;
}
showAge();
//이코드는 문제가 발생 - 여기서 let이 호이스팅 되지 않는다고 오해한다.
// 함수안의 	let age = 20; 이 호이스팅을 함수 내부에서 일으킨다. 호이스팅이 되지않았다면 함수 바깥에서 선언한 age30이 정상적으로 찍혀야함.
/*
변수의 생성과정
1.선언 단계
2.초기화 단계
3.할당 단계

var 1.선언 및 초기화 단계(동시에 이루어짐)
    2.할당단계
    초기화: undefined를 할당 해주는 단계 

let 3단계가 다 분리되어 있음 초기화 단계는 실제 코드에 도달했을 때 이루어지기때문에 reference에러가 발생하게 되는 것 

const 1.선언+초기화+할당 
*/
let name;
name='Mike'
var age;
age=30;
const gender;
gender="male"; //SyntaxError 선언하면서 바로 할당을 안했기 때문

/*
var: 함수 스코프(function-scoped) 
-함수 내에서 선언한 함수만 그 지역변수가 되는 것, 유일하게 벗어날 수 없는 스코프가 함수라고 생각하면 된다. 
let,const: 블록 스코프(block-scoped) 
-함수, if문, for문, while문, try/catch문 등
*/
if(age>19){
  var txt="성인";
}
console.log(txt); //성인, 함수단위기때문에 var는 가능.