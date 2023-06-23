/*무한 스크롤: 사용자가 페이지의 끝에 도달하면 자동으로 새로운 콘텐츠를 로드하는 기능 */
;(function () {
  ("use strict");

  const get = (target) => {
    return document.querySelector(target);
  };

  let currentPage = 1;
  let total = 10;
  const limit = 10;
  const end = 100;

  const $posts = get(".posts");
  const $loader = get(".loader");

  const hideLoader = () => {
    $loader.classList.remove("show");
  };

  const showLoader = () => {
    $loader.classList.add("show");
  };

  const showPosts = (posts) => {
    /*함수는 posts 배열을 순회하면서 각 게시물(post)에 대해 작업을 수행합니다. 
    forEach 메서드: 배열의 각 요소에 대해 지정된 콜백 함수를 실행*/
    posts.forEach((post) => {
      const $post = document.createElement("div");

      /*생성된 <div> 요소에 'post'라는 클래스를 추가합니다. 
      이 클래스는 CSS 스타일링에 사용될 수 있습니다.*/
      $post.classList.add("post");

      /*생성된 <div> 요소의 내부 HTML을 설정합니다. 
      템플릿 리터럴을 사용하여 동적으로 게시물 데이터(post.id, post.title, post.body)를 HTML 구조에 삽입*/
      $post.innerHTML = `
          <div class = "header">
            <div class="id">${post.id}.</div>
              <div class="title">${post.title}.</div>
          </div>
          <div class="body">${post.body}</div>
      `;
      /* 마지막으로, 생성된 $post 요소를 DOM에 추가합니다.*/
      $posts.appendChild($post);
    });
  };

  /* fetch(API_URL)는 제공된 URL에 네트워크 요청을 보냅니다. 
  이 함수는 Promise(=요청의 응답)를 반환합니다. 
  await 키워드는 이 Promise가 해결될 때까지 함수의 실행을 일시 중단합니다.*/

  /*이 함수는 제공된 페이지 번호와 한 페이지당 항목 수에 따라 
    JSONPlaceholder API라는 테스트용 REST API를 통해 포스트 목록을 비동기적으로 가져오는 역할을 합니다. 
    만약 API 요청이 실패하면 에러를 던지고, 성공하면 가져온 데이터를 반환합니다. */
  const getPosts = async (page, limit) => {
    /*page: API에서 가져올 페이지 번호, limit: 페이지 당 포스트의 수  */

    /*API_URL: 실제로 API 요청을 보낼 주소를 저장하는 상수. 
    주소는 backtick(``)으로 묶은 템플릿 문자열로 작성, ${page}와 ${limit}은 해당 변수의 값을 URL에 삽입합니다. */
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
    const response = await fetch(API_URL);

    /*응답(Response) 객체의 ok 속성은 
      HTTP 상태 코드가 성공을 나타내는지(즉, 200-299 범위에 있는지) 확인합니다. 
      만약 ok가 false라면, 에러가 발생한 것으로 간주하고 사용자 정의 에러를 던집니다(throw). */
    if (!response.ok) {
      throw new Error("에러가 발생했습니다.");
    }

    /*response.json()은 응답 본문을 JSON 형태로 파싱하는 메서드입니다. 
    이 메서드 역시 Promise를 반환하므로, await를 사용하여 Promise가 해결될 때까지 기다립니다. 
    이 Promise가 해결되면 파싱된 JSON 데이터가 반환됩니다. */
    return await response.json();
  };

  const loadPosts = async (page, limit) => {
    showLoader();
    try {
      const response = await getPosts(page, limit);
      showPosts(response);
    } catch (error) {
      console.error(error.message);
    } finally {
      hideLoader();
    }
  };

  /*스크롤 이벤트를 처리하는 함수. 
  웹 페이지에서 사용자가 스크롤할 때마다 이 함수가 호출되며, 특정 조건에 따라 추가적인 작업을 수행. */
  const handleScroll = () => {
    /*scrollTop: 문서가 수직으로 얼마나 스크롤되었는지 픽셀 단위로 나타냅니다.
      scrollHeight: 문서의 전체 높이를 픽셀 단위로 나타냅니다.
      clientHeight: 화면에 보이는 뷰포트의 높이를 픽셀 단위로 나타냅니다. */
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    /* 무한 스크롤의 종료 조건.
    total === end이면, 더 이상 로드할 콘텐츠가 없다고 판단-> 스크롤 이벤트 리스너를 제거하고 함수 종료. */
    if (total === end) {
      window.removeEventListener("scroll", handleScroll);
      return;
    }

    /*사용자가 페이지 하단에 거의 도달한 경우(스크롤 위치와 뷰포트 높이의 합이 전체 문서 높이에서 5픽셀을 뺀 값보다 크거나 같을 때), 
    새로운 콘텐츠를 로드하는 로직이 실행됨.*/
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      /*currentPage를 증가시키고 total을 10 증가시킴.
        loadPosts(currentPage, limit)를 호출하여 새로운 콘텐츠를 로드합니다. 
        currentPage: 로드할 페이지 번호, limit: 한 번에 로드할 항목의 수 */
      currentPage++;
      total += 10;
      loadPosts(currentPage, limit);
      return;
    }
  };

  /*이 부분은 HTML 문서가 완전히 로드되고 DOM이 준비된 후에! 실행됨. (스크립트를 통해 DOM을 안전하게 조작할 수 있음)
    즉, 이벤트 리스너가 'DOMContentLoaded' 이벤트를 감지하면 
    loadPosts(currentPage, limit) 함수를 호출하고, 'scroll' 이벤트에 대한 이벤트 리스너를 등록합니다. */
  window.addEventListener("DOMContentLoaded", () => {
    loadPosts(currentPage, limit);
    window.addEventListener("scroll", handleScroll);
  });
})()
