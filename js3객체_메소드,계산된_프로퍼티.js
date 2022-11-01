//객체메소드 Object methods

//계산된 프로퍼티(Computed property)
let a = "age";
const user = {
	name: "Mike",
	[a]: 30,
	//age: 30, 와 같음
	//문자열 a가 아닌 변수[a]에 할당된 값이 들어가는 것.이를 computed property라고 한다.
};

const user2 = {
	[1 + 4]: 5,
	["안녕" + "하세요"]: "Hello",
};
//이런식으로 식자체를 넣는것도 가능함

//Object methods
//Object.assign():객체 복제
const user3 = {
	name: "Bella",
	age: 29,
};
const cloneUser = user3;
//복제가 안된다. user3변수에는 객체 자체가 들어있는 것이 아니라, 객체가 저장되어 있는 메모리 주소인 객체에 의한 참조값이 저장된다. 즉, cloneUser는 객체가 복사되는 것이 아니라 참조값만 복제되는 것.
//하나의 변수를 두 객체가 접근하는 것과 같다.
//동일하게 복제하는 방법.

//Object.assign():객체복제
const newUser = Object.assign({}, user3);
//왼쪽의 빈객체에 오른쪽의 유저가 병합되므로 복제되는 것
newUser.name = "Tom";
console.log(user3.name); //'Bella'
//user3은 변함이 없다. 같은 객체가 아니다.
console.log(newUser !== user3); //true

const user4 = Object.assign({ gender: "male" }, user3);
console.log(user4);
/*age: 29 
gender: "male" 
name: "Bella"*/
const user5 = Object.assign({ name: "Mike" }, user3);
console.log(user5);

const user6 = {
	name: "Kevin",
};
const info1 = {
	age: 30,
};
const info2 = {
	gender: "female",
};
const user7 = Object.assign(user6, info1, info2);
console.log(user7);
//{name: 'Kevin', age: 30, gender: 'female'}

//Object.keys(): 키를 배열로 반환
console.log(Object.keys(user7));
// ['name', 'age', 'gender']

//Object.values(): 값을 배열로 반환
console.log(Object.values(user7));
// ['Kevin', 30, 'female']

//Object.entries(): 키/값 모두 배열로 반환
const user8 = Object.entries(user7);
console.log(user8);
// [Array(2), Array(2), Array(2)] 배열안에 키와값이 들어있는 배열이 들어있음.

//Object.fromEntries(): 키/값의 배열을 객체로 변환
console.log(Object.fromEntries(user8));
// {name: 'Kevin', age: 30, gender: 'female'}

//예시
function makeObj(key, val) {
	return {
		[key]: val,
	};
}
const obj = makeObj("성별", "male");
console.log(obj);
// {성별: 'male'}
//어떤게 키가될지 모르는 객체를 만들 때 유용

//예시2 - 복제
const paste = {
	name: "Henry",
	age: "25",
};

const paste2 = paste; //이런식으로 하면 복제가 안된다. 이유
paste2.name = "Tom";

console.log(paste);
// {name: 'Tom', age: '25'}
console.log(paste2);
// {name: 'Tom', age: '25'}
//둘다 바뀌었다, 모두 하나의 객체를 보고있다는 것

const paste3 = Object.assign({}, user);
console.log(paste);
//{name: 'Tom', age: '25'}
console.log(paste3);
// {name: 'Mike', age: 30}
//기존에 것은 Tom그대로, 바뀐것만 이름이 바뀌었다. 잘 복제 된 것.
