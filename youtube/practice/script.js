;(function () {
  ("use strict");

  /*단일 DOM 요소를 선택하여 반환 */
  const get = (target) => document.querySelector(target);
  /*여러 DOM 요소를 선택하여 반환 */
  const getAll = (target) => document.querySelectorAll(target);

  const $search = get('#search')
  const $list = getAll('.contents.list figure')
  const $searchButton = get('.btn_search')

  const $player = get('.view video')
  const $btnPlay = get('.js-play')
  const $btnReplay = get('.js-replay')
  const $btnStop = get('.js-stop')
  const $btnMute = get('.js-mute')
  const $progress = get('.js-progress')
  const $volume = get('.js-volume')
  const $fullScreen = get('.js-fullScreen')


  /*초기화 담당. 이 함수가 호출되면, 이벤트 리스너들이 DOM 요소에 바인딩됩니다. 
  검색창과 목록 아이템들에 이벤트 리스너들이 설정됩니다. */
  const init = () => {
    $search.addEventListener('keyup',search)
    $searchButton.addEventListener('click', search)
    for(let index = 0; index < $list.length; index++){
      const $target = $list[index].querySelector('picture')
      $target.addEventListener('mouseover', onMouseOver)
      $target.addEventListener('mouseout', onMouseOut)
    }
    for(let index = 0; index < $list.length; index++){
      $list[index].addEventListener('click', hashChange)
    }
    window.addEventListener('hashchange', () => {
      const isView = -1 < window.location.hash.indexOf('view')
      if (isView) {
        getViewPage()
      } else {
        getListPage()
      }
    })
    viewPageEvent()
  };

  /*검색창에 입력된 텍스트를 사용하여 목록의 아이템들을 필터링
  일치하는 아이템들은 표시되고, 일치하지 않는 아이템들은 숨겨집니다. */
  const search = () => {
    let searchText = $search.value.toLowerCase()
    for(let index = 0; index < $list.length; index++){
      const $target = $list[index].querySelector('strong')
      const text = $target.textContent.toLowerCase()
      if(-1 < text.indexOf(searchText)){
        $list[index].style.display = 'flex'
      } else{
        $list[index].style.display = 'none'
      }
    }
  };

  /*마우스가 요소 위로 이동할 때 실행됩니다. 
  해당 요소의 이미지 소스를 변경하여 마우스 오버 시 이미지가 변경되도록 합니다 */
  const onMouseOver = (e) => {
    const webpPlay = e.target.parentNode.querySelector('source')
    webpPlay.setAttribute('srcset', './assets/sample.webp')
  };

  /*마우스가 요소에서 벗어날 때 실행됩니다. 
  이미지 소스를 원래대로 되돌립니다. */
  const onMouseOut = (e) => {
    const webpPlay = e.target.parentNode.querySelector('source')
    webpPlay.setAttribute('srcset', './assets/sample.jpg')
  };

  /*목록 아이템이 클릭될 때 호출됩니다. 
  클릭한 아이템에 해당하는 뷰 페이지를 로드하는데 사용됩니다. */
  const hashChange = (e) => {
    e.preventDefault()
    const parentNode = e.target.closest('figure')
    const viewTitle = parentNode.querySelector('strong').textContent
    window.location.hash = `view&${viewTitle}`
    getViewPage()
  };

  /*뷰 페이지를 표시하는데 사용됩니다. 
  목록은 숨겨지고 뷰 페이지만 표시됩니다. */
  const getViewPage = () => {
    const viewTitle = get('.view strong')
    const urlTitle = decodeURI(window.location.hash.split('&')[1])
    viewTitle.innerText = urlTitle

    get('.list').style.display = 'none'
    get('.view').style.display = 'flex'
    }


  /*목록 페이지를 표시하는데 사용됩니다. 
  뷰 페이지는 숨겨지고 목록 페이지만 표시됩니다. */
  const getListPage = () => {
    get('.view').style.display = 'none'
    get('.list').style.display = 'flex'
  };

  /*버튼의 텍스트를 변경하는데 사용됩니다. 
  btn은 변경할 버튼 요소이고, value는 새로운 텍스트입니다. */
  const buttonChange = (btn, value) => {
    btn.innerHTML = value
  };

  /*뷰 페이지에서 발생하는 이벤트들을 처리.
  비디오 플레이어의 컨트롤들과 관련된 이벤트 리스너들이 설정됩니다 */
  const viewPageEvent = () => {
    $volume.addEventListener('change', (e) => {
      $player.volume = e.target.value
    })
    $player.addEventListener('timeupdate', setProgress)
    $player.addEventListener('play', buttonChange($btnPlay, 'pause'))
    $player.addEventListener('pause', buttonChange($btnPlay, 'play'))
    $player.addEventListener('volumechange', () => {
      $player.muted
        ? buttonChange($btnMute, 'unmute')
        : buttonChange($btnMute, 'mute')
    })
    $player.addEventListener('ended', $player.pause())
    $progress.addEventListener('click', getCurrent)

    $btnPlay.addEventListener('click', playVideo)
    $btnReplay.addEventListener('click', replayVideo)
    $btnStop.addEventListener('click', stopVideo)
    $btnMute.addEventListener('click', mute)
    $fullScreen.addEventListener('click', fullScreen)
  };

  /*비디오 플레이어의 프로그레스 바를 클릭했을 때, 
  비디오의 현재 시간을 업데이트*/
  const getCurrent = (e) => {
    let percent = e.offsetX / $progress.offsetWidth
    $player.currentTime = percent * $player.duration
    e.target.value = Math.floor(percent / 100)
  };

  /*비디오 플레이어의 진행 상태를 진행 바에 업데이트*/
  const setProgress = () => {
    let percentage = Math.floor((100 / $player.duration) * $player.currentTime)
    $progress.value = percentage
  };

  /*비디오 재생*/
  const playVideo = () => {
    if($player.paused || $player.ended){
      buttonChange($btnPlay, 'pause')
      $player.play()
    } else{
      buttonChange($btnPlay, 'play')
      $player.pause()
    }
  };

  /*비디오 정지*/
  const stopVideo = () => {
    $player.pause()
    $player.currentTime = 0
    buttonChange($btnPlay, 'play')
  }
  /*플레이어를 초기상태로 재설정*/
  const resetPlayer = () => {
    $progress.value = 0
    $player.currentTime = 0
    buttonChange($btnPlay, 'play')
  }

  /*비디오를 처음부터 다시 재생 */
  const replayVideo = () => {
    resetPlayer()
    $player.play()
    buttonChange($btnPlay, 'pause')
  }

  /*비디오의 음소거 상태를 전환 */
  const mute = () => {
    /*$player.muted는 비디오 플레이어의 음소거 상태를 나타내는 속성. 
    이 값이 true면 음소거 상태, false면 음소거가 아님. */
    if ($player.muted) {
      buttonChange($btnMute, "mute");
      $player.muted = false;
    } else {
      buttonChange($btnMute,"unmute"); /*음소거 버튼의 레이블을 "unmute"로 변경 */
      $player.muted = true;
    }
  }

  /* 비디오를 전체화면으로 전환하거나, 전체화면에서 나오도록 함 */
  /*이 함수는 브라우저별로 전체 화면 API를 다르게 처리하여 
    다양한 브라우저에서 작동하도록 함 */
  const fullScreen = () => {

    if ($player.requestFullscreen)
    /*표준 requestFullscreen 메서드를 사용하여 전체 화면 모드를 지원하는지 확인 */
      if (document.fullScreenElement) { 
        document.cancelFullScreen()
      } else {
        $player.requestFullscreen()
      }

    /* Internet Explorer의 경우, 
    msRequestFullscreen 메서드를 사용하여 전체 화면 모드를 지원하는지 확인 */
    else if ($player.msRequestFullscreen)
      if (document.msFullscreenElement) {
        document.msExitFullscreen()
      } else {
        $player.msRequestFullscreen()
      }

    /* Firefox의 경우 */
    else if ($player.mozRequestFullScreen)
      if (document.mozFullScreenElement) {
        document.mozCancelFullScreen()
      } else {
        $player.mozRequestFullScreen()
      }
    
    /* Chrome, Safari 및 기타 WebKit 기반 브라우저의 경우 */
    else if ($player.webkitRequestFullscreen)
      if (document.webkitFullscreenElement) {
        document.webkitCancelFullScreen()
      } else {
        $player.webkitRequestFullscreen()
      }
    else {
      alert('Not Supported')
    }

  init()
})()
