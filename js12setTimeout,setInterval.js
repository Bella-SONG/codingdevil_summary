//setTimeout / setInterval
/*
setTimeout - 일정 시간이 지난 후 함수를 실행
setInterval - 일정 시간 간격으로 함수를 반복  
*/

//setTimeout

function fn() {
	console.log(3);
}
setTimeout(fn, 3000);
//이함수는 3초가 지난 후에 3이 콘솔창에 찍힌다.
//setTimeout은 두개의 매개변수를 가진다,(일정시간이 지난뒤 실행하는 함수, 시간)
/* 아래의 함수와 동일하다

setTimeout(function(){
  console.log(3)
}, 3000)
 
*/
//인수가 필요하다면 시간 뒤에 적어준다. (함수, 시간, 인수)
function showName(name) {
	console.log(name);
}
const tId = setTimeout(showName, 3000, "Bella");
//'Bella'는 함수 showName의 첫번째 인수로 전달이 된다.

//clearTimeout(); 예정된 작업을 없애주는 함수.
clearTimeout(tId);
//setTimeout은 tId를 반환하는데, 이것을 이용하면 스케쥴링을 취소할 수 있다. 3초가 지나기전에 코드가 실행되기 때문에 아무일도 일어나지 않는다.

//setInterval
//setTimeout과 사용방법은 동일

function showName(name) {
	name = "Tom";
	console.log(name);
}
const tId2 = setInterval(showName, 3000);
//중간에 중단하려면 clearInterval(tId2);를 해주면 된다.

/*주의사항*/
setTimeout(function () {
	console.log(2); //secound
}, 0);
console.log(1); //first
// 이 함수에서 setTimeout의 시간을 0으로 해주었음에도 불구하고, 47번째줄의 console.log(1)이 먼저찍히는 것을 볼 수 있다.
//이유는 현재 실행 중인 스크립트가 종료된 이 후 스케쥴링 함수를 실행하기 때문이다. 0이라고 적었다고 해서 바로 실행되는 것이 아니다. 그리고 브라우저는 기본적으로 4ms정도의 대기시간이 있다. 0이라고 적어도 4ms혹은 그이상이 걸릴 수 있다.

//예제
//유저가 접속하면 접속한지 얼마나 지났는지 보여준다. + 5초지나면 멈추도록 하기

let num = 0;

function showTime() {
	console.log(`안녕하세요! 접속하신지 ${num++}초가 지났습니다.`);
	if (num > 5) {
		clearInterval(tId3);
	}
}
const tId3 = setInterval(showTime, 1000);
