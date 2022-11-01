//배열 메소드2 array method2

//arr.sort() / arr.reduce()

//arr.sort() : 배열을 재정렬 해준다
//주의: 배열 자체가 변경됨
//인수로 정렬 로직을 담은 함수를 받는다.

let arr = ["a", "c", "e", "b", "d"];

arr.sort();
console.log(arr);
//['a', 'b', 'c', 'd', 'e']

let arr2 = [27, 8, 5, 13];
arr2.sort();
console.log(arr2);
//[13, 27, 5, 8]
//문자열로 인식하기 때문이다.
//제대로 정렬하려먼, 값을 비교해줄 수 있는 함수를 전달해 줘야한다. sort는 함수를 인수로 받는다.

// 방법1
function fn(a, b) {
	return a - b;
}
arr2.sort(fn);
console.log(arr2);
// [5, 8, 13, 27]

// 방법2
arr2.sort((a, b) => {
	return a - b;
});
console.log(arr2);
// [5, 8, 13, 27]

//어떻게 이루어지는지
let arr3 = [27, 8, 5, 13];
arr3.sort((a, b) => {
	console.log(a, b);
	//a랑 b랑 비교해서 더 작은 숫자를 앞으로 보낸다.
	/*
  8 27 -> [8, 27, 5, 13]
  5 8 -> [5, 8, 27, 13]
  13 5 -> [5, 8, 27, 13]
  13 8 -> [5, 8, 27, 13]
  13 27 -> [5, 8, 27, 13]
  */
	return a - b;
});
console.log(arr2);
//어렵기 때문에 보통은 'Lodash'같은 라이브러리를 사용한다.
//_.sortBy(arr);하면 원하는 대로 정렬을 해준다.(Lodash 라이브러리에서)

//arr.reduce() :
//인수를 함수로 받음
//(누적 계산값, 현재값) => { return 계산값 };

//예제1
//배열의 모든 수 합치기

let arr4 = [1, 2, 3, 4, 5];

//for, for of, forEach

let result = 0;
arr4.forEach(num => {
	result += num;
});

console.log(result);
//15

//이작업을 한번에 처리해줄 수 있는 것이 reduce
//배열을 돌면서 원하는 작업을 하고 최종값을 반환한다.

const result2 = arr4.reduce((prev, cur) => {
	// console.log(prev, cur);
	return prev + cur;
}, 0);
//prev 계산된 값, 누적된 계산된 값(이전값이 아니라 현재까지 누적된 계산값이라고 생각해야한다.) - 값을 계속 누적하여 갖고 있는 누산기 - reduce 함수를 수행하면서 생기는 값을 임시적으로 보관하는 형태
//cur 현재값
//0 초기값 - 초기값은 없어도 됨, 안쓰게되면 배열의 첫번째 값이 들어간다.
console.log(result2); //15

/* 원리
상단에 console.log(prev, cur);을 보면 알수 있는데
0 1 (초기값 0 에서 시작 현재값 1이 더해지고 한바퀴 돈다)
1 2 (누적된 계산값1에서 현재값 2가 더해지고 한바퀴 돈다)
3 3 (누적된 계산값3에서 현재값 3이 더해지고 한바퀴 돈다)
6 4 (누적된 계산값6에서 현재값 4가 더해지고 한바퀴 돈다)
10 5 (누적된 계산값10에서 현재값 5가 더해지고 한바퀴 돈다)
15 (총 누적된값 15 현재값 없으니 리턴)
*/
//만약에 초기값을 다른 숫자로 바꾸게된다면
const result3 = arr4.reduce((prev, cur) => {
	// console.log(prev, cur);
	return prev + cur;
}, 100);

console.log(result3); //115 초기값100 + 계산값

//예제2
//map이나 filter대신 reduce를 사용해서 배열을 반환

let userList = [
	{ name: "Mike", age: 30 },
	{ name: "Tom", age: 10 },
	{ name: "Jane", age: 27 },
	{ name: "Bella", age: 15 },
	{ name: "Henry", age: 42 },
	{ name: "Jamie", age: 60 },
	{ name: "Steve", age: 37 },
];

let result4 = userList.reduce((prev, cur) => {
	if (cur.age > 19) {
		prev.push(cur.name);
	}
	return prev;
}, []);
//초기값은 빈 배열 - 누산값: []
//만약에 현재값의 나이가 19초과면 배열에 이름값을 푸시해주고 리턴.
//만약에 나이가 19살 이하라면 이작업이 실행되지 않을 것이고 그대로 리턴.
console.log(result4);
//(5) ['Mike', 'Jane', 'Henry', 'Jamie', 'Steve']

// 위의 예제에서 나이의 합을 구하려면
let result5 = userList.reduce((prev, cur) => {
	return (prev += cur.age);
}, 0);
console.log(result5);
//221

// 위의 예제에서 이름의 글자수가 5글자인 사람만 찾아보기
let result6 = userList.reduce((prev, cur) => {
	if (cur.name.length === 5) {
		prev.push(cur.name);
	}
	return prev;
}, []);
console.log(result6);
//(4) ['Bella', 'Henry', 'Jamie', 'Steve']

//상황에 맞게 잘골라서 쓰는것도 실력이기에 filter를 쓸지, map을 쓸지, forEach를 쓸지 reduce를 쓸지 각 상황에 맞게 잘 골라야 한다.

// arr.reduceRight(); reduce와 동일하나 배열 오른쪽부터 연산을 한다는 차이점이 있다.
//웬만한 분리 조합, 계산, 축약 등의 기능은 리듀스로 처리하는게 굉장히 깔끔해진다. 일반적인 조건문만 구현된다면 매우 깔끔한 코드가 될 수 있기에 적재적소에 사용하는 것을 추천
