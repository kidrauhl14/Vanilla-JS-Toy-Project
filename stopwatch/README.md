## stopwatch

- setInterval 사용해서 스톱워치 구현
- 시작, 중지, 리셋 구현
- es6 class 활용

### setTimeout, setInterval

- 일정 시간이 지난 후 원하는 함수를 실행할 수 있게 하는 메서드

#### setTimeout 과 setInterval의 차이

- setTimeout
  - https://developer.mozilla.org/ko/docs/Web/API/setTimeout
  - 일정 시간 간격 이후에 함수가 한번 실행
- setInterval
  - https://developer.mozilla.org/en-US/docs/Web/API/setInterval
  - 일정 시간 간격으로 함수가 주기적으로 실행

#### setTimeout() 또는 setInterval()으로 시간 계산하기

setTimeout() 또는 setInterval()을 사용하여 주기적으로 실행하지만,
실제 시간을 계산하는 데는 절대 사용하지 않는다.
이는 자바스크립트 특성 상 싱글스레드라 타이머 이벤트가 정확한 간격으로 발생하지 않기 때문이다.
그런데 자바스크립트의 Date.now() 를 사용하면 항상 정확한 시간을 반환한다.

따라서 Date.now()를 사용해 현재 시간을 가져오고, 이 현재 시간을 경과된 시간과 비교해 실제 경과 시간을 계산한다.

### clearInterval

https://developer.mozilla.org/en-US/docs/Web/API/clearInterval

- setInterval() 호출에 의해 설정된 시간이 지정된 반복 작업을 취소

### Date()

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date

- 날짜와 시간을 위한 메소드를 제공하는 빌트인 객체

#### getUTC()

- UTC(협정 세계시)를 기준으로 값을 리턴

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMinutes
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCSeconds
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMilliseconds
