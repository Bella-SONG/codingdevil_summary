//클로저 Closure
//자바스크립트는 어휘적 환경을 갖는다.

//어휘적 환경 Lexical Environment

//예시1

// <-step1
let one; // <-step2
one = 1; // <-step3

function addOne(num) {
	console.log(one + num); //6
}
addOne(5);
//코드가 실행되면 스크립트 내에서 선언한 변수들이 Lexical 환경에 올라간다.
/* step1.

Lexical 환경
one : 초기화X (사용 불가)
addOne : function (사용 가능)

- let으로 선언한 함수들도 hoisting이 된다는 것을 잊지 말 것. Lexical환경으로는 올라가지만 초기화가 안되어 있을 뿐이다. 그래서 사용을 못한다.
- 그에비해 함수 선언문은 변수와 달리 바로 초기화 된다. 그래서 저 위치에서도 바로 사용이 가능하다. 
- 변수에 할당한 함수표현식은 사용이 가능하지 않다.
 */

/* step2.
let one;을 만났을때.

Lexical 환경
one : undefined (사용 가능)
addOne : function

- one 에 아직 할당은 안되어 있기때문에 초기값 undefined를 갖는다. 이제 사용을해도 에러는 갖지 않는다. 값이 undefined일 뿐.
 */

/* step3.
one = 1;이 할당되었을 떄.

Lexical 환경 - 전역Lexical 환경
one: 1
addOne : function
-one에 1이 할당되면, 함수선언은 초기에 이미 완료되었고 이제 마지막 라인으로 가서(addOne(5);) 함수가 실행된다. 그순간 새로운 Lexical환경이 만들어진다.

새로운 Lexical 환경 - 내부Lexical 환경 (from addOne(5))
num : 5

-새로운 환경에는 함수가 넘겨받은 매개변수와 지역변수들이 저장된다. 함수가 호출 되는 동안 함수에서 만들어진 내부 Lexical 환경과 외부에서 받은 전역 Lexical 환경 두개를 가지게 된다. 
-내부 Lexical 환경은 외부 Lexical 환경에 대한 참조를 갖는다. 지금은 저 함수의 외부 Lexical 환경이 전역lexical 환경이다. 
-코드에서 변수를 찾을 때 내부에서 먼저찾고, 없으면 외부, 거기에서도 없으면 전역Lexical 환경까지 범위를 넓혀서 찾는다.
  ->이 코드에서 one과 num은 내부 lexical환경에서 우선적으로 찾는다. num은 찾았지만 one이 없다, 이러면 외부로 넓혀서 찾게된다. 외부에서 찾았으니 더해줄 수 있다.

<마지막 상태>
Lexical 환경 - 전역Lexical 환경
one: 1
addOne : function

⬆ 참조

새로운 Lexical 환경 - 내부Lexical 환경 (from addOne(5))
num : 5

 */

//예시2
//add 함수를 만들어주는 makeAdder

// <- step1
function makeAdder(x) {
	return function (y) {
		return x + y;
	};
}
const add3 = makeAdder(3); //<- step2
console.log(add3(2)); //<- step3 //5
/* step1.
//최초실행시 makeAdder함수와 변수 add3은 전역Lexical 환경에 들어간다.

전역 Lexical 환경
makeAdder : function
add3 : 초기화x 사용불가
*/
/* stpe2.
const add3 = makeAdder(3); (75번째줄) 이 실행될때 makeAdder함수가 실행되고, makeAdder함수의 Lexical환경이 만들어진다. 여기서 전달받은 x의 값이 들어간다. 
-함수의 Lexical환경에는 넘겨받은 매개변수와 지역변수들이 저장된다. 
-전역 Lexical 환경에 있던 add3은 함수가 실행되었으니 return 하는 함수가 된다.

전역 Lexical 환경
makeAdder : function
add3 : function

makeAdder Lexical 환경
x : 3
*/
/* step3
 이제 console.log(add3(2)); (76번째줄)을 실행한다.
 add3을 실행하면 
 	return function (y) {
		return x + y;
	};
 이 함수(71번째줄)가 실행하되는데 이때 또 Lexical 환경이 만들어진다. 이번엔 y가 2로 들어간다.

<현상태>
전역 Lexical 환경
makeAdder : function
add3 : function

⬆ 참조

makeAdder Lexical 환경
x : 3

⬆ 참조

익명함수 Lexical 환경
y : 2

이제 x+y 를 해보면
1.처음에는 '익명함수 Lexical 환경'에서 x와 y를 찾는다. (y 발견) x는 없음
2.두번째로 참조하는 'makeAdder Lexical 환경'으로가서 x를 찾는다. (x 발견)
*/

/*
정리

function makeAdder(x) {
	return function (y) { //1.이 함수는 y를 가지고있고 상위함수인 makeAdder의 x에 접근이 가능하다.
		return x + y;
	};
}
onst add3 = makeAdder(3); 
console.log(add3(2)); //5, 2.add3 함수가 생성된 이후에도 변함없이 상위함수로 호출할 때 사용했던 makeAdder의 x에 접근이 가능하다.
이런 것을 'Closure' 라고 한다. 

Closure -  함수와 그 함수의 렉시컬 환경의 조합
함수가 생성될 당시의 외부 변수를 기억하고, 생성된 이후에도 그 변수에 계속 접근이 가능한 기능.
외부함수의 실행이 끝나서 외부함수가 소멸된 이후에도, 내부함수가 외부함수의 변수에 접근할 수 있다.
*/

const add10 = makeAdder(10);
console.log(add10(5)); //15
console.log(add3(1)); //4
/*
이것을 보면 makeAdder에 10이 호출이 되었지만 add3은 아무런 변화가 없다.
add10과 add3은 서로 다른 환경을 가지고 있는 것.

내 생각
add3의 makeAdder Lexical 환경
x : 3

add10의 makeAdder Lexical 환경
x : 10 

 */

//예시3.

function makeCounter() {
	let num = 0; //은닉화

	return function () {
		return num++;
	};
}

let counter = makeCounter();

console.log(counter()); //0
console.log(counter()); //1
console.log(counter()); //2
/*
counter에 makeCounter가 return하는 함수 (162번째 줄)
function () {
		return num++;
	};
  이 함수를 넣었다.
  이함수를 숫자를 반환하는데 외부함수의 변수이다. 실행하면 초기값 0부터 1씩 증가한 값이 나온다. 
  내부함수(익명함수 162번째 줄)에서 외부함수(makeCounter, 159번째줄)의 변수 num에 접근하는 것.
  이렇게 생성된 이후에 계속 기억하고 있는 것.

  Q. counter에 찍힌 숫자들을 수정할수있을까?
  A. 불가능하다. 오직 counter를 증가시키고 반환 받는다. (은닉화에 성공한 것), 갑자기 99로 바꾸거나 100씩 증가하거나 하는 것은 불가능하다.
*/

if (8 > 10) {
	console.log("hi");
} else if (8 < 10) {
	console.log("hello");
} else {
	console.log("bye");
}
