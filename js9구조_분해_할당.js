// 구조 분해 할당 Destructuring assignment
// 배열이나 객체의 속성을 분해해서 그 값을 변수에 담을 수 있게 하는 표현식

//배열 구조 분해
let [x, y] = [1, 2];
console.log(x); //1
console.log(y); //2

//예제
let users = ["Mike", "Tom", "Jane"];
let [user1, user2, user3] = users;
/*
11번째줄의 이코드는
let user1 = users[0];
let user2 = users[1];
let user3 = users[2]; 와 똑같다
*/
console.log(user1); //"Mike"
console.log(user2); //"Tom"
console.log(user3); //"Jane"

//저번에 문자열 메소드에서 봤던 split방식을 이용해도 된다.
let str = "Mike-Tom-Jane";
let [user4, user5, user6] = str.split("-");
//console.log(str.split("-"));
//(3) ['Mike', 'Tom', 'Jane']

console.log(user4); //"Mike"
console.log(user5); //"Tom"
console.log(user6); //"Jane"

//배열 구조 분해 : 기본값
// let [a, b, c] = [1, 2];
//바로 위에서 해당하는 값이 없는 c에는 undefined가 들어간다.
//이럴때 기본값을 주면 에러를 미연에 방지할 수 있다.(undefined인 상황에서 기본값을 사용한다.)

let [a = 3, b = 4, c = 5] = [1, 2];
console.log(a); //1
console.log(b); //2
console.log(c); //5
//a와 b는 배열에서 온 값으로 바뀌고, c는 기본값을 유지한다.

//배열 구조 분해 : 일부 반환값 무시
let [userA, , userB] = ["Mike", "Tom", "Jane", "Bella"];

console.log(userA); //"Mike"
console.log(userB); //"Jane"
//사이의 공백으로인해 두번째 요소는 생략되었다. 할당 받는 값이 없다는 것. 4번째도 사용하는 곳이 없으므로 무시됨.

//배열 구조 분해 : 바꿔치기

let d = 1;
let e = 2;
//여기서 d와 e를 바꿔치기 하려면 어떻게 해야할까?
//d = e를 해버리면 둘다 2가 되어버린다.
//방법
let f = d;
//새로운 f라는 의미없는 임시변수를 하나만든다.
d = e;
e = f;
//이럴 때 구조분해 할당은 굉장히 편리하다.

[d, e] = [e, d];
//더이상 임시변수는 필요없다.

//객체 구조 분해

let user7 = { name: "Mike", age: 30 };
let { name, age } = user7;
/*
바로위의 코드(69번째줄)는
let name = user7.name;
let age = user7.age;
와 같다. 한가지 다른점이 있다면, 순서를 신경쓰지 않아도 된다는 점이다.
let { age, name} = user7도 동일하게 동작한다.
*/
console.log(name); //"Mike"
console.log(age); //30

//객체 구조 분해 : 새로운 변수 이름으로 할당
let { name: userName, age: userAge } = user7;
console.log(userName); //"Mike"
console.log(userAge); //30

//객체 구조 분해 : 기본값
let user8 = { nameUser: "Bella", ageUser: "25" };
// let { nameUser, ageUser, gender } = user8;
//지금 gender변수에는 아무것도 해당되는 것이 없어서 undefined가 들어간다.
//이럴때 배열과 같이 기본값을 지정해 주면 된다.
let { nameUser, ageUser, gender = "female" } = user8;
console.log(gender); //female
//객체로 부터 받은 값이 undefined일 때에만 기본값이 사용된다는것을 기억할 것!
