<<<<<<< HEAD
## baseball

- 야구 게임 구현
- 10번의 시도로 4자리의 숫자를 맞추는 게임
- 중복된 번호 체크 및 스트라이크와 볼의 개념에 대한 이해

### input type="number"
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number

- input type number의 min과 max에 대한 이해

### calc
https://developer.mozilla.org/en-US/docs/Web/CSS/calc()

- 스타일 사용시에 사용할 수 있는 계산식
### Object destructuring
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring

- Object를 다시 각각의 선언으로 사용할 수 있습니다.

### new Set()
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set

- 새로운 배열을 중복없이 반환하는 Set()의 사용예제
- 하나의 Set 내 값은 한 번만 나타날 수 있습니다. 즉, 어떤 값은 그 Set 콜렉션 내에서 유일합니다.

### parseInt
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/parseInt

- parseInt의 기본값은 10이 아닙니다. 즉, 10진수로 변환되지 않습니다.
- 첫번째 인자를 특정 radix(진수) 값으로 표현한 정수가 반환됩니다. 
=======
## To do list

- 투두리스트 구현
- json-server를 활용해서 로컬에 REST API 구축 및 연동
- 기본적인 데이터 처리인 생성, 읽기, 수정, 삭제(CRUD)를 구현

### strict mode

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode

- 엄격하게 문법 검사를 실시하여 기존에는 무시되던 오류를 발생시킴

### json-server

https://github.com/typicode/json-server

- 짧은 시간에 REST API를 구축해주는 패키지
- 실제 프로덕션에서는 사용하지 않음
- npm을 통해 설치 가능

### DOMContentLoaded

https://developer.mozilla.org/ko/docs/Web/API/Window/DOMContentLoaded_event

- 초기 HTML 문서를 완전히 불러오고 분석했을 때 발생

```
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});
```

### Javacript fetch API

https://developer.mozilla.org/ko/docs/Web/API/Fetch_API

- AJAX 요청을 하기 위한 기술
- AJAX란 서버에서 추가 정보를 비동기적으로 가져올 수 있게 해주는 포괄적인 기술을 나타내는 용어
- XHR, JQuery, Fetch 등의 선택지가 있지만 이번에는 최신 기술인 fetch API를 사용

#### fetch API 사용법

https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch

- fetch api의 response는 실제 json 이 아니다.
- 따라서 fetch api에서는 추가 메서드를 호출해 응답 본문을 받을 필요가 있다. (`.json()`)
  - axios는 이 과정을 자동으로 해주기 떄문에 바로 response를 받을 수 있다.
- body 데이터 타입은 헤더의 content-type 헤더와 일치해야 한다.

```
var url = 'https://example.com/profile';
var data = {username: 'example'};

fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));

```

### HTML data-\*

https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/Use_data_attributes

- custom attibute를 만들 때 사용
- 표준이 아닌 속성이나 추가적인 DOM 속성

#### javascript에서 접근하기

- dataset 객체를 통해 data 속성을 가져오기 위해서는 속성 이름의 data- 뒷 부분을 사용
- 대시들은 camelCase로 변환되는 것에 주의

```
var article = document.getElementById('electriccars');

article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
```

#### javascript로 할당하기

```
var article = document.getElementById('electriccars');

article.dataset.columns = 3
article.dataset.indexNumber = "12314"
```
>>>>>>> 6cf6e8bed446289d3fdb90ddb91514531cc4c260
