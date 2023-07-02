(function () {
  "use strict";

  const get = (target) => {
    return document.querySelector(target);
  };

  class Carousel {
    constructor(carouselElement) {
      this.carouselElement = carouselElement;
      /*문자열 'carousel_item'은 CSS 클래스 이름을 나타내는 하나의 문자열입니다. 
      이 문자열은 HTML,CSS 코드에서 사용되는 클래스 이름과 일치해야 합니다. */
      this.itemClassName = "carousel_item";
      this.items = this.carouselElement.querySelectorAll(".carousel_item");

      this.totalItems = this.items.length;
      this.current = 0;
      this.isMoving = false;
    }

    initCarousel() {
      this.isMoving = false;

      this.items[this.totalItems - 1].classList.add("prev");
      /*캐러셀의 첫 번째 아이템에 'active'라는 CSS 클래스를 추가하고, 
      두 번째 아이템에 'next'라는 CSS 클래스를 추가하는 것입니다. 
      이렇게 하면, 이 클래스들에 정의된 스타일이 각 아이템에 적용되며, 
      보통은 캐러셀에서 활성화된 아이템과 다음에 표시될 아이템을 시각적으로 강조하는데 사용됩니다. */
      this.items[0].classList.add("active");
      this.items[1].classList.add("next");
    }

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

    disableInteraction() {
      this.isMoving = true;
      setTimeout(() => {
        this.isMoving = false;
      }, 500);
    }

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
    const carouselElement = get(".carousel");

    const carousel = new Carousel(carouselElement);
    carousel.initCarousel();
    carousel.setEventListeners();
  });
})();
