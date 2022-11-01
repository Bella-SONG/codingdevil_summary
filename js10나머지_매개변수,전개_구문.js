//나머지 매개변수, 전개 구문 Rest parameters, Spread syntax
//... 이렇게 점 세개로 사용한다

function showName(name) {
	console.log(name);
}
showName("Mike"); //"Mike"
showName("Mike", "Tom"); //"Mike"
//에러가 찍히지않고 "Mike"만 찍힘
//자바스크립트에서 함수의 인수는 제약이 없다.
showName(); //에러가 나지않고 Undefined가 찍힌다.

/*
함수의 인수를 얻는 방법
1.arguments로 접근하는 방법
2.나머지 매개 변수의 사용 - 현추세 (결정적으로 화살표함수에는 arguments가 없다)
*/

//arguments
/*
-함수로 넘어 온 모든 인수에 접근할수 있다.
-함수 내에서 이용 가능한 지역 변수
-length / index 가 있어서 배열이라고 생각할 수 있겠지만,
-Array 형태의 객체이다. - length/index등의 속성은 가지고 있으나 배열의 내장 메서드 없음 (forEach, map 같은건 사용 불가)
*/
//첫번째방법
function showName2(name) {
	console.log(arguments.length);
	console.log(arguments[0]);
	console.log(arguments[1]);
}
showName2("Mike", "Tom");
//2
//"Mike"
//"Tom"

//ES6 이상 사용가능한 환경에서는 가급적 나머지 매개변수를 권장한다.

function showName3(...names) {
	console.log(names);
}
showName3(); //[]
showName3("Mike"); //['Mike']
showName3("Mike", "Tom"); //(2) ['Mike', 'Tom']

//나머지 메개변수는 정해지지 않은 개수의 인수를 배열로 나타낼 수 있게 한다.
//매개변수 앞에 ...으로 사용한다
//아무것도 전달하지않으면 undefined가 아니라 빈배열을 나타낸다.

//예제 - 나머지 매개변수
//어떤 함수가 있는데 전달 받은 모든 수를 더해야 한다.
//첫번째 방법 forEach
function add(...numbers) {
	let result = 0;
	numbers.forEach(num => (result += num));
	console.log(result);
}
add(1, 2, 3); //6
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); //55
//...numbers는 배열이고, 인수가 있기 때문에 for문으로 사용해도 된다. argument와 다르게 배열의 메소드들도 사용 할 수 있다. reduce같은것도 사용할 수 있겟죠/

//두번째 방법 reduce
function add2(...numbers) {
	let result2 = numbers.reduce((prev, cur) => prev + cur);
	console.log(result2);
}

add2(1, 2, 3); //6
add2(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); //55

//예제2 - 나머지 매개변수
//user 객체를 만들어 주는 생성자 함수를 만들기

function User(name, age, ...skills) {
	this.name = name;
	this.age = age;
	this.skills = skills;
}
//사람마다 스킬의 개수는 다를 것이기 때문에 나머지매개변수로 넣어주었다.

const user1 = new User("Mike", 30, "html", "css");
const user2 = new User("Tom", 20, "JS", "React");
const user3 = new User("Bella", 27, "English");

console.log(user1); //User {name: 'Mike', age: 30, skills: Array(2)}
console.log(user2); //User {name: 'Tom', age: 20, skills: Array(2)}
console.log(user3); //User {name: 'Bella', age: 27, skills: Array(1)}
//앞의 두개의 인수는 일반적인 변수로 받았고, 그외의 인수들은 몇개가 들어올지 모르지만 나마지 매개변수로 받았다.
//주의! 나머지 매개변수는 항상 마지막에 위치해야 한다!

//전개 구문(Spread syntax) : 배열

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let result = [...arr1, ...arr2];
//...arr1 은 1,2,3을 풀어서 쓴것, ...arr2도 마찬가지 방식.

console.log(result); //(6) [1, 2, 3, 4, 5, 6]

let result2 = [0, ...arr1, ...arr2, 7, 8, 9];
console.log(result2); //(10) [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
//중간에 쓰는 것도 가능하다.
//원래 배열에 넣고 중간에 빼고, 병합하고 하는 작업들은 굉장히 번거롭다.
//ex)arr.push() / arr.splice() / arr.concat()..etc
//그런데 전개구문을 사용하면 쉽게 알 수 있다.

//전개 구문(Spread syntax) : 객체

let user = { name: "Mike" };
let Mike = { ...user, age: 30 };
console.log(Mike); //{name: 'Mike', age: 30}

//전개 구문(Spread syntax) : 복제

let arrA = [1, 2, 3];
let arrB = [...arrA]; //[1, 2, 3]
//Object.assign을 쓸 필요가 없다.

let userA = { name: "Mike", age: "30" };
let userB = { ...userA };

userB.name = "Bella";

console.log(userA.name); //"Mike"
console.log(userB.name); //"Bella"
//별개의 userB로 복제되었다는 뜻

//예제 - 전개 구문 배열
// arr3을 [4,5,6,1,2,3] 으로 바꾸기

let arr3 = [1, 2, 3];
let arr4 = [4, 5, 6];

//전개 구문을 사용하지 않는 방법 - forEach 방법
/*
arr4.forEach(num => {
	arr3.unshift(num);
});

console.log(arr3);
//(6) [6, 5, 4, 1, 2, 3] 
*/
//제대로 안된다. 제대로 하는방법
//앞에 reverse를 넣어준다.
arr4.reverse().forEach(num => {
	arr3.unshift(num);
});

console.log(arr3); //(6) [4, 5, 6, 1, 2, 3]

//전개구문 방법
let arr5 = [1, 2, 3];
let arr6 = [4, 5, 6];
arr5 = [...arr6, ...arr5];
console.log(arr5); //(6) [4, 5, 6, 1, 2, 3]

//예제 - 전개 구문 객체
//userX에 info를 넣고 fe와 lang은 묶어서 skill로
let userX = { name: "Bella" };
let info = { age: 27 };
let fe = ["JS", "React"];
let lang = ["Korean", "English"];

//전개구문 사용하지않는 방법  - Object.assign()
/*
userX = Object.assign({}, user, info, {
	skills: [],
});

fe.forEach(item => {
	userX.skills.push(item);
});
lang.forEach(item => {
	userX.skills.push(item);
});
*/

//전개구문을 사용하는 방법
userX = {
	...userX,
	...info,
	skills: [...fe, ...lang],
};

console.log(userX);
//{name: 'Bella', age: 27, skills: Array(4)}
/*
age: 27
name: "Mike"
skills: (4) ['JS', 'React', 'Korean', 'English']
[[Prototype]]: Object
*/
