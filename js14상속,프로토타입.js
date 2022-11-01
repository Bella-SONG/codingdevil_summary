/* 상속, 프로토타입(Prototype) */

/* 프로토타입 */
const user = {
	name: "Bella",
};
console.log(user.hasOwnProperty("name")); //true
console.log(user.hasOwnProperty("age")); //false
console.log(user); //{name:"Mike"}
//hasOwnPropery는 만든적이 없는데 어디에있는것?
/*
__proto__ : 프로토타입
일단 객체에서 프로퍼티를 읽으려고 하는데 없으면 여기에서 찾는다.
*/

const user2 = {
	name: "Bella",
	hasOwnProperty: function () {
		console.log("haha");
	},
};
user2.hasOwnProperty(); //haha
console.log(user2.hasOwnProperty()); //undefined
//방금 만든 메소드로 동작한다. 이것은 일단 객체에 프로퍼티가 있으면 탐색을 멈춘다. 없을때만 프로토타입에서 찾는다.

//예시

const bmw = {
	color: "red",
	// wheels: 4,
	navigation: 1,
	// drive() {
	// 	console.log("drive..");
	// },
};

const benz = {
	color: "black",
	// wheels: 4,
	// drive() {
	// 	console.log("drive..");
	// },
};

const audi = {
	color: "blue",
	// wheels: 4,
	// drive() {
	// 	console.log("drive..");
	// },
};

const jeep = {
	color: "white",
	// wheels: 4,
	navigation: 1,
	// drive() {
	// 	console.log("drive..");
	// },
};
//여기 함수객체 중에서 wheels와 drive는 모두 동일. 저렇게 차들이 늘어나면 새로운 변수가 만들어지는건데 공통된 부분을 어떻게 처리할까.
// -> __proto__

//step1. car라는 변수를 만들고 공통된 부분을 넣어준다.
const car = {
	wheels: 4,
	drive() {
		console.log("drive..");
	},
};
//step2. 각 프로퍼티들의 공통된 부분들을 지워준다. (wheels, drive 주석처리된부분)
//step3. 그 다음 이렇게 작성.
bmw.__proto__ = car;
benz.__proto__ = car;
audi.__proto__ = car;
jeep.__proto__ = car;

//확인
console.log(bmw); //{color: 'red', navigation: 1}
console.log(bmw.color); //"red"
console.log(bmw.wheels); //4
//우선 객체 내부에서 wheels프로퍼티를 찾는다 -찾으면 탐색멈춤, 없으면 prototype을 확인한다. - 열어보면 drive, wheels라는 프로퍼티를 발견

// !상속은 계속 이어질 수 있다
const x5 = {
	color: "white",
	name: "x5",
};

x5.__proto__ = bmw;
//x5를 만들고, x5가 bmw를 상속하게 한다.
//확인
console.log(x5.name); //x5
console.log(x5.color); //"white"
console.log(x5.navigation); //1
//navigation도 잘나옴 (bmw의 프로퍼티)
//그림으로 보면 이런 구조 -js14프로토타입구조자료 이미지 참조

//for in을 사용해서 x5객체의 프로퍼티들을 순회
for (p in x5) {
	console.log(p);
}
/*
color
name
navigation
wheels
drive 
다 나온다. name과 color를 제외하고는 다 프로토타입에서 정의한 프로퍼티.
*/

//Object.keys와 Object.values로 구분해보기
//Object.keys - 객체의 키를 배열로 Object.values - 객채의 값을 배열로

console.log(Object.keys(x5)); //(2) ['color', 'name']
console.log(Object.values(x5)); //(2) ['white', 'x5']
//상속된 프로퍼티는 나오지 않는다. (잘 구분해서 사용하자)

//for in문에서 구분하기
//hasOwnProperty를 사용하면 된다
for (p in x5) {
	if (x5.hasOwnProperty(p)) {
		console.log("o", p);
	} else {
		console.log("x", p);
	}
}
/*
o color
o name
x navigation
x wheels
x drive
이처럼 hasOwnProperty는 객체가 직접 가지고 있는 것만 true를 반환한다.
*/

//생성자함수를 이용해보기 - 비슷한객체들을 간단하게 만들수있다

//step1. 새로운 생성자 함수를 만든다.
const Bmw = function (color) {
	this.color = color;
	// this.wheels = 4;
	// this.drive = function () {
	// 	console.log("drive..");
	// };
};

const x6 = new Bmw("red");
const z4 = new Bmw("blue");

//step2. color와 wheels는 동일하기때문에 분리가 가능하다.
//car2를 하나만들고, Bmw의 wheels와 drive는 지워준다.

// const car2 = {
// 	wheels: 4,
// 	drive() {
// 		console.log("drive..");
// 	},
// };

//step3. 아까와 동일하게 __proto__를 넣어준다.

// x6.__proto__ = car;
// z4.__proto__ = car;

console.log(x6); //Bmw {color: 'red'}
console.log(x6.wheels); //4

//그런데 이런식으로 매번 쓰는건 귀찮다(생성자 함수를 쓰는 이유가 간편해서인데)

//step4. 생성자함수에 프로토타입 바로 넣기
Bmw.prototype.wheels = 4;
Bmw.prototype.drive = function () {
	console.log("drive..");
};
//.prototype 생성자함수가 생성하는 객체에 __proto__를 이렇게 설정한다는 듯.
x5.drive(); //"drive.."

//step5. 프로토타입 추가하기
Bmw.prototype.navigation = 1;
Bmw.prototype.stop = function () {
	console.log("STOP!");
};

x6.stop(); //STOP!  잘나옴.

//이렇게 .prototype을 이용하면 중복코드를 줄일 수 있다.
//이렇게 한번만 작업을 해주면 생성자로 만들어진 모든객체에 일일히 작업해 줄 필요가 없어진다. 생성자함수가 새로운 객체를 만들어낼때 그 객체는 생성자의 인스턴스 라고 불려진다. 자바스크립트에서는 이를 편리하게 확인 해줄수 있는 instanceof 연산자가 있다. 이걸 이용해서 객체와 생성자를 비교할 수 있고, 이는 해당 객체가 그 생성자로 부터 생성된 것인지를 판단해서 true 혹은 false로 반환한다.

console.log(z4 instanceof Bmw); //true
//이렇게하면 Bmw를 이용해서 z4를 만들었는지 알려준다 - true

console.log(z4.constructor === Bmw); //true
//생성자로 만들어진 instance에는 constructor라는 프로퍼티가 존재한다
//constructor == 생성자 == Bmw // true

//위의 예제에서 코드를 좀더 깔끔하게하기위해
/*
Bmw.prototype = {
	// constructor: Bmw,
	wheels: 4,
	drive() {
		console.log("drive..");
	},
	navigation: 1,
	stop() {
		console.log("STOP!");
	},
};
*/
//이렇게 한번에 몰아서 넣어주는 것도 가능하다.
//그런데 이렇게하면 constructor가 사라진다.
//console.log(z4.constructor === Bmw); //false가 되어버림.

//이를 방지하는 방법.
//1.각각 하나씩 프로퍼티를 추가하는 것.(원래대로) - 이게 더 좋은듯
//2.저안에 constructor: Bmw, 라고 psuedo로 명시해주는 것도 괜찮다.

//이렇게 자바스크립트는 명확한 constructor를 보장하지 않는다. 개발자에 의해서 언제든지 수정될 수 있다는 점을 염두해 두어야 한다.

//지금 상태에서는 언제던지 color를 바꿀수 있는 상태인데 이를 방지하는 방법
//-> 클로저 사용
const Bmw2 = function (color) {
	const c = color;
	this.getColor = function () {
		console.log(c);
	};
};

const x7 = new Bmw2("red");

x7.getColor(); //red
