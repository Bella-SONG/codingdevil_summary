//심볼 symbol

// 지금까지의 property key:문자형
const obj = {
	1: "1입니다",
	false: "거짓",
};
Object.keys(obj); //["1","false"]
console.log(Object.keys(obj));
console.log(obj["1"]); //'1입니다'
console.log(obj[false]); //'거짓'

//객체 프로퍼티키는 문자형이 가능한데 하나더 심볼형도 가능하다.
const a = Symbol(); //new를 붙이지 않는다
const b = Symbol();
//유일한 식별자를 만들 때 사용한다, 유일성이 보장된다!!
console.log(a == b); //false
console.log(a === b); //false

const id = Symbol("id");
//이렇게 설명을 붙여줄 수도있다. 설명을 붙여줄 시 디버깅할때 편하다고 함.
const id2 = Symbol("id");
console.log(id); //Symbol(id)
console.log(id2); //Symbol(id)
console.log(id == id2); //false
console.log(id === id2); //false

const user = {
	name: "Mike",
	age: 30,
	[id]: "myid",
};
console.log(user);
//{name: 'Mike', age: 30, Symbol(id): 'myid'}
console.log(Object.keys(user)); //['name', 'age']
console.log(Object.values(user)); //['Mike', 30]
console.log(Object.entries(user)); //[Array(2), Array(2)]
//이런것들은 키가 symbol형인 property들은 건너뛴다.for in도 마찬가지.
for (let a in user) {
}
//특정 객체에 원본 데이터는 건드리지않고 속성을 추가할 수가 있다.

//Symbol.for(): 전역 심볼

//Symbol은 이름이 같더라도 다른 존재, 그런데 가끔 이름이 같으면 같은 객체를 가르쳐야 할 때가 있다. 전역변수처럼.
/*
-하나의 심볼만 보장받을 수 있다.
-없으면 만들고, 있으면 가져오기 때문
-Symbol 함수는 매번 다른 Symbol 값을 생성한다.
-Symbol.for 메소드는 하나를 생성한 뒤 키를 통해 같은 Symbol을 공유한다
-코드 어디에서든 사용할 수 있다.
*/
const id3 = Symbol.for("id");
const id4 = Symbol.for("id");
console.log(id3 === id4); //true
console.log(Symbol.keyFor(id3)); //'id'
//이름을 얻고싶으면 Symbol.keyFor 을 사용. 전역심볼이 아닌 심볼은 사용할 수 없다.
console.log(id2.description); //'id'
//그냥 심볼은 변수명.description을 사용한다.

//숨겨진 Symbol key보는 법

console.log(Object.getOwnPropertySymbols(user)); //[Symbol(id)]
//Object.getOwnPropertySymbols(); 심볼만 볼수있다
console.log(Reflect.ownKeys(user)); // ['name', 'age', Symbol(id)]
//Reflect.ownKeys(); 심볼형 키를 포함한 객체의 모든 키를 보여준다.

//예시
//다른 개발자가 만들어 놓은 객체
const profile = {
	name: "Bella",
	age: 29,
};
// 내가 작업
// profile.showName = function () {};
const showName = Symbol("show name");
profile[showName] = function () {
	console.log(this.name);
};
profile[showName]();
//사용자가 접속하면 보는 메세지
for (let key in profile) {
	console.log(`His ${key} is ${profile[key]}`);
}
//His name is Bella
//His age is 29
