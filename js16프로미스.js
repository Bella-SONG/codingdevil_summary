/* 프로미스 */
//구조 (판매자의 경우)
const pr = new Promise((resolve, reject) => {
	//code
});
//new Promise로 생성한다.
//함수로 전달받는데, 인수는 resolve와 reject (성공과 실패 시 실행되는 함수, 이렇게 어떤일이 완료된 이후 실행되는 함수를 콜백함수라고 한다.)

//new Promise가 반환하는 프로퍼티
/*
state: pending(대기) -> resolve(value)호출되면(성공하면) -> state: fulfilled(이행됨)
result: undefined                                  -> result: value(resolve함수로 전달된 값)    
*/
/*
state: pending(대기) -> reject(error)호출되면(실패하면) -> state: rejected(거부됨)
result: undefined                                  -> result: error(reject함수로 전달된 에러)    
*/

const pro = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("OK");
	}, 3000);
});
//pending이었다가 3초후에 fulfilled로 바뀌는경우, result: value

const pro2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject(new Error("error"));
	}, 5000);
});
//pending이었다가 3초후에 rejected로 바뀌는경우, result: error

//소비자의 경우
pro.then(
	function (result) {}, //이행 되었을때 실행
	function (err) {} //거부 되었을때 실행 err에는 에러값
);
//then을 이용해서 resolve와 reject를 처리할 수 있다.
/*
pro.then(
	function (result) {
		console.log(result + "가지러 가자.");
	},
	function (err) {
		console.log("다시 주문해주세요..");
	}
);
*/
//이 상황에서 err는 실행되지 않는다.
//then이외에 사용할 수 있는것 : catch, finally

// catch : 에러가 발생한경우, reject인 경우에만 실행이 된다.
pro2.then(function (result) {}).catch(function (err) {});
//위와 동일하게 동작함
//catch로 명확하게 구분해 주는 것이 가독성에도 더 좋고, 이런 경우 첫번째 함수를 실행하다가 나는 error도 잡아줄 수 있기 때문에 catch문 사용을 훨씬 권장.

//finally : 이행이던, 거부던 처리가 완료되면 항상 실행.
pro2
	.then(function (result) {})
	.catch(function (err) {})
	.finally(function () {
		console.log("--- 주문 끝 ---");
	});
//로딩화면 같은 것을 없앨 떄 유용

//예시1
const prom = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("OK");
		//reject(new Error("err...."));
	}, 3000);
});

console.log("시작");
prom
	.then(result => {
		console.log(result);
	})
	.catch(err => {
		console.log(err);
	})
	.finally(() => {
		console.log("끝");
	});
//이행되었던 거부되었던 끝이라는 로그는 항상 뜨게된다.

//예시2
const f1 = callback => {
	setTimeout(function () {
		console.log("1번 주문 완료");
		callback();
	}, 1000);
};

const f2 = callback => {
	setTimeout(function () {
		console.log("2번 주문 완료");
		callback();
	}, 3000);
};

const f3 = callback => {
	setTimeout(function () {
		console.log("3번 주문 완료");
		callback();
	}, 2000);
};

//위의 수식을 프로미스 없이  해보기
f1(function () {
	f2(function () {
		f3(function () {
			console.log("끝!");
		});
	});
});
//잘 동작은한다, 이렇게 depth가 깊어지면서 계속 콜백을 호출하는 것을 callback hell,콜백지옥이라고 부른다.

//프로미스로 표현해보기
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
			// rej("xxx");
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

// 프로미스 체이닝 (Promises chaining)
console.time("x");
console.log("시작");
f11()
	.then(res => f22(res))
	.then(res => f33(res))
	.then(res => console.log(res))
	.catch(console.log)
	.finally(() => {
		console.log("끝!");
		console.timeEnd("x");
	});
//이렇게 프로미스가 연결, 연결, 연결되는 것을 프로미스 체이닝이라고 한다.

//22번을 reject로 바꿔서 실행해보면 1번은 성공했고 2번에서 실패후 바로 finally를 실행했다. 3번은 시도조차 안한 것을 볼수 있음.

//이렇게 순차적으로 1초 3초 2초 걸리게 실행되는 것보다 동시에 실행되서 최대 3초가 걸리게 하는 방법은 없을까?
//이떄 쓰는 것이 promise.all

/* Promise.all */
console.time("xx");
Promise.all([f11(), f22(), f33()]).then(res => {
	console.log(res);
	console.timeEnd("xx");
});
//프로미스.all 하고, 배열로 받는다. 그리고 then을 사용한다. 저 3작업(f11,f22,f33)이 모두 완료가 되어야 then부분이 실행이된다.
/*
(3) ['1번 주문 완료', '2번 주문 완료', '3번 주문 완료']
0: "1번 주문 완료"
1: "2번 주문 완료"
2: "3번 주문 완료"
length: 3
[[Prototype]]: Array(0)

각 프로미스가 넘겨준 값이 배열로 들어왔다.
프로미스all은 한꺼번에 시작하고, 모두 이행되면 값을 사용할 수 있다. 시간도 절약할 수 있다.
*/

//Promise.all의 프로미스 안에 reject가 들어있는경우
//promise all은 실패했다고 뜨고 어떤 데이터도 얻지못하기에 주의해야한다. promise all은 하나의 정보만 누락되도 페이지를 보여주면 안되는 경우에 사용할 수 있다. 다보여주거나, 아예안보여주거나.

/* Promise.race */

//Promise.all과 사용방법은 동일
//차이점은, all은 모든 작업이 완료될 때 까지 기다리지만, race는 말그대로 경주, 하나라도 1등으로 완료되면 끝낸다.
console.time("xxx");
Promise.race([f11(), f22(), f33()]).then(res => {
	console.log(res);
	console.timeEnd("xxx");
});
/*
1번 주문 완료
xxx: 1003.637939453125 ms
*/
//1번 주문이 완료되었고 2번이 reject가 예정되어 있었지만 이미 1번이 완료되어 있었기 때문에  무시된다. 용량이 큰 image 등을 로딩할때 이미지 하나라도 완료되면 그 이미지를 보여줄떄 이런 방식을 사용하면 된다.
