## html5game

- http://slither.io/
- html5로 지렁이 게임 만들기
- canvas 이해

### canvas
1. https://developer.mozilla.org/ko/docs/Web/API/Canvas_API
1. https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Basic_usage

- 캔버스의 기본 작성법 이해

### user-select
https://caniuse.com/?search=user-select

- 텍스트 드래그 방지와 같은 요소에 사용
- html5 캔버스 게임이기 때문에 게임성을 더 끌어올리기 위해서 사용


### requestAnimationFrame
1. https://developer.mozilla.org/ko/docs/Web/API/window/requestAnimationFrame
1. https://codepen.io/oinochoe/pen/jOGMoKJ

- 화면에 새로운 애니메이션을 업데이트할 준비가 될때마다 이 메소드를 호출하는것이 좋습니다.
- 콜백의 수는 보통 1초에 60회지만, 일반적으로 대부분의 브라우저에서는 W3C 권장사항에 따라 그 수가 디스플레이 주사율과 일치하게됩니다.

```js
var start = null;
var element = document.getElementById('SomeElementYouWantToAnimate');
element.style.position = 'absolute';

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.left = Math.min(progress / 10, 200) + 'px';
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

### localStorage
https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage

- Document출처의 Storage에 저장 및 접근이 가능합니다.
- 저장한 데이터는 브라우저 세션 간에 공유됩니다.