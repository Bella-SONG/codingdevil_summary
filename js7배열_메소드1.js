//배열 메소드 array method
/* Array 기초
push(): 뒤에 삽입
Pop(): 뒤에 삭제
unshift(): 앞에 삽입
shift(): 앞에 삭제
*/

// arr.splice(n, m): 특정 요소 지움
//n은 시작 m은 개수

let arr = [1, 2, 3, 4, 5];
arr.splice(1, 2);
console.log(arr); //[1, 4, 5]

//arr.splice(n,m,x): 특정 요소를 지우고 추가

let arr2 = [1, 2, 3, 4, 5];
arr2.splice(1, 3, 100, 200);
console.log(arr2); //[1, 100, 200, 5]
//인덱스번호 1부터 3을 지우고(2, 3, 4) 100과 200을 추가

let arr3 = ["나는", "철수", "입니다"];
arr3.splice(1, 0, "대한민국", "소방관");
//인덱스번호 1부터 0개지운다(=안지운다) 인덱스번호 1이되는 자리에 뒤의 텍스트를 끼워넣는다.
console.log(arr3);
//['나는', '대한민국', '소방관', '철수', '입니다']

//arr.splice(): 삭제된 요소 반환한다.
let arr4 = [1, 2, 3, 4, 5];
let result = arr4.splice(1, 2);

console.log(arr4); //[1, 4, 5]
console.log(result); //[2, 3]

//arr.slice(n, m): n부터 m까지 반환
//m은 포함하지않고 바로 앞까지를 의미하고, m이 없으면 n부터 끝까지를 의미한다.
let arr5 = [1, 2, 3, 4, 5];
console.log(arr5.slice(1, 4)); //[2,3,4]

//arr.concat(arr2, arr3 ..): 합쳐서 새배열 변환
let arr6 = [1, 2];
console.log(arr6.concat([3, 4])); // [1, 2, 3, 4]
console.log(arr6.concat([3, 4], [5, 6])); // [1, 2, 3, 4, 5, 6]
console.log(arr6.concat([3, 4], 5, 6)); // [1, 2, 3, 4, 5, 6]

//arr.forEach(fn): 배열 반복
//forEach는 함수를 인수로 받는다.

/*
let users = ["Mike", "Tom", "Jane"];
users.forEach((item, index, arr) => {
  //.....
});
item - Mike, Tom, Jane.. 해당요소
index - 인덱스 
arr - users 해당배열 자체

보통 첫번쨰와 두번째만 사용한다
*/
let arr7 = ["Mike", "Tom", "Jane"];
arr7.forEach((name, index) => {
	console.log(`${index + 1}. ${name}`);
});
/*
1. Mike
2. Tom
3. Jane
*/

//arr.IndexOf / arr.lastIndexOf
let arr8 = [1, 2, 3, 4, 5, 1, 2, 3];
console.log(arr8.indexOf(3)); //2
//해당 요소가 있으면 해당요소의 인덱스번호를 반환, 없으면 -1
console.log(arr8.indexOf(3, 3)); //7
//이렇게 인수가 두개인 경우 두번째 인수는 시작 위치.
//숫자 4부터 시작하게되므로 마지막3의 인덱스번호가 반환
console.log(arr8.lastIndexOf(3)); //7

//arr.includes(): 포함하는지 여부를 확인 (boolean값으로 반환)
let arr9 = [1, 2, 3];
console.log(arr.includes(2)); //true
console.log(arr.includes(8)); //false

//arr.find(fn) / arr.findIndex(fn)
//indexof처럼 찾는다는 의미는 동일하지만, 보다 복잡한 연산이 가능하도록 함수를 전달할 수 있다. 짝수를 찾아낸다던지, 성인을 찾아낸다던지..etc
//주의 - 첫번째 true값만 반환하고 끝, 만약 없으면 undefined를 반환한다.
//findIndex는 해당 인덱스를 반환한다. 없으면 -1을 반환한다.

//짝수찾기
let arr10 = [1, 2, 3, 4, 5];
const result2 = arr10.find(item => {
	return item % 2 === 0;
});
console.log(result2); //2
//왜냐하면 첫번째 true값만 반환한다.

//find / findIndex
let userList = [
	{ name: "Mike", age: "30" },
	{ name: "Jane", age: "27" },
	{ name: "Bella", age: "10" },
];

const result3 = userList.find(user => {
	if (user.age < 19) {
		return true;
	}
	return false;
});

console.log(result3);
//{name: 'Bella', age: '10'}

const result4 = userList.findIndex(user => {
	if (user.age < 19) {
		return true;
	}
	return false;
});

console.log(result4);
//2

// arr.filter(fn) : 만족하는 모든 요소를 배열로 반환

let arr11 = [1, 2, 3, 4, 5, 6];
const result5 = arr11.filter(item => {
	return item % 2 === 0;
});
console.log(result5); //(3) [2, 4, 6]

//arr.reverse(): 배열을 역순으로 재정렬해준다.
//최근 가입된 유저부터 보여준다거나, 게시판에서 가장 최근 작성된 글 순서부터 보여줄 때 사용된다.
let arr12 = [1, 2, 3, 4, 5];
console.log(arr12.reverse()); //(5) [5, 4, 3, 2, 1]

//arr.map(fn)
//함수를 받아 특정 기능을 시행하고 새로운 배열을 반환해주는 메소드

let userList2 = [
	{ name: "Mike", age: "30" },
	{ name: "Jane", age: "27" },
	{ name: "Bella", age: "10" },
];

let newUserList = userList2.map((user, index) => {
	return Object.assign({}, user, {
		isAdult: user.age > 19,
	});
});

console.log(newUserList);
/*
(3) [{…}, {…}, {…}]
0: {name: 'Mike', age: '30', isAdult: true}
1: {name: 'Jane', age: '27', isAdult: true}
2: {name: 'Bella', age: '10', isAdult: false}
length: 3
[[Prototype]]: Array(0)
*/
let newUserList2 = userList2.map((user, index) => {
	return Object.assign({}, user, {
		id: index + 1,
		isAdult: user.age > 19,
	});
});
console.log(newUserList2);
/*
(3) [{…}, {…}, {…}]
0: {name: 'Mike', age: '30', id: 1, isAdult: true}
1: {name: 'Jane', age: '27', id: 2, isAdult: true}
2: {name: 'Bella', age: '10', id: 3, isAdult: false}
length: 3
[[Prototype]]: Array(0)
*/
console.log(userList);
/*
(3) [{…}, {…}, {…}]
0: {name: 'Mike', age: '30'}
1: {name: 'Jane', age: '27'}
2: {name: 'Bella', age: '10'}
length: 3
[[Prototype]]: Array(0)
*/
//기존에 있던 userList은 변한것이 없다.
//실무에서 정말 많이 사용되니까 연습을 해두어야 한다.

//join, split
//join() : 배열을 합쳐서 문자열을 만들때 사용

let arr13 = ["안녕", "나는", "철수야"];

let result6 = arr13.join();
let result7 = arr13.join("");
let result8 = arr13.join("    ");
let result9 = arr13.join("-");

console.log(result6); //안녕,나는,철수야
console.log(result7); //안녕나는철수야
console.log(result8); //안녕    나는    철수야
console.log(result9); //안녕-나는-철수야

//split() : 문자열을 나눠서 배열로 만들어 준다.

const users = "Mike, Jane, Tom, Bella, Jamie";
const result10 = users.split(",");
//쉼표기준으로 나누어준것
console.log(result10);
//(5) ['Mike', ' Jane', ' Tom', ' Bella', ' Jamie']

let str = "Hello, My name is Mike.";
const result11 = str.split("");
console.log(result11);
//(23) ['H', 'e', 'l', 'l', 'o', ',', ' ', 'M', 'y', ' ', 'n', 'a', 'm', 'e', ' ', 'i', 's', ' ', 'M', 'i', 'k', 'e', '.']

//Array.isArray() : 배열인지 아닌지 확인해주는 메소드
//자바스크립트에서 배열은 객체형에 속하기 때문에, typeof는 객체라고 알려준다. 일반 객체와 구분할 수 없다.
let user = {
	name: "Mikee",
	age: 30,
};
let userList3 = ["Mike", "Tom", "Jane"];

console.log(typeof user); //object
console.log(typeof userList3); //object

console.log(Array.isArray(user)); //false
console.log(Array.isArray(userList)); //true
