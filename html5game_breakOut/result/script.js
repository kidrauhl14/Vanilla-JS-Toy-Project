// 즉시실행함수 (페이지가 로드될 때 즉시 실행됨)
(() => {
  ("use strict");

  //get 함수: 문서에서 특정 엘리먼트를 선택
  const get = (element) => document.querySelector(element);

  //keyEvent 함수: 이벤트 리스너를 추가
  const keyEvent = (control, func) =>
    document.addEventListener(control, func, false);

  //BrickBreak 클래스: 게임의 메인 로직이 포함된 클래스!
  class BrickBreak {
    // parent: 기본값이 "body"인 문자열입니다. 생성된 캔버스가 추가되는 부모 HTML 요소를 지정합니다.
    // "body"는 웹 페이지의 body에 추가하라는 의미입니다.
    // data: 기본값이 빈 객체 {}인 JavaScript 객체입니다. data 매개변수를 사용하여 여러 게임 설정을 전달할 수 있습니다.(예: 공의 속도, 패들의 크기, 벽돌의 위치 등).
  
    constructor(parent = "body", data = {}) {
      // this: 현재 객체 인스턴스를 참조합니다. 즉, BrickBreak 클래스의 인스턴스를 참조합니다. this를 사용하여 클래스의 속성 및 메소드에 액세스
      // 예를 들어, this.canvas = document.createElement("canvas");는 BrickBreak 인스턴스의 canvas 속성에 새로운 HTML 캔버스 요소를 할당합니다.
      // this.lives = data.lives;는 data 객체의 lives 속성 값을 BrickBreak 인스턴스의 lives 속성에 할당합니다.
      //이러한 방식으로 클래스 인스턴스의 각 속성은 고유한 상태를 유지하고, 그 상태는 인스턴스의 동작에 영향을 줍니다.

      this.parent = get(parent);
      this.canvas = document.createElement("canvas");
      this.canvas.setAttribute("width", "480");
      this.canvas.setAttribute("height", "340");
      this.ctx = this.canvas.getContext("2d");
      this.fontFamily =
        "20px-apple-system, BlinkMacSystemFont, 'segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
      this.score = 0;
      this.lives = data.lives;
      this.speed = data.speed;
      this.image = document.createElement("img");
      this.bg = data.bg;
      this.radius = 10;
      this.ballX = this.canvas.width / 2;
      this.ballY = this.canvas.height - 30;
      this.directX = data.speed;
      this.directY = -data.speed;
      this.paddleWidth = data.paddleWidth;
      this.paddleHeight = data.paddleHeight;
      this.rightPressed = false;
      this.leftPressed = false;
      this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
      this.brickRow = data.brickRow;
      this.brickCol = data.brickCol;
      this.brickWidth = data.brickWidth;
      this.brickHeight = data.brickHeight;
      this.brickPad = data.brickPad;
      this.brickPosX = data.brickPosX;
      this.brickPosY = data.brickPosY;
      this.ballColor = data.ballColor;
      this.paddleColor = data.paddleColor;
      this.fontColor = data.fontColor;
      this.brickStartColor = data.brickStartColor;
      this.brickEndColor = data.brickEndColor;
      this.image.setAttribute("src", this.bg);
      this.parent.appendChild(this.canvas);
      this.bricks = [];
    }

    //이 메서드(init)는 게임을 초기화하는데 사용됩니다.
    //벽돌 배열을 만들고, 키 이벤트를 등록하며, 게임 화면을 그립니다.
    init = () => {
      // 벽돌 배열 만들기
      /*이 for 루프는 열(column)을 순회합니다. this.brickCol: 전체 열의 수 */
      for (let colIndex = 0; colIndex < this.brickCol; colIndex++) {

        // this.bricks는 2차원 배열로 사용됩니다.
        //각 열을 나타내는 빈 배열을 생성하여, this.bricks의 colIndex 위치에 할당합니다.
        this.bricks[colIndex] = [];

        // 이 내부 for 루프는 각 열에서 행(row)을 순회합니다.
        // this.brickRow: 전체 행의 수
        for (let rowIndex = 0; rowIndex < this.brickRow; rowIndex++) {
          this.bricks[colIndex][rowIndex] = { x: 0, y: 0, status: 1 };
        }
      }

      //keyEvent 메서드를 호출합니다. (키보드 상태에 따라 패들이 움직이도록 구현)
      this.keyEvent();

      //draw 메서드를 호출
      this.draw();
    };

    /*keydownEvent와 keyupEvent를 함께 사용하는 이유
    : 예를 들어, 사용자가 화살표 키를 누르고 있으면(keyupEvent) 게임 캐릭터가 계속 움직이고,
    키를 뗐을 때(keydownEvent) 캐릭터가 멈추도록 하려면 
    두 이벤트를 모두 사용하여 이를 구현*/

    // keyupEvent: 이 함수는 키보드의 키가 눌려진 상태에서 "떼어질 때" 호출됩니다.
    //즉, 사용자가 키를 눌렀다가 손을 떼면 이 이벤트가 발생하고 해당 함수가 호출됩니다.
    //이 함수 내에서는 일반적으로 키가 떼어졌을 때 수행해야 할 액션을 정의합니다.
    //예를 들어, 게임 캐릭터의 움직임을 멈추게 하거나, 특정 상태를 리셋하는 등의 동작을 수행할 수 있습니다.
    keyupEvent = (event) => {
      if ("Right" === event.key || "ArrowRight" === event.key) {
        this.rightPressed = false;
      } else if ("left" === event.key || "ArrowLeft" === event.key) {
        this.leftPressed = false;
      }
    };

    // keydownEvent: 이 함수는 키보드의 키가 눌려질 때 호출됩니다.
    //즉, 사용자가 키를 누르고 아래로 누르고 있을 때 이 이벤트가 발생하고 해당 함수가 호출됩니다.
    //이 함수 내에서는 일반적으로 키가 눌렸을 때 수행해야 할 액션을 정의합니다.
    //예를 들어, 게임 캐릭터를 움직이게 하거나, 입력 필드에 문자를 입력하는 등의 동작을 수행할 수 있습니다.
    keydownEvent = (event) => {
      if ("Right" === event.key || "ArrowRight" === event.key) {
        this.rightPressed = true;
      } else if ("left" === event.key || "ArrowLeft" === event.key) {
        this.leftPressed = true;
      }
    };

    mousemoveEvent = (event) => {
      const positionX = (event.clientX = this.canvas.offsetLeft);
      //이 조건문은 positionX 값이 0보다 크고 캔버스의 너비보다 작은 경우에만 !(=마우스가 캔버스 안에 있는 경우에만 처리)

      if (0 < positionX && positionX < this.canvas.width) {
        
        //마우스 위치를 기준으로 패들의 중심이 움직이도록 하기 위함
        this.paddleX = positionX - this.paddleWidth / 2;
      }
    };

    keyEvent = () => {
      keyEvent("keyup", this.keyupEvent);
      keyEvent("keydown", this.keydownEvent);
      keyEvent("mousemove", this.mousemoveEvent);
    };

    //drawBall, drawPaddle, drawBricks, drawScore, drawLives 메서드들
    // -> 게임 화면의 공, 패들, 벽돌, 점수, 생명 등을 그리는데 사용됩니다.

    drawBall = () => {
      this.ctx.beginPath();
      this.ctx.arc(this.ballX, this.ballY, this.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.ballColor;
      this.ctx.fill();
      this.ctx.closePath();
    };

    //캔버스(canvas)에 패들(paddle)을 그리는 함수
    drawPaddle = () => {
      
      //새로운 경로 생성. 캔버스에 그림을 그리기 시작할 준비!
      this.ctx.beginPath();
      this.ctx.rect(
        this.paddleX,
        //캔버스의 높이에서 패들의 높이를 빼서 패들이 캔버스의 아래쪽에 위치하게 합니다.
        this.canvas.height - this.paddleHeight, //패들의 y 좌표(세로 위치)
        this.paddleWidth,
        this.paddleHeight
      );

      this.ctx.fillStyle = this.paddleColor;
      this.ctx.fill();
      this.ctx.closePath();
    };

    drawBricks = () => {
      let brickX = 0;
      let brickY = 0;
      let gradient = this.ctx.createLinearGradient(0, 0, 200, 0);
      gradient.addColorStop(0, this.brickStartColor);
      gradient.addColorStop(1, this.brickEndColor);

      for (let colIndex = 0; colIndex < this.brickCol; colIndex++) {
        for (let rowIndex = 0; rowIndex < this.brickRow; rowIndex++) {
          if (1 !== this.bricks[colIndex][rowIndex].status) {
            continue;
          }

          brickX = colIndex * (this.brickWidth + this.brickPad);
          brickY = rowIndex * (this.brickHeight + this.brickPad);

          this.bricks[colIndex][rowIndex].x = brickX;
          this.bricks[colIndex][rowIndex].y = brickY;
          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          this.ctx.fillStyle = gradient;
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    };

    drawScore = () => {
      this.ctx.font = this.fontFamily;
      this.ctx.fillStyle = "#ffffff";
      this.ctx.fillText("점수: " + this.score, 10, 22);
    };

    drawLives = () => {
      this.ctx.font = this.fontFamily;
      this.ctx.fillStyle = "#ffffff";
      this.ctx.fillText("목숨: " + this.lives, this.canvas.width - 68, 22);
    };

    //detectCollision 메서드: 공과 벽돌 사이의 충돌을 감지합니다. 충돌이 발생하면 해당 벽돌은 사라지고, 점수가 증가합니다.
    detectCollision = () => {
      let currentBrick = {};

      for (let colIndex = 0; colIndex < this.brickCol; colIndex++) {
        for (let rowIndex = 0; rowIndex < this.brickRow; rowIndex++) {
          currentBrick = this.bricks[colIndex][rowIndex];

          if (1 !== currentBrick.status) {
            continue;
          }

          if (
            this.ballX > currentBrick.x &&
            this.ballX < currentBrick.x + this.brickWidth &&
            this.ballY < currentBrick.y + this.brickHeight
          ) {
            this.directY = -this.directY;

            //벽돌 깨짐
            currentBrick.status = 0;
            this.score++;

            if (this.score !== this.brickCol * this.brickRow) {
              continue;
            }

            alert("승리!");
            this.reset();
          }
        }
      }
    };

    //draw 메소드: 게임의 애니메이션 루프! 화면을 지우고, 게임 요소를 그린 다음,
    //충돌을 감지하고, 키 입력에 따라 패들을 움직이고, 공을 움직입니다.
    //requestAnimationFrame 함수를 사용하여 부드러운 애니메이션을 만듭니다.
    draw = () => {
      /*document.getElementById를 사용하여 웹 페이지에서 <canvas> 요소를 선택하고,
        getContext('2d') 메서드를 사용하여 2D 렌더링 컨텍스트를 가져옵니다.
        이후 ctx 변수를 사용하여 다양한 그리기 함수를 호출할 수 있습니다.
        예를 들어, 원을 그리거나, 직사각형을 그리거나, 텍스트를 출력하는 등의 작업을 할 수 있습니다. */

      // 모두 지우기
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 백그라운드 설정
      this.ctx.drawImage(
        this.image,
        this.canvas.width / 2 - this.image.width / 2,
        this.canvas.height / 2 - this.image.height / 2
      );

      this.drawBall();
      this.drawPaddle();
      this.drawBricks();
      this.drawScore();
      this.drawLives();
      this.detectCollision();

      // 벽 설정
      if (
        this.ballX + this.directX > this.canvas.width - this.radius ||
        this.ballX + this.directX < this.radius
      ) {
        this.directX = -this.directX;
      }

      // 천장 설정
      if (this.ballY + this.directY < this.radius) {
        this.directY = -this.directY;
      } else if (this.ballY + this.directY > this.canvas.height - this.radius) {
        
        // paddle설정
        if (
          this.ballX > this.paddleX &&
          this.ballX < this.paddleX + this.paddleWidth
        ) {
          this.directY = -this.directY;
        } else {
          this.lives--;

          if (0 === this.lives) {
            alert("실패했습니다.");

            this.reset();
          } else {
            this.ballX = this.canvas.width / 2;
            this.ballY = this.canvas.height - 30;
            this.directX = this.speed;
            this.directY = -this.speed;
            this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
          }
        }
      }

      if (
        this.rightPressed &&
        this.paddleX < this.canvas.width - this.paddleWidth
      ) {
        this.paddleX += 7;
      } else if (this.leftPressed && 0 < this.paddleX) {
        this.paddleX -= 7;
      }

      this.ballX += this.directX;
      this.ballY += this.directY;

      requestAnimationFrame(this.draw);
    };

    //reset 메소드: 게임을 새로고침하여 초기 상태로 되돌립니다.
    reset = () => {
      document.location.reload();
    };
  }

  /*이제 게임을 시작해봅시다!!
  data 객체에 게임 설정을 정의하고, BrickBreak 클래스의 인스턴스를 생성한 후
  init 메소드를 호출하여 게임을 시작 */
  const data = {
    //게임 설정을 담은 객체
    lives: 3,
    speed: 2,
    paddleHeight: 10,
    paddleWidth: 75,
    bg: "./assets/bg.jpeg",
    ballColor: "#04BF55",
    paddleColor: "#05AFF2",
    fontColor: "#F2BB16",
    brickStartColor: "#F29F05",
    brickEndColor: "#F21905",
    brickRow: 3,
    brickCol: 5,
    brickWidth: 75,
    brickHeight: 20,
    brickPad: 10,
    brickPosX: 30,
    brickPosY: 30,
  };

  const brickBreak = new BrickBreak(".canvas", data);

  brickBreak.init();
})();
