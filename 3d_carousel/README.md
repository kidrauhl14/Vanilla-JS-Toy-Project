## 3D Carousel

### CSS

#### position

https://developer.mozilla.org/ko/docs/Web/CSS/position

- 문서 상에 요소를 배치하는 방법
  - static (기본값): top, right, bottom, left 속성값에 영향을 받지 않음
  - relative: 해당 HTML 요소의 기본 위치를 기준으로 위치를 설정하는 방식
  - absolute: 원래 위치와 상관없이 위치를 지정할 수 있음. 단, 가장 가까운 상위 요소를 기준으로 위치가 결정됨.
  - fixed: 원래 위치와 상관없이 위치를 지정할 수 있음. 상위 요소 영향받지 않음.

![](https://miro.medium.com/max/613/1*pe9E2kzrX48Wwn_0wKklmw.png)

#### transform

https://developer.mozilla.org/ko/docs/Web/CSS/transform

- 요소에 회전, 크기 조절, 기울이기를 줌

```
transform: translate(12px, 50%);
transform: rotate(0.5turn);
transform: scale(2, 0.5);
...
```

#### translate

https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate()

- transform 의 값
- 요소를 가로 또는 세로 방향으로 재배치

![](<https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate()/translate.png>)

```
/* Single <length-percentage> values */
transform: translate(200px);
transform: translate(50%);

/* Double <length-percentage> values */
transform: translate(100px, 200px);
transform: translate(100px, 50%);
transform: translate(30%, 200px);
transform: translate(30%, 50%);
```

### 원리 이해하기

https://3dtransforms.desandro.com/carousel

#### html

```
<div class="scene">
  <div class="carousel">
    <div class="carousel__cell">1</div>
    <div class="carousel__cell">2</div>
    <div class="carousel__cell">3</div>
    <div class="carousel__cell">4</div>
    <div class="carousel__cell">5</div>
    <div class="carousel__cell">6</div>
    <div class="carousel__cell">7</div>
    <div class="carousel__cell">8</div>
    <div class="carousel__cell">9</div>
  </div>
</div>
```

#### css 속성 설정

- perspective
  - 원근감을 주는 속성. 값이 클수록 원근감이 커짐.
- transform-style
  - 자식에게까지 3D 효과를 주게 함

```
.scene {
  width: 210px;
  height: 140px;
  position: relative;
  perspective: 1000px;
}

.carousel {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
}

.carousel__cell {
  position: absolute;
  width: 190px;
  height: 120px;
  left: 10px;
  top: 10px;
}
```

#### 위치 계산하기

- rotateY 값 알아내기
  - cell이 총 9개
  - 360/9 = 40

```
.carousel__cell:nth-child(1) { transform: rotateY(  0deg); }
.carousel__cell:nth-child(2) { transform: rotateY( 40deg); }
.carousel__cell:nth-child(3) { transform: rotateY( 80deg); }
.carousel__cell:nth-child(4) { transform: rotateY(120deg); }
.carousel__cell:nth-child(5) { transform: rotateY(160deg); }
.carousel__cell:nth-child(6) { transform: rotateY(200deg); }
.carousel__cell:nth-child(7) { transform: rotateY(240deg); }
.carousel__cell:nth-child(8) { transform: rotateY(280deg); }
.carousel__cell:nth-child(9) { transform: rotateY(320deg); }
```

- 탄젠트 방정식으로 translateZ(z축) 값 알아내기
  - 이 z축이 나란해야 함
    ![r값](https://3dtransforms.desandro.com/img/diagram.png)
    ![탄젠트 방정식](https://3dtransforms.desandro.com/img/calc.png)

```
.carousel__cell:nth-child(1) { transform: rotateY(  0deg) translateZ(288px); }
.carousel__cell:nth-child(2) { transform: rotateY( 40deg) translateZ(288px); }
.carousel__cell:nth-child(3) { transform: rotateY( 80deg) translateZ(288px); }
.carousel__cell:nth-child(4) { transform: rotateY(120deg) translateZ(288px); }
.carousel__cell:nth-child(5) { transform: rotateY(160deg) translateZ(288px); }
.carousel__cell:nth-child(6) { transform: rotateY(200deg) translateZ(288px); }
.carousel__cell:nth-child(7) { transform: rotateY(240deg) translateZ(288px); }
.carousel__cell:nth-child(8) { transform: rotateY(280deg) translateZ(288px); }
.carousel__cell:nth-child(9) { transform: rotateY(320deg) translateZ(288px); }
```

![](http://github.khronos.org/siggraph2012course/CanvasCSSAndWebGL/demos/3dtransforms/img/carousel01.png)
