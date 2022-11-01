/* 클래스 Class */

//지금까지 비슷한 형태의 객체를 생성하기 위해서 생성자 함수를 사용해왔다, 하지만 class로도 가능하다.(es6에서 추가된 스펙)

//생성자 함수 방법
const User = function (name, age) {
	this.name = name;
	this.age = age;
	this.showName = function () {
		console.log(this.name);
	};
};
const mike = new User("Mike", 30);

//class를 사용한 방법(es6에서 추가된 스펙)

class User2 {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
	showName() {
		console.log(this.name);
	}
}

const tom = new User2("Tom", 19);
console.log(tom);
//User2 {name: "Ton", age: 19}
/*
class라는 키워드를 사용하고 내부에 constructor가 있다.
constructor는 객체를 만들어주는 생성자 메소드이다.
new를 통해 호출하면 자동으로 실행된다. 
객체를 초기화 하기위한 값이 내부에 정의되고,
constructor(name, age) 이런식으로 인수를 넘겨받을 수 있다.
이렇게하면 객체에 name과 age가 만들어 지는 것.

showName 처럼 클래스 내에 정의 된 메소드는 user2의 "프로토타입"에 저장된다.
*/

//클래스 내에 정의된 메소드의 저장위치 차이(생성자함수 vs class)

console.log(mike);
//User {name: 'Mike', age: 30, showName: ƒ}
console.log(tom);
//User2 {name: 'Tom', age: 19}
/*[[Prototype]]: Object
constructor: class User2
showName: ƒ showName()*/
//mike는 객체 내부에 있고, tom은 프로토타입 내부에 있다.

mike.showName(); //Mike
tom.showName(); //Tom
//사용법은 동일하다.

//생성자 함수에서 class와 동일하게 동작하게 만들어보기
//1.생성자함수 내에 this.showName = function(){} 부분을 지운다.
/*2.새로 프로퍼티를 직접 추가해준다.   
User.prototype.showName = function (){
  console.log(this.name);
};
*/
const User3 = function (name, age) {
	this.name = name;
	this.age = age;
	// User.prototype.showName = function () {
	// 	console.log(this.name);
	// };
};

User3.prototype.showName = function () {
	console.log(this.name);
};
const bella = new User3("Bella", 30);
//이렇게 생성자 함수로도 구현이 가능하다, 그럼 단순히 문법의 편의성만을 위해서 class가 탄생한걸까?

//const bella = User3("Bella", 30);
//new를 빼고실행해본다.
//console.log(bella) undefined
//이 코드는 문제가 없다, user3함수가 반환하는값, return문이 없어 반환하는 값이 없기때문에 그 값이 undefined, 그 값이 bella에 들어갔다. 분명 개발자가 실수한 코드지만 문제가 없고 에러라고 알아차리지 않는다.

//const tom = User2("Tom", 19);
//클래스의 경우에도 new를 빼고실행해본다.
//하지만 class는 new없이 실행해줄 수 없다. prototype의 내부의 constructor를 보면 class는 class User2라고 명시되어있는데, 이렇게 constructor가 클래스라는 것을 알수 있고 이 경우에 new없이 호출하면 에러가 발생하도록 설계되어있다.

//for in문으로 확인해보기
//생성자함수의 경우
for (const p in bella) {
	console.log(p);
}
/*
js15클래스class.js:88 name
js15클래스class.js:88 age
js15클래스class.js:88 showName

프로토타입에있는 showName까지 다나온다.
*/

//class의 경우
for (const p in tom) {
	console.log(p);
}
/*
js15클래스class.js:99 name
js15클래스class.js:99 age

name 과 age 만 나온다.
*/
//지난시간에 for in문은 프로토타입에 포함된 프로퍼티들을 다 보여주고, 객체가 가지고있는 프로퍼티만 판별하기 위해서 hasOwnProperty를 사용해야 했다. class의 메소드는 for in문에서 제외된다.

/* 상속 */

//생성자함수의 경우에는 prototype을 이용해서 상속을 구현했다.
//class의 상속은 extends를 사용한다.

class Car {
	constructor(color) {
		this.color = color;
		this.wheels = 4;
	}
	drive() {
		console.log("drive..");
	}
	stop() {
		console.log("drive..");
	}
}
//car클래스를 하나만들고 car를 상속해서 bmw를 만들어본다.

class Bmw extends Car {
	park() {
		console.log("PARK");
	}
}

const z4 = new Bmw("blue");

console.log(z4);
/*
Bmw {color: 'blue', wheels: 4}
	color: "blue"
	wheels: 4
	[[Prototype]]: Car
		constructor: class Bmw
		park: ƒ park()	//클래스 내부에서 선언한 이 메소드는 이 프로토타입 밑으로 들어간다.
		[[Prototype]]: Object
			constructor: class Car
			drive: ƒ drive()  //드라이브와 스톱은 여기에있다.
			stop: ƒ stop()
			[[Prototype]]: Object
*/
z4.drive();
//drive..
//일단 z4객체에서 찾고, 없으니까 프로토타입으로 가서 찾아보고 없으니까 또 프로토타입으로가서 찾아본다.이렇게 해서 드라이브 메소드를 사용한다.

/* 메소드 오버라이딩 method overriding */
//만약 bmw의 내부에 car에서 정의한 메소드와 동일한 이름의  메소드가 있다면?
/*
class Bmw extends Car {
	park() {
		console.log("PARK");
	}
	stop() {
		console.log("OFF");
	}
}

console.log(z4.stop());
*/
//OFF
//동일한 이름의 메소드가 나오면 덮어쓰게 된다.

//만약 부모의 메소드를 그대로 사용하면서 확장하고 싶다면 어떻게 해야할까?
//super라는 키워드를 사용한다!
/*
 class Bmw extends Car {
	park() {
		console.log("PARK");
	}
	stop() {
		super.stop();
		console.log("OFF");
	}
}
//console.log(z4.stop());
*/
//STOP!
//OFF
//이렇게 super.메소드명으로 부모클래스에 정의된 method를 사용할 수 있다. 이런 방식을 오버라이딩이라고 한다.

//constuctor, 생성자 오버라이딩
/*
class Benz extends Car {
	constructor() {
		this.navigation = 1;
	}
	song() {
		console.log("SONG");
	}
}

const e300 = new Benz("blue");

//in derived class before accessing 'this' or returning from derived constructor 부모생성자를 반드시 먼저 호출해야 한다.
*/

//class의 constructor는 빈 객체를 만들어주고, this로 객체를 가리키게 된다. 반면 extends를 써서만든 자식 클래스는 빈 객체를 만들어주고, this에 할당하는 이 작업을 건너 뛴다. 그래서,
class Benz extends Car {
	constructor() {
		super();
		this.navigation = 1;
	}
	song() {
		console.log("SONG");
	}
}

const e300 = new Benz("blue");
//항상 super키워드로 부모클래스의 constructor를 실행해줘야한다.

console.log(e300);
/*
Benz {color: undefined, wheels: 4, navigation: 1}
	color: undefined
	navigation: 1
	wheels: 4
	[[Prototype]]: Car
		constructor: class Benz
		song: ƒ song()
		[[Prototype]]: Object
			constructor: class Car
			drive: ƒ drive()
			stop: ƒ stop()
			[[Prototype]]: Object 
*/
//navigation은 1이라고 잘들어갔는데, color는 undefined가되었다. 분명히 생성할때 blue를 넣어줬음에도 불구하고. 제대로 동작하기 위해서는 자식클래스의 constructor에 동일한 인수를 받는 작업을 해줘야한다.
class Benz2 extends Car {
	constructor(color) {
		super(color);
		this.navigation = 1;
	}
	song() {
		console.log("SONG");
	}
}

const e3002 = new Benz2("blue");

console.log(e3002);
/*
Benz2 {color: 'blue', wheels: 4, navigation: 1}
	color: "blue"
	navigation: 1
	wheels: 4
	[[Prototype]]: Car
		constructor: class Benz2
		song: ƒ song()
		[[Prototype]]: Object
			constructor: class Car
			drive: ƒ drive()
			stop: ƒ stop()
			[[Prototype]]: Object
*/
//처음에는 저렇게 안해줬어도 잘 나왔는데 내부에서 어떻게 동작하는지 살펴보자
/*
class Benz extends Car {
	song() {
		console.log("SONG");
	}
}

const e300 = new Benz("blue");

위 수식에서 자바스크립트는

class Benz extends Car {
	constructor(...args) {
		super(..args)
		//이 두부분이 있는것 처럼 행동을 한다. 그렇기 때문에 자식생성자는 무조건 부모생성자를 호출해야 되는 것.
	}
	song() {
		console.log("SONG");
	}
}

const e300 = new Benz("blue");
*/
