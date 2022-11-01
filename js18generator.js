/* Generator */
//함수의 실행을 중간에 멈췄다가 재개할 수 있는 기능
//function옆에 *를 써서 만들고 내부에 yield 키워드를 사용한다.
//yield에서 함수의 실행을 멈출 수 있다.
/*
function* fn() {
	yield 1;
	yield 2;
	yield 3;
	return "finish";
}
const a = fun();
*/

function* fn() {
	console.log(1);
	yield 1;
	console.log(2);
	yield 2;
	console.log(3);
	console.log(4);
	yield 3;
	return "finish";
}

const a = fn();
console.log(a);
/*
a를 콘솔창에 찍어보면
fn {<suspended>} 아직 함수가 실행되지 않았음 
*/
console.log(a.next());
/*
1
{value: 1, done: false} 

a.next를 호출하면 가장 가까운 yield문을 만날때까지 실행되고 데이터객체를 반환한다. 그래서 로그로찍은 1이 나온다.

반환된 데이터객체는 value와 done프로퍼티를 가진다.
value - yield오른쪽에 있는 값, 만약 값을 생략하면 undefined
done - 이름그대로 함수코드가 끝났는지 나타내며 실행이 끝났으면 true 아니면 false
*/
console.log(a.next());
/*
2
{value: 2, done: false} 

한번더해보면 2가찍힘 데이터value도 2
*/
console.log(a.next());
/*
3
4
{value: 3, done: false}
*/
console.log(a.next());
/*
{value: 'finish', done: true}

리턴문에 의해서 value는 finish가되었고 done은 true
*/
console.log(a.next());
/*
{value: undefined, done: true}

한번더하면 value는 표현할 것이 없어서 undefined, done은 true
*/

/* next(), return(), throw() */

console.log(a.return("END"));
//{value: 'END', done: true}
//동일한 코드에서 실행하다가 return메소드를 호출하면 그 즉시 done속성값이 true가 된다.
console.log(a.next());
//이후에 next를 실행해도 value값은 얻을수없고 done속성값은 true

//throw도 마찬가지로 done을 true로 바꾼다

function* fn2() {
	try {
		console.log(1);
		yield 1;
		console.log(2);
		yield 2;
		console.log(3);
		console.log(4);
		yield 3;
		return "finish";
	} catch (e) {
		console.log(e);
	}
}

const a2 = fn2();

//try catch문으로 감싸주고
console.log(a2.next());
//{value: 1, done: false}
console.log(a2.next());
//{value: 2, done: false}
console.log(a2.throw(new Error("err")));
//Error: err
//{value: undefined, done: true}
//캐치문에 있는 내용이 실행되고 error로그가 찍히고 done이 트루가된다.
console.log(a2.next());
//{value: undefined, done: true}
//이미 끝났고 아무값도 받을수 없다.

/* Generator */
/* 
Iterable - 반복이가능하다는 의미, 몇가지 조건이 있다.
-Symbol.iterator 메서드가 구현되어 있어야 한다.
-Symbol.iterator 는 iterator 를 반환해야 한다.

Iterator - 메서드를 호출한 결과
-next 메서드를 가진다. (value와 done 프로퍼티를 반환하는 메서드)
-next 메서드는 value와 done 속성을 가진 객체를 반환한다.
-작업이 끝나면 done은 true가 된다.

generator는 iterator 이면서 iterable 이다!?
배열도 분명 반복이 가능한데 배열에서는 저런 애기를 들어보지도 못했다. 확인해보자.
*/
const arr = [1, 2, 3, 4, 5];

const it = arr[Symbol.iterator]();
console.log(it.next());
//{value: 1, done: false}
console.log(it.next());
//{value: 2, done: false}
console.log(it.next());
//{value: 3, done: false}
console.log(it.next());
//{value: 4, done: false}
console.log(it.next());
//{value: 5, done: true}

//배열은 Symbol.iterater메소드를 가지고있고, 이 메소드가 반환하는 값이 itorator 이므로 iterable 하다고 할 수 있다. 배열은 반복가능한 객체이다!

//iterable은 이렇게 for of를 이용해서 순회할 수 있다.
for (let num of arr) {
	console.log(num);
}
// 1 2 3 4 5

//다시 generator 코드로 돌아와서 a3를 살펴보기
function* fn3() {
	yield 4;
	yield 5;
	yield 6;
}
const a3 = fn3();

console.log(a[Symbol.iterator]() === a);
// true
//generator에 Symbol.iterator 메소드를 실행한 값 === 자기자신
// === generator는 iterable한 객체 - 그렇다면 for of를 쓸수 있다.
for (let num of a3) {
	console.log(num);
}
//4 5 6

//for of가 시작되면 이렇게 Symbol.iterator를 호출하고 만약에 없으면 error가 발생한다. 반환된 iterator에 next메소드를 호출하면서 done이 true가 될때 까지 반복한다.

//문자열에서는 어떻게될까.
const str = "hello";
console.log(str[Symbol.iterator]);
//ƒ [Symbol.iterator]() { [native code] }
const xx = str[Symbol.iterator]();
console.log(xx.next()); //{value: 'h', done: false}
console.log(xx.next()); //{value: 'e', done: false}
console.log(xx.next()); //{value: 'l', done: false}
console.log(xx.next()); //{value: 'l', done: false}
console.log(xx.next()); //{value: 'o', done: false}
console.log(xx.next()); //{value: undefined, done: true}

for (let ss of str) {
	console.log(ss);
}
// h e l l o
//문자열도 iterable이다!

//next()에 인수를 전달해보기
function* fn4() {
	const num1 = yield "첫번째 숫자를 입력해주세요";
	console.log(num1);

	const num2 = yield "두번째 숫자를 입력해주세요";
	console.log(num2);

	return num1 + num2;
}

const a4 = fn4();

console.log(a4.next());
// {value: '첫번째 숫자를 입력해주세요', done: false}
console.log(a4.next(2));
// 2
// {value: '두번째 숫자를 입력해주세요', done: false}
console.log(a4.next(4));
// 4
// {value: 6, done: true}
//value는 두 숫자를 더한 값이 나왔고, 더이상 yield가 없으니까 done은 true
//generator는 이렇게 외부로부터 값을 입력받을 수도 있다.

/* Generator는 값을 미리 만들어 두지 않는다 */
//메모리 관리 측면에서 효율적이다.
//필요한 순간에만 연산해서 값을 주기 때문에 이런 코드도 가능하다.

/* while true문을 이용 */
function* fn5() {
	let index = 0;
	while (true) {
		yield index++;
	}
}
const a5 = fn5();
//while true문을 사용해서 무한반복자를 만들어도 브라우저가 뻗지 않는다.
//next를 호출할때마다 값을 주기 때문이다
//generator함수를 사용하지 않았다면 break가 없는 while true문을 사용하면 안된다.
//generator는 필요한 값만 그때그때 생성한다.
//일반적인 함수로 어떤 값을 구할떄, 모든 값을 미리 계산해놔야한다. 그리고 쓸지 안쓸지 정해지지 않는 상황에서도 그 값을 유지해야한다.
//generator를 사용하면 필요한 순간까지 계산을 미룰 수 있다.

/* yield*를 이용 */
function* gen1() {
	yield "w";
	yield "o";
	yield "r";
	yield "l";
	yield "d";
}

function* gen2() {
	yield "hello,";
	yield* gen1(); //반복가능한 모든 객체가 올 수 있다.
	yield "!";
}

console.log(...gen2());
//hello, w o r l d !
//여기서 구조분해할당을 사용했는데 for of와 마찬가지로 done이 true가 될때까지의 값을 펼쳐주는 역할을 한다.

/*
제너레이터는 다른 작업을 하다가 다시 돌아와서 next() 해주면 진행이 멈췄던 부분 부터 이어서 실행할 수 있다.

ex) Redux Saga 에서 활발하게 사용한다.
*/
