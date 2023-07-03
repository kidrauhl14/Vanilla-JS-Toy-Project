;(function () {
  ("use strict");

  const get = (target) => {
    return document.querySelector(target);
  };

  const carousel = get(".carousel");
  const cellCount = 6; //cellCount: carousel에 있는 항목의 총 수
  let selectedIndex = 0; //selectedIndex: 현재 선택된 항목의 인덱스 (carousel에서 현재 활성화된(즉, 사용자에게 보여지는) 항목의 인덱스)


  /*이 함수는 3D 변환을 사용하여 carousel 요소를 회전시킵니다. 
  이를 이해하려면 CSS의 transform 속성과 3D 변환에 대해 알아야 합니다.*/
  const rotateCarousel = () => {
    /* angle: carousel이 회전해야 하는 각도. 
  예를 들어, 만약 총 6개의 항목이 있고 selectedIndex가 1이라면, angle은 -(360/6) 즉 -60도가 됩니다.
  angle에 마이너스 부호를 붙이는 이유는 carousel의 회전 방향을 정하는 것입니다. 웹에서 3D 변환은 오른손 좌표계를 사용합니다.

  오른손 좌표계에서:
  양의 각도는 시계 반대 방향으로 회전합니다.
  음의 각도는 시계 방향으로 회전합니다.
  carousel 예제에서 rotateY 변환을 사용하여 Y축 주위로 회전시키는데, 
  여기서 Y축은 화면으로부터 나오는 방향입니다.

  selectedIndex가 증가하면(즉, 다음 버튼을 누르면), 
  carousel은 시계 방향으로 회전하여 다음(next) 항목을 보여줘야 합니다. 
  이를 위해서는 음의 각도를 사용해야 합니다. 따라서, angle에 음수 부호를 붙입니다.

  예를 들어, 총 6개의 항목이 있을 때:
  selectedIndex가 0이면, 회전 각도는 0/6 * -360 = 0도입니다. 즉, 회전하지 않습니다.
  selectedIndex가 1이면, 회전 각도는 1/6 * -360 = -60도입니다. carousel은 시계 방향으로 60도 회전합니다.
  이렇게 음수를 사용하여 carousel이 올바른 방향으로 회전하게 됩니다. */
    const angle = (selectedIndex / cellCount) * -360;

    /*carousel.style.transform: CSS transform 속성을 조작합니다. 이 속성은 요소에 2D 또는 3D 변환을 적용하는 데 사용됩니다.
  'translateZ(-346px) rotateY(' + angle + 'deg)'는 3D 변환을 나타냅니다.
  translateZ(-346px)는 뷰어를 기준으로 요소를 Z축 방향으로 이동시킵니다. 이 경우, carousel 요소를 뒤로 이동시켜 회전의 중심을 설정합니다.
  
  translateZ(-346px): 이 변환은 요소를 Z축을 따라 이동시킵니다. Z축은 화면의 수직 방향으로, 사용자에게로 나오거나 멀어지는 방향입니다. 
  여기서는 -346px로 설정되어 있어서, 요소가 사용자로부터 346픽셀만큼 뒤로 이동합니다. 
  이렇게 함으로써 carousel의 회전 중심을 화면 뒤로 옮겨, 더 실제 같은 3D 회전 효과를 만듭니다.

  rotateY(angle): 이 변환은 요소를 Y축 주위로 회전시킵니다. Y축은 화면 위로 향하는 수직 방향입니다. 
  angle 매개변수는 위에서 설명한대로, 몇 도로 회전할지 결정합니다. 
  여기서 계산된 angle 값을 사용하여 carousel이 회전하도록 합니다.
  
  carousel이 rotateY를 사용하여 회전하면 
  각 셀이 사용자를 향해 나타났다 사라지는 효과가 나타납니다. 
  이러한 방식으로 carousel에 3D 회전 효과가 적용됩니다. */
    carousel.style.transform = "translateZ(-346px) rotateY(" + angle + "deg)";
  };

  const prevButton = get(".prev_button");
  prevButton.addEventListener("click", () => {
    // carousel의 항목들 사이를 이동하기 위함
    selectedIndex--; //이전 버튼을 클릭할 때 carousel을 왼쪽으로 회전시켜 이전 항목을 보여줌
    rotateCarousel();
  });

  const nextButton = get(".next_button");
  nextButton.addEventListener("click", () => {
    // carousel의 항목들 사이를 이동하기 위함
    selectedIndex++; //사용자가 다음 버튼을 클릭할 때 carousel을 오른쪽으로 회전시켜 다음 항목을 보여줌
    rotateCarousel();
  });
})()
