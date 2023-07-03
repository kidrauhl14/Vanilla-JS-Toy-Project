## webRTC
- webRTC 다양한 메서드 및 객체 이해하기
- 비디오 스트리밍 만들기 위한 MediaStream 객체 다루어보기

### MediaStream
https://developer.mozilla.org/en-US/docs/Web/API/MediaStream

- MediaStream은 오디오, 비디오 트랙으로 구성된 미디어 컨텐츠 스트림입니다.
- getTrack()을 통해서 MediaStreamTrack 객체를 반환시킬 수 있습니다.
- MediaStreamTrack은 비디오와 오디오를 구별할 수 있고 트랙을 음소거시킬 수도 있습니다.
### PeerConnection
https://developer.mozilla.org/ko/docs/Web/API/RTCPeerConnection

- RTCPeerConnection 인터페이스는 로컬 컴퓨터와 원격 피어 간의 WebRTC 연결을 담당하며 원격 피어에 연결하기 위한 메서드들을 제공하고, 연결을 유지하고 연결 상태를 모니터링하며 더 이상 연결이 필요하지 않을 경우 연결을 종료합니다.
- MediaStream으로 제작 된 내용을 클라이언트간에 연결을 하여 스트리밍 서비스를 제공해줄 수도 있습니다.

### SessionDescription

- RTCSessionDescription 객체는 setLocalDescription()이라는 함수를 사용해서 로컬을 설정하고 수신측의 signaling 채널로 보낼 수 있습니다.
```js
signalingChannel.onmessage = function (evt) {
    if (!pc)
        start(false);

    var message = JSON.parse(evt.data);
    if (message.sdp)
        pc.setRemoteDescription(new RTCSessionDescription(message), function () {
            if (pc.remoteDescription.type == "offer")
                pc.createAnswer(localDescCreated, logError);
        }, logError);
    else
        pc.addIceCandidate(new RTCIceCandidate(message.candidate),
            function () {}, logError);
};
```

### Signaling
https://developer.mozilla.org/ko/docs/Web/API/WebRTC_API/Signaling_and_video_calling

- 서로 다른 네트워크에 있는 2개의 디바이스들을 서로 연결하기 위해 하는 프로세스를 signaling 이라 부릅니다.
- 각 디바이스들을 상호간에 동의된 서버(socket.io 혹은 websocket을 이용한 서버)에 연결시킵니다. 