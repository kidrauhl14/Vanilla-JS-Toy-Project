;(function () {
  'use strict'
  const get = (target) => {
    return document.querySelector(target)
  }

  const $button = get('.modal_open_button')
  const $modal = get('.modal')
  const $modalConfirmButton = get('.modal_button.confirm')
  const $modalCancelButton = get('.modal_button.cancel')
  const $body = get('body')


  // 모달 창의 상태를 바꾸는 기능
  // toggleModal 함수는 $modal과 $body 클래스 리스트에 
  // show와 scroll_lock을 추가하거나 제거하는 기능을 수행
  const toggleModal = () => {
    // $modal이라는 DOM 요소의 클래스 리스트에서 'show'라는 클래스 이름을 토글합니다.
    // 즉, 'show' 클래스가 있으면 제거하고, 없으면 추가합니다. (toggle 뜻: 어떤 상태를 "교대로" 바꾸는 것)
    // 'show' 클래스는 보통 모달이 보여지는 상태를 스타일링하기 위해 사용됩니다
    $modal.classList.toggle('show')

    // $body라는 DOM 요소의 클래스 리스트에서 'scroll_lock'이라는 클래스 이름을 토글합니다.
    // 즉, 'scroll_lock' 클래스가 있으면 제거하고, 없으면 추가합니다.
    // 'scroll_lock' 클래스는 보통 모달이 열려있는 동안 페이지 스크롤을 방지하기 위해 사용됩니다.
    $body.classList.toggle('scroll_lock')
  }


  // $button을 클릭하거나 
  // $modalConfirmButton, $modalCancelButton을 클릭하면 
  // toggleModal 함수가 호출되어 모달 창의 상태가 바뀌며, 페이지 스크롤이 잠기거나 해제됩니다.

  $button.addEventListener('click', () => {
    toggleModal()
  })

  $modalConfirmButton.addEventListener('click', () =>{
    toggleModal();
  })

  $modalCancelButton.addEventListener('click', ()=>{
    toggleModal();
  })

  window.addEventListener('click', (e) => {
    if(e.target === $modal){
      toggleModal()
    }
  })
})()
