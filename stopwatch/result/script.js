/*즉시실행함수 (변수와 함수를 전역 스코프에서 격리시키는 데 사용)---------------------------------*/
;(function () {
  ("use strict");

  /*Stopwatch 클래스(스톱워치의 기능을 구현하는 클래스)------------------------------------------
  : Stopwatch 인스턴스를 생성할 때 호출됩니다. 
  element 매개변수: 스톱워치 시간을 표시할 DOM 요소를 받음. 생성자 내에서 몇 가지 변수를 초기화함.*/
  class Stopwatch {
    constructor(element) {
      this.timer = element;
      this.defaultTime = "00:00.00";
      this.startTime = 0;
      this.elapsedTime = 0;
      this.interval = null;
    }

    /*print(text): text를 입력으로 받아, 이를 timer 요소의 내부 HTML로 설정합니다. */
    print(text) {
      this.timer.innerHTML = text;
    }

    /*addZero(number): 숫자를 입력으로 받아, 
    10 미만이면 앞에 '0'을 붙여서 반환하고, 
    99 초과면 마지막 자리를 제거하여 반환합니다. 그 외의 경우 숫자 그대로 반환합니다. */
    addZero(number) {
      if (number < 10) {
        return "0" + number;
      }
      if (number > 99) {
        return number.toString().slice(0, -1);
      }
      return number;
    }

    /*timeToString(time): 밀리초 단위의 시간을 받아서, mm:ss.SS 형태의 문자열로 변환하는 메서드.
      time을 Date 객체로 변환하여 분, 초, 밀리초를 추출합니다.
      앞서 설명한 addZero 메서드를 사용하여 각 부분을 적절히 포맷한 후, 
      문자열로 합쳐서 반환합니다. */
    timeToString(time) {
      const date = new Date(time);
      /*getUTCMinutes(), getUTCSeconds(), getMilliseconds()는
      JavaScript의 Date 객체의 내장 메서드 */
      const minutes = date.getUTCMinutes();
      const seconds = date.getUTCSeconds();
      const millisecond = date.getMilliseconds();
      return `${this.addZero(minutes)}:${this.addZero(seconds)}.${this.addZero(
        millisecond
      )}`;
    }

    /*startTimer(): elapsedTime을 업데이트하고, 
    이를 문자열 형식으로 변환하여 화면에 표시!*/
    startTimer() {
      this.elapsedTime = Date.now() - this.startTime;
      const time = this.timeToString(this.elapsedTime);
      this.print(time);
    }

    /*start(): 스톱워치를 시작함! 
    10ms 마다 startTimer를 호출하여 화면을 업데이트합니다.*/
    start() {
      clearInterval(this.interval);
      this.startTime = Date.now() - this.elapsedTime;
      this.interval = setInterval(this.startTimer.bind(this), 10);
    }

    stop() {
      /*stop(): 스톱워치를 정지합니다. setInterval을 중지합니다. */
      clearInterval(this.interval);
    }

    reset() {
      /*reset(): 스톱워치를 리셋합니다. 시간을 초기화하고 화면에 00:00.00을 표시!*/
      clearInterval(this.interval);
      this.print(this.defaultTime);
      this.startTime = 0;
      this.elapsedTime = 0;
      this.interval = null;
    }
  }

  //   DOM 요소 선택 ------------------------------------------------------------------------------------
  // get(target) 함수는 주어진 셀렉터(target)에 일치하는 DOM 요소를 반환합니다.
  const get = (target) => {
    return document.querySelector(target);
  };

  // const $timer = get('.timer'); 등의 코드를 통해
  //스톱워치와 관련된 DOM 요소들을 선택하여 변수에 할당합니다.
  const $timer = get(".timer");
  const $startButton = get(".timer_button.start");
  const $stopButton = get(".timer_button.stop");
  const $resetButton = get(".timer_button.reset");
  const stopwatch = new Stopwatch($timer);

  /*이벤트 리스너 등록:
  시작, 정지, 리셋 버튼에 클릭 이벤트 리스너를 추가하여 
  각각 start, stop, reset 메서드를 호출합니다. 
  이를 통해 사용자가 버튼을 클릭할 때 스톱워치가 적절히 동작하도록 합니다. */
  $startButton.addEventListener("click", () => {
    stopwatch.start();
  });

  $stopButton.addEventListener("click", () => {
    stopwatch.stop();
  });

  $resetButton.addEventListener("click", () => {
    stopwatch.reset();
  });
})()