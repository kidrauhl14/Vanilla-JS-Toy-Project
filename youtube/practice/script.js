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
  검색창과 목록 아이템들에 이벤트 리스너들이 등록됩니다. */
  //이 함수는 페이지가 로드될 때 한 번 호출되며, 이를 통해 사용자와 상호작용하기 위한 이벤트 리스너들이 설정됩니다.
  const init = () => {
    /*검색 입력 창($search)에서 키를 눌렀다 놓았을 때(keyup 이벤트), search 함수를 호출. 
    (사용자가 검색어를 입력하는 동안, 실시간으로 검색 결과를 필터링하기 위함) */
    $search.addEventListener('keyup',search)
    /*검색 버튼($searchButton)을 클릭하면 search 함수를 호출.
    검색 버튼을 눌렀을 때 검색 결과를 필터링하는 기능*/
    $searchButton.addEventListener('click', search)

    /*$list에 이벤트리스너 추가!
    각 목록 요소 내의 picture 요소에 대해 
    mouseover 이벤트와 mouseout 이벤트에 대한 리스너 등록. 
    mouseover 이벤트는 마우스가 요소 위로 올라갔을 때 발생하고, 
    mouseout 이벤트는 마우스가 요소 밖으로 나갔을 때 발생합니다. 
    각각 onMouseOver와 onMouseOut 함수가 호출됩니다. */
    for(let index = 0; index < $list.length; index++){
      const $target = $list[index].querySelector('picture')
      $target.addEventListener('mouseover', onMouseOver)
      $target.addEventListener('mouseout', onMouseOut)
    }

    /*$list에 이벤트리스너 추가
    각 목록 요소에 클릭 이벤트 리스너를 추가하여 hashChange 함수를 호출 */
    for(let index = 0; index < $list.length; index++){
      $list[index].addEventListener('click', hashChange)
    }
    /*[페이지 내비게이션 제어] 주소창의 해시(# 뒤의 부분)가 변경될 때 실행될 콜백 함수를 등록. 
    이 콜백 내에서는 주소의 해시 부분에 'view' 문자열이 포함되어 있는지 확인하고, 
    포함되어 있으면 getViewPage() 함수를 호출하고, 그렇지 않으면 getListPage() 함수를 호출.  */
    window.addEventListener('hashchange', () => {
      const isView = -1 < window.location.hash.indexOf('view')
      if (isView) {
        getViewPage()
      } else {
        getListPage()
      }
    })
    /*viewPageEvent 함수를 호출하여, 비디오 플레이어와 관련된 이벤트 리스너들을 추가 */
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
    /*볼륨 슬라이더의 값이 변경되면, 플레이어의 볼륨을 해당 값으로 설정 */
    $volume.addEventListener('change', (e) => { 
      $player.volume = e.target.value
    })
    /*재생되는 동안 timeupdate 이벤트가 발생하면, setProgress 함수를 호출하여 진행 바를 업데이트 */
    $player.addEventListener('timeupdate', setProgress)
    /*비디오가 재생 상태로 변경되면, 재생 버튼의 텍스트를 "pause"로 변경 */
    $player.addEventListener('play', buttonChange($btnPlay, 'pause'))
    /*비디오가 일시 정지 상태로 변경되면, 재생 버튼의 텍스트를 "play"로 변경 */
    $player.addEventListener('pause', buttonChange($btnPlay, 'play'))
    /*볼륨이 변경되면, 음소거 버튼의 텍스트를 "unmute" 또는 "mute"로 변경 */
    $player.addEventListener('volumechange', () => {
      $player.muted ? buttonChange($btnMute, 'unmute') : buttonChange($btnMute, 'mute')
    })
    /*비디오가 끝나면, 비디오를 일시 정지 */
    $player.addEventListener('ended', $player.pause())
    /*진행 바를 클릭하면, getCurrent 함수를 호출하여 현재 시간을 설정 */
    $progress.addEventListener('click', getCurrent)
    /*재생 버튼을 클릭하면, playVideo 함수를 호출하여 비디오를 재생하거나 일시 정지 */
    $btnPlay.addEventListener('click', playVideo)
    /*다시 재생 버튼을 클릭하면, replayVideo 함수를 호출하여 비디오를 처음부터 재생 */
    $btnReplay.addEventListener('click', replayVideo)
    /*정지 버튼을 클릭하면, stopVideo 함수를 호출하여 비디오를 정지 */
    $btnStop.addEventListener('click', stopVideo)
    /*mute 함수를 호출하여 비디오의 소리를 끄거나 켬 */
    $btnMute.addEventListener('click', mute)
    /*전체 화면 버튼을 클릭하면, fullScreen 함수를 호출하여 비디오를 전체 화면으로 전환 */
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
