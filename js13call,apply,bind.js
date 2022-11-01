/* call, apply, bind */
//함수 호출 방식과 관계없이 this 를 지정할 수 있음

/* call */
//모든 함수에서 사용할 수 있으며, 'this'를 특정값으로 지정할 수 있다.

//예시1
const mike = {
	name: "Mike",
};

const tom = {
	name: "Tom",
};

function showThisName() {
	console.log(this.name);
}

showThisName;
//아무것도 콘솔창에 뜨지않는다. 왜냐하면 여기서 this = window
showThisName.call(mike); //"Mike"
//함수를 호출하면서 call을 사용하고, this로 사용할 객체를 넘기면 해당 함수가 주어진 객체의 method인 것처럼 사용 할 수 있다.
//call의 첫번째 매개변수는 this로 사용할 값, 매개변수가 더 있으면 그 매개변수를 호출하는 함수로 전달된다.
showThisName.call(tom); // "Tom"

//예시2
//업데이트 함수,
function update(birthYear, occupation) {
	this.birthYear = birthYear;
	this.occupation = occupation;
}

update.call(mike, 1999, "singer");
console.log(mike);
//{name: 'Mike', birthYear: 1999, occupation: 'singer'}

update.call(tom, 2002, "teacher");
console.log(tom);
//{name: 'Tom', birthYear: 2002, occupation: 'teacher'}
//call(this로 사용할 값,함수update가사용할 매개변수1, 매개변수2)

/* apply */
//매개변수를 처리하는 방법을 제외하면 call과 완전히 같다.
//call은 일반적인 함수와 마찬가지로 매개변수를 직접 받지만, apply는 매개변수를 배열로 받는다.

update.apply(mike, [1999, "singer"]);
console.log(mike);
//{name: 'Mike', birthYear: 1999, occupation: 'singer'}

update.apply(tom, [2002, "teacher"]);
console.log(tom);
//{name: 'Tom', birthYear: 2002, occupation: 'teacher'}

//결과는 동일하다.
//apply는 배열요소를 함수의 매개변수로 사용할 때 유용하다.

//예시 - apply

const minNum = Math.min(3, 10, 1, 6, 4);
const maxNum = Math.max(3, 10, 1, 6, 4);

console.log(minNum); //1
console.log(maxNum); //10

//저 변수를 배열로 바꿔보자
const minNum2 = Math.min([3, 10, 1, 6, 4]);
const maxNum2 = Math.max([3, 10, 1, 6, 4]);

console.log(minNum2); //NaN
console.log(maxNum2); //NaN
//배열로 바로 하면 잘 되지 않는다.

//이배열을 스프레드 연산자를 활용해서 동일한 것을 해보기

const nums = [3, 10, 1, 6, 4];

const minNum3 = Math.min(...nums);
const maxNum3 = Math.max(...nums);

console.log(minNum3); //1
console.log(maxNum3); //10
//값이 잘 나온다!

//apply를 활용해서 동일한 것을 해보기

const minNum4 = Math.min.apply(null, nums);
// = Math.min.aply(null,[3, 10, 1, 6, 4])
const maxNum4 = Math.max.apply(null, nums);
// = // = Math.max.aply(null,[3, 10, 1, 6, 4])
//apply는 두번째자리에 매개변수로 배열을 전달하면 그 요소들을 차례대로 사용한다.
//여기서 null은 this로 사용될 값인데, Math.min이나, Math.max 메소드 는 딱히 this가 필요치 않아서 아무 값이나 넣어준 것. 아무거나 넣어도 상관없다.

console.log(minNum4); //1
console.log(maxNum4); //10
//call을 활용해서 동일한 것을 해보기

const minNum5 = Math.min.call(null, ...nums);
// = Math.min.call(null, 3, 10, 1, 6, 4)
const maxNum5 = Math.max.call(null, ...nums);
// = Math.max.call(null, 3, 10, 1, 6, 4)

console.log(minNum5); //1
console.log(maxNum5); //10

//call과 apply는 동작방식은 같다. 매개변수를 받는 방식만 다를 뿐이다.
//call은 순서대로 직접받고, apply는 배열 형태로 받는다.(apply는 array를 받는다!)

/* bind */
//함수의 this값을 영구히 바꿀 수 있다.

function update(birthYear, occupation) {
	this.birthYear = birthYear;
	this.occupation = occupation;
}
const updateMike = update.bind(mike);

updateMike(1980, "police");
console.log(mike);
//{name: 'Mike', birthYear: 1980, occupation: 'police'}

//실제 사용 예제
const user = {
	name: "Bella",
	showName: function () {
		console.log(`Hello, ${this.name}!`);
	},
};

user.showName(); //Hello, Bella!

let fn = user.showName;

fn(); //Hello, !
//fn을 할당할 때에 this를 잃어버린 것.
//메소드는 .앞에 있는 것이 this, 호출할때 fn만 호출하니까 this가 없는 것.

fn.call(user); //Hello, Bella!
fn.apply(user); //Hello, Bella!
//call, apply는 잘 작동한다

//bind를 사용, 새함수를 만들어서 작동해보기.
let boundFn = fn.bind(user);
boundFn(); //Hello, Bella!
