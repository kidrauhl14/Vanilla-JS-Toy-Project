/* 코드 작성 시) 코드의 순서와 구조는 
명확성, 가독성, 그리고 함수/변수의 스코프와 종속성에 따라 결정된다.

-함수와 클래스 정의: 코드의 나머지 부분에서 "사용되기 이전에" 정의되어야 합니다. 
예를 들어, get 함수를 코드의 맨 아래로 옮기면, 이 함수를 참조하는 나머지 코드에서 오류가 발생할 수 있습니다.

-변수 초기화와 이벤트 핸들러 연결:
일반적으로 코드의 맨 아래에 위치하며, 이는 필요한 모든 함수와 클래스가 이미 정의되었기 때문에 안전하게 연결될 수 있습니다.

 */
;(function () {
  ("use strict");

  //get, getAll 함수 : 둘 다 DOM(Document Object Model) 요소를 선택하는 데 사용!
  const get = (target) => {
    /* get함수
    :매개변수 target(선택하고자 하는 DOM 요소의 셀렉터를 나타냄)을 받음
    함수는 document.querySelector()를 사용하여 해당 셀렉터에 일치하는 첫 번째 요소를 반환합니다. 
    만약 일치하는 요소가 없다면 null 반환. ex) get('.myClass'): 클래스 이름이 "myClass"인 첫 번째 요소를 반환 */
    return document.querySelector(target);
  };

  /*getAll 함수: 
  document.querySelectorAll()를 사용하여 해당 셀렉터에 일치하는 모든 요소들의 NodeList를 반환. 
  일치하는 요소가 없으면 빈 NodeList를 반환 */
  const getAll = (target) => {
    return document.querySelectorAll(target);
  };

  class Calculator { //계산기의 기능을 캡슐화
    constructor(element) {
      this.element = element;
      this.currentValue = "";
      this.prevValue = "";
      this.operation = null;
    }

    reset() {
      this.currentValue = "";
      this.prevValue = "";
      this.resetOperation();
    }

    clear() {
      if (this.currentValue) {
        this.currentValue = "";
        return;
      }
      if (this.operation) {
        this.resetOperation();
        this.currentValue = this.prevValue;
        return;
      }
      if (this.prevValue) {
        this.prevValue = "";
        return;
      }
    }

    //이 메서드는 숫자와 소수점을 currentValue 프로퍼티에 추가하는 역할!
    //이 떄, 소수점이 한 번만 추가되도록 합니다.
    appendNumber(number) {
      /*(this.currentValue에 두 개 이상의 소수점이 추가되는 것을 방지함) 
      number 매개변수가 '.'(소수점)인지 확인하고, this.currentValue에 이미 '.'가 포함되어 있다면 아무 작업도 수행하지 않고 종료. 
       */
      if (number === "." && this.currentValue.includes(".")) return;

      /*(this.currentValue에 숫자를 추가)
      this.currentValue를 문자열로 변환하고, 입력받은 number도 문자열로 변환하여 this.currentValue에 연결(추가). */
      this.currentValue = this.currentValue.toString() + number.toString();
    }

    setOperation(operation) {
      this.resetOperation();
      this.operation = operation;
      this.prevValue = this.currentValue;
      this.currentValue = "";

      const elements = Array.from(getAll(".operation"));
      const element = elements.filter((element) =>
        element.innerText.includes(operation)
      )[0];
      element.classList.add("active");
    }

    compute() {
      let computation; //computation 변수는 이 메서드 내에서 연산 결과를 저장하는 데 사용됨!
      const prev = parseFloat(this.prevValue); //this.prevValue를 부동소수점 숫자로 변환하여 새로운 상수 prev에 저장
      const current = parseFloat(this.currentValue); //this.currentValue를 부동소수점 숫자로 변환하여 새로운 상수 current에 저장
      if (isNaN(prev) || isNaN(current)) return; //prev 또는 current 값이 숫자가 아닌 경우 (즉, NaN인 경우) 메서드를 종료
      switch (
        this.operation //switch 문을 사용하여 this.operation의 값에 따라 다른 연산(덧셈, 뺄셈, 곱셈, 나눗셈)을 수행
      ) {
        case "+":
          computation = prev + current;
          break;
        case "-":
          computation = prev - current;
          break;
        case "*":
          computation = prev * current;
          break;
        case "/":
          computation = prev / current;
          break;
        default:
          return;
      }
      this.currentValue = computation.toString(); //연산 결과를 문자열로 변환하여 this.currentValue에 저장
      this.prevValue = "";
      this.resetOperation();
    }

    updateDisplay() {
      if (this.currentValue) {
        this.element.value = this.currentValue;
        return;
      }
      if (this.prevValue) {
        this.element.value = this.currentValue;
        return;
      }
      if (this.prevValue) {
        this.element.value = this.prevValue;
        return;
      }
      this.element.value = 0;
    }

    //resetOperation 메서드는 연산 상태를 재설정하고, HTML 요소들의 클래스 목록에서 'active' 클래스를 제거하는 기능
    //사용자 인터페이스 상태를 초기 상태로 되돌림
    resetOperation() {
      this.operation = null;
      /*getAll 함수를 사용하여 클래스 이름이 operation인 모든 HTML 요소를 선택하고, 이들을 배열로 변환하여 elements 변수에 저장 */
      const elements = Array.from(getAll(".operation"));
      elements.forEach((element) => {
        //elements 배열의 각 요소에 대해 active 클래스를 제거
        element.classList.remove("active");
      });
    }
  }

  const numberButtons = getAll(".cell_button.number");
  const operationButtons = getAll(".cell_button.operation");
  const clearButton = get(".cell_button.clear");
  const allClearButton = get(".cell_button.all_clear");
  const computeButton = get(".cell_button.compute");
  const display = get(".display");

  const calculator = new Calculator(display);

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });

  operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.setOperation(button.innerText);
      calculator.updateDisplay();
    });
  });

  computeButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
  });

  clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
  });

  allClearButton.addEventListener("click", () => {
    calculator.reset();
    calculator.updateDisplay();
  });
})()
