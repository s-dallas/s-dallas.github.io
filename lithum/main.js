const topCircle = document.getElementById('topCircle');
const bottomCircle = document.getElementById('bottomCircle');
const topCircle2 = document.getElementById('topCircle2');
const bottomCircle2 = document.getElementById('bottomCircle2');
const stepContainer = document.querySelector('.container');
const containerWidth = document.querySelector('.container').offsetWidth;

let trailCount = 0;

setInterval(() => {
  const trailTop = document.createElement('img');
  trailTop.src = 'static/footlarge.png'; // Path to the top image
  trailTop.className = 'circle trail';
  trailTop.style.left = `${topCircle.offsetLeft}px`;
  trailTop.style.top = `${topCircle.offsetTop}px`; 
  trailTop.style.transition = 'opacity 1s';
  stepContainer.appendChild(trailTop);

  const trailBottom = document.createElement('img');
  trailBottom.src = 'static/footlarge.png'; // Path to the bottom image
  trailBottom.className = 'circle trail';
  trailBottom.style.left = `${bottomCircle.offsetLeft-11}px`;
  trailBottom.style.top = `${bottomCircle.offsetTop-25}px`;   
  trailBottom.style.transition = 'opacity 1s';
  stepContainer.appendChild(trailBottom);

  setTimeout(() => {
    trailTop.style.opacity = 0; // Fade out after a few seconds
    trailBottom.style.opacity = 0; // Fade out after a few seconds
    setTimeout(() => {
      trailTop.remove(); // Remove the element from the DOM
      trailBottom.remove(); // Remove the element from the DOM
    }, 1000); // Wait for the fade-out animation to complete before removing
  }, 3000); // Adjust the duration of the trails (in milliseconds)
}, 500);

let xPosTop = 0;
let xPosBottom = 0;
let xPosTop2 = -50;
let xPosBottom2 = -50;
let jumpDistance = 50;
let flag = false;
let flag2 = true;

function jump(circle, xPos) {
    circle.style.left = `${xPos}px`;
  }

  
  function animate1() {
    if (flag) {
      jump(topCircle, xPosTop);
      xPosTop += jumpDistance;
        flag = !flag;
    } else {
      jump(bottomCircle, xPosBottom);
      xPosBottom += jumpDistance;
        flag = !flag;
    }
    if (topCircle.style.left >= containerWidth) {
        topCircle.style.left = 0;
        bottomCircle.style.left = 10;        
    }
    setTimeout(animate2, 2000);
}


function animate2() {
    if (flag2) {
        jump(topCircle2, xPosTop2);
        xPosTop2 += jumpDistance;
                 flag2 = !flag2;
        
      } else {
        jump(bottomCircle2, xPosBottom2);
        xPosBottom2 += jumpDistance;
          flag2 = !flag2;
        }
        if (topCircle2.style.left >= containerWidth) {
            topCircle2.style.left = 0;
            bottomCircle2.style.left = 10;
        }
}
  


  setInterval(animate1, 300);