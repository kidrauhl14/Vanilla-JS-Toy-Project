## 벽돌깨기

- 2D 벽돌깨기 게임 만들기
- 객체를 사용한 옵션화를 통해 다양한 상황 만들기

### 벽돌깨기 참고문서
- https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript

### 객체를 사용해서 옵션 만들기
```js
  const data = {
    lives: 5,
    speed: 2,
    paddleHeight: 10,
    paddleWidth: 75,
    bg: './assets/bg.jpeg',
    ballColor: '#04BF55',
    paddleColor: '#05AFF2',
    fontColor: '#F2BB16',
    brickStartColor: '#F29F05',
    brickEndColor: '#F21905',
    brickRow: 3,
    brickCol: 5,
    brickWidth: 75,
    brickHeight: 20,
    brickPad: 10,
    brickPosX: 30,
    brickPosY: 30,
  }
```

- 위와 같이 옵션화를 하여 게임을 조금 더 다양한 상황으로 만들어볼 수 있습니다.

### 벽돌이 닿을 때 방향 전환
```js
detectCollision = () => {
    let currentBrick = {}

    for (let colIndex = 0; colIndex < this.brickCol; colIndex++) {
    for (let rowIndex = 0; rowIndex < this.brickRow; rowIndex++) {
        currentBrick = this.bricks[colIndex][rowIndex]

        if (1 !== currentBrick.status) {
            continue
        }

        if (
        this.ballX > currentBrick.x &&
        this.ballX < currentBrick.x + this.brickWidth &&
        this.ballY > currentBrick.y &&
        this.ballY < currentBrick.y + this.brickHeight
        ) {
        this.directY = -this.directY
        // 벽돌깨짐
        currentBrick.status = 0
        this.score++
    }
    }
}
```