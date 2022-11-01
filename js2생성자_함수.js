//생성자 함수

function User(name, age) {
	this.name = name;
	this.age = age;
}
let user1 = new User("Mike", 30);
let user2 = new User("Amy", 22);
let user3 = new User("Bella", 17);
//함수명 첫글자는 대문자로 한다 (관례)
//호출할 때에는 new연산자를 사용해서 호출한다.
//생성자함수는 붕어빵틀이나 와플팬이라고 생각하면된다, 필요한 재료들을 적어주고 틀에 찍어내면 된다.
/*
function User(name, age) {
	//this={}
	this.name = name;
	this.age = age;
	//return this;
}
new 함수명();
*/
function User2(name, age) {
	this.name = name;
	this.age = age;
	this.sayName = function () {
		console.log(this.name);
	};
}
let user5 = new User2("Han", 40);
user5.sayName(); //'Han'

function Item(title, price) {
	//this = {};
	this.title = title;
	this.price = price;
	this.showPrice = function () {
		console.log(`가격은 ${price}원 입니다`);
	};
	//return this;
}
//주석은 굳이 작성하지않아도 new로 호출하면 자동적으로 알고리즘이 실행된다.
const item1 = new Item("인형", 3000);
const item2 = new Item("과자", 4000);
const item3 = new Item("빵", 9000);

console.log(item1, item2, item3);
item3.showPrice();
//new를 안붙여주면 그냥 함수가 실행되는것, 저 함수자체에 return되는것이 없기때문에 undefined가 나와버림.
