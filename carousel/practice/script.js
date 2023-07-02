/* 캐러셀: 웹 페이지에서 여러 항목(이미지, 텍스트 등)을 수평으로 슬라이드하여 표시하는 컴포넌트 */

//즉시실행함수: 정의와 동시에 함수를 실행합니다. 
(function () {
  ("use strict");

  //get 함수는 DOM 요소를 선택하는데 사용됩니다. document.querySelector를 감싸고 있음
  const get = (target) => {
    return document.querySelector(target);
  };

  class Carousel {
    constructor(carouselElement) {
      //캐러셀과 관련된 변수들을 초기화
      this.carouselElement = carouselElement;
      /*문자열 'carousel_item'은 CSS 클래스 이름을 나타내는 하나의 문자열입니다. 
      이 문자열은 HTML,CSS 코드에서 사용되는 클래스 이름과 일치해야 합니다. */
      this.itemClassName = "carousel_item";
      this.items = this.carouselElement.querySelectorAll(".carousel_item");

      this.totalItems = this.items.length;
      this.current = 0;
      this.isMoving = false;
    }

    /*initCarousel메서드: 캐러셀의 초기 상태를 설정합니다. 
    첫 번째 항목에 'active' 클래스를 추가하고, 
    두 번째 항목에 'next' 클래스를 추가하며, 
    마지막 항목에 'prev' 클래스를 추가합니다. */
    initCarousel() {
      this.isMoving = false;

      this.items[this.totalItems - 1].classList.add("prev");
      /*캐러셀의 첫 번째 아이템에 'active'라는 CSS 클래스를 추가하고, 
      두 번째 아이템에 'next'라는 CSS 클래스를 추가. 
      => 이 클래스들에 정의된 스타일이 각 아이템에 적용되며, 
      캐러셀에서 "활성화된 아이템"과 "다음에 표시될 아이템"을 시각적으로 강조하는데 사용됩니다. */
      this.items[0].classList.add("active");
      this.items[1].classList.add("next");
    }

    /*setEventListeners 메서드: 캐러셀의 이전 및 다음 버튼에 클릭 이벤트 리스너를 추가합니다. */
    setEventListeners() {
      this.prevButton = this.carouselElement.querySelector(
        ".carousel_button--prev"
      );
      this.nextButton = this.carouselElement.querySelector(
        ".carousel_button--next"
      );

      this.prevButton.addEventListener("click", () => {
        this.movePrev();
      });
      this.nextButton.addEventListener("click", () => {
        this.moveNext();
      });
    }

    /*disableInteraction 메서드: 
    이 메서드는 캐러셀이 움직일 때 일시적으로 상호작용을 비활성화하고, 
    캐러셀이 움직임을 마친 후에 다시 상호작용을 활성화하는 역할을 합니다. 이는 캐러셀의 움직임이 완료되기 전에 
    사용자가 빠르게 버튼을 여러 번 누르는 등의 상호작용으로 인해 발생할 수 있는 문제를 방지하는데 도움이 됩니다. */
    disableInteraction() {
      /*this.isMoving = true;
      : 캐러셀이 현재 움직이고 있음을 나타내며, 
      이 시점에서는 캐러셀과의 추가적인 상호작용(예: 다음 항목으로 이동하는 버튼 클릭)을 막아야 합니다. */
      this.isMoving = true;

      /*setTimeout은 JavaScript에서 시간 지연 후 함수를 실행하는데 사용됩니다. 
      이 코드에서는 500 밀리초(0.5초) 후에 익명 함수 () => { this.isMoving = false }를 실행합니다.
      이 익명 함수 내에서 this.isMoving 속성을 false로 설정하는 것은
      캐러셀이 움직임을 완료했음을 나타내며, 이 시점에서 사용자는 다시 캐러셀과 상호작용할 수 있습니다. */
      setTimeout(() => {
        this.isMoving = false;
      }, 500);
    }

    /*moveCarouselTo 메서드: 캐러셀을 특정 위치로 이동시키는 로직을 담당합니다. 
    캐러셀 내의 각 항목에 적절한 클래스를 할당하여 애니메이션 효과를 설정합니다. */
    moveCarouselTo() {
      if (!this.isMoving) {
        this.disableInteraction();

        let prev = this.current - 1;
        let next = this.current + 1;

        if (this.current === 0) {
          prev = this.totalItems - 1;
        } else if (this.current === this.totalItems - 1) {
          next = 0;
        }

        for (let i = 0; i < this.totalItems; i++) {
          if (i == this.current) {
            this.items[i].className = this.itemClassName + " active";
          } else if (i == prev) {
            this.items[i].className = this.itemClassName + " prev";
          } else if (i == next) {
            this.items[i].className = this.itemClassName + " next";
          } else {
            this.items[i].className = this.itemClassName;
          }
        }
      }
    }

    /*moveNext, movePrev 메서드: 캐러셀을 다음 또는 이전 항목으로 이동시킵니다. */
    moveNext() {
      if (!this.isMoving) {
        if (this.current === this.totalItems - 1) {
          this.current = 0;
        } else {
          this.current++;
        }

        this.moveCarouselTo();
      }
    }

    movePrev() {
      if (!this.isMoving) {
        if (this.current === 0) {
          this.current = this.totalItems - 1;
        } else {
          this.current--;
        }

        this.moveCarouselTo();
      }
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    /*HTML 문서의 내용이 완전히 로드되면, 캐러셀 요소를 선택하고 
    캐러셀 인스턴스를 생성한 후 초기화하고 
    이벤트 리스너를 설정합니다.*/
    const carouselElement = get(".carousel");
    const carousel = new Carousel(carouselElement);
    carousel.initCarousel();

    /*carousel 객체의 setEventListeners 메서드를 호출하여 캐러셀의 이전 및 다음 버튼에 이벤트 리스너를 설정합니다. 
    이 메서드는 사용자가 이전 또는 다음 버튼을 클릭하면 캐러셀이 이동하도록 설정합니다. */
    carousel.setEventListeners();
  });
})();
