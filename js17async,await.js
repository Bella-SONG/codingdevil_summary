/* async await */
//async await를 사용하면 promise에 then메소드를 사용하는 것보다 가독성이 좋아진다.

/* async */

async function getName() {
	return "Mike";
}
//async라는 키워드를 붙여주면 항상 프로미스를 반환한다.
console.log(getName());
//Promise {<fulfilled>: 'Mike'}

//그래서 함수를 호출하고() then을 사용할 수 있다.
getName().then(name => {
	console.log(name);
});
//Mike

//만약에 반환값(return)이 프로미스면
async function getName2() {
	return Promise.resolve("Tom");
}
getName2().then(name => {
	console.log(name);
});
//Tom
//그 값을 그대로 사용한다.

//만약에 함수 내부에서 예외가 발생되면
async function getName3() {
	// return Promise.resolve("Tom");
	throw new Error("err..");
}
getName3().catch(err => {
	//reject기때문에 catch로 확인
	console.log(err);
});
/*
Error: err..
    at getName3 (js17async,await.js:30:8)
    at js17async,await.js:32:1
*/
//rejected 상태의 프로미스가 반환된다.

/* await */
//await 키워드는 async 내부에서만 사용할 수 있다 일반함수에서 사용하면 에러가 발생.
function getName4(name) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(name);
		}, 1000);
	});
}
async function showName() {
	const result = await getName4("Mike");
	console.log(result);
}
console.log("시작");
showName();
//result에 getName에서 resolve된 값을 1초 기다렸다가 넣어줌

//js16의 프로미스코드를 async await로 바꿔주기

const f11 = () => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res("1번 주문 완료");
		}, 1000);
	});
};
const f22 = message => {
	console.log(message);
	return new Promise((res, rej) => {
		setTimeout(() => {
			res("2번 주문 완료");
			// rej(new Error("xxx"));
		}, 3000);
	});
};
const f33 = message => {
	console.log(message);
	return new Promise((res, rej) => {
		setTimeout(() => {
			res("3번 주문 완료");
		}, 2000);
	});
};

console.log("시작");
async function order() {
	const result1 = await f11();
	const result2 = await f22(result1);
	const result3 = await f33(result2);
	console.log(result3);
	console.log("종료");
}
order();
//이 데이터가 기다렸다가 들어가는게 명확하게보이므로 promise then보다 가독성이 좋다.

// f11()
// 	.then(res => f22(res))
// 	.then(res => f33(res))
// 	.then(res => console.log(res))
// 	.catch(console.log);

//만약에 rejected가된다면?
//try catch문으로 감싸주면된다.

console.log("시작");
async function order2() {
	try {
		const result1 = await f11();
		const result2 = await f22(result1);
		const result3 = await f33(result2);
		console.log(result3);
	} catch (e) {
		console.log(e);
	}
	console.log("종료");
}
order2();
//에러로그를 찍고 이후 작업이 계속 진행된다.
//console.log(e); 자리에서 적절한 에러를 처리해주고 넘어가면 된다.

//promise all 사용해보기

console.log("시작");
async function order3() {
	try {
		const result = await Promise.all([f11(), f22(), f33()]);
		console.log(result);
	} catch (e) {
		console.log(e);
	}
	console.log("종료");
}
order3();
/*
(3) ['1번 주문 완료', '2번 주문 완료', '3번 주문 완료']
종료 
*/
