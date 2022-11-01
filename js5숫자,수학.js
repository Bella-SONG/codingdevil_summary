//숫자, 수학 method (Number, Math)

//toString()
//10진수를 2진수/16진수로(라고 하는데 다른 진수도 가능한것 같다.)

let num = 10;
console.log(num.toString()); //'10'
console.log(num.toString(2)); //'1010'
console.log(num.toString(4)); //'22'

let num2 = 255;
console.log(num2.toString(16)); //ff

//Math

//Math.PI : 원주율
console.log(Math.PI); //원주율
let num3 = 5.1;
let num4 = 5.7;

//Math.ceil(): 올림
console.log(Math.ceil(num3)); //6
console.log(Math.ceil(num4)); //6
//Math.floor(): 내림
console.log(Math.floor(num3)); //5
console.log(Math.floor(num4)); //5
//Math.round(): 반올림
console.log(Math.round(num3)); //5
console.log(Math.round(num4)); //6

//소숫점 자릿수
let userRate = 30.1234;
//요구사항: 소숫점 둘째자리 까지 표현(셋째자리에서 반올림)

//첫번쨰 방법
console.log(Math.round(userRate * 100) / 100); //30.12
//두번째 방법
console.log(userRate.toFixed(2));
//'30.12'

//만약에 0이나 소숫점자리개수보다 큰 수를 넣었을때
console.log(userRate.toFixed(0)); //'30'
console.log(userRate.toFixed(6)); //'30.123400'
//편리하나 toFixed를 사용할 때 주의해야 하는 점이 있다.
//foFixed는 문자열을 반환한다. 따라서
console.log(Number(userRate.toFixed(2)));
//문자를 받은 후 숫자로 변환 후 작업하는 경우가 많다.

//isNaN()
//NaN인지 아닌지 판단해주는 유일한 방법.

let x = Number("x"); //NaN
console.log(x); //NaN
//여기서 NaN은 신기하게도 자기자신과도 똑같지않다고 판단한다.
console.log(x == NaN); //false
console.log(x === NaN); //false
console.log(NaN == NaN); //false
//isNaN만이 NaN인지 아닌지 판단할 수 있다.
console.log(isNaN(x)); //true
console.log(isNaN(3)); //false

//parseInt()
//문자열을 순자로 반환해 준다.
//Number와의 차이점: 문자가 혼용되어 있어도 동작한다.
//읽을 수 있는 부분까지는 읽고 문자를 만나면 숫자를 반환한다.

let margin = "10px";
console.log(parseInt(margin)); //10
console.log(Number(margin)); //NaN

let redColor = "f3";
console.log(parseInt(redColor)); //NaN
//그렇지만 두번째 인수를 받아서 진수를 지정할 수도 있다.
console.log(parseInt(redColor, 16)); //243
//redColor를 16진수로 바꾸고 10진수로 바꿔줌
console.log(parseInt("11", 2)); //3
//2진수를 10진수로 바꿀 수 있다.

//parseFloat()
//문자열을 부동 소숫점 숫자(float point number)를 반환한다.

let padding = "18.5%";
console.log(parseInt(padding)); //18
console.log(parseFloat(padding)); //18.5

//Math.random()
//0~1 사이에 무작위 숫자를 생성한다.

//1~100사이 임의의 숫자를 뽑고 싶다면?
Math.floor(Math.random() * 100) + 1;
//최소값이 1이므로 마지막에 1을 더해준다

//Math.max() / Math.min() 최대값/최소값
console.log(Math.max(1, 4, -1, 5, 110, 9, 5.54)); //10
console.log(Math.min(1, 4, -1, 5, 110, 9, 5.54)); //-1

//Math.abs() 절대값 abs:absolute
console.log(Math.abs(-1)); //1

//Math.pow(n,m) 제곱 pow:power
console.log(Math.pow(2, 10)); //1024

//Math.sqrt() 제곱근 sqrt:square root
console.log(Math.sqrt(16)); //4

//쇼핑몰 통계 지표 등에 절대 빠질 수 없는 것들
