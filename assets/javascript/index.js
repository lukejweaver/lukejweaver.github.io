function applyAnimations() {
  var idsToAnimate = {
    'title': 'enter-bottom',
    'headshot': 'enter-left',
    'brief': 'enter-right'
  }

  Object.keys(idsToAnimate).forEach(key => {
    var element = document.getElementById(key);
    var animation = idsToAnimate[key];
    var elementY = element.getBoundingClientRect().y;
    var elementBottomY = element.getBoundingClientRect().height + elementY;

    if (window.innerHeight > elementY && elementY > 0 || window.innerHeight > elementBottomY && elementBottomY > 0) {
      element.classList.add(animation);
      element.classList.remove('o0');
    }
  });
}

function scrollListener() {

  setTimeout(() => {applyAnimations()}, 10)

  window.addEventListener('scroll', (event) =>  {
    var menuBar = document.getElementById('menu-bar');
    if (window.scrollY > 0) {
      menuBar.style.padding = '1rem';
    } else if (window.scrollY == 0) {
      menuBar.style.padding = '1.5rem';
    }

    applyAnimations();
  });
}

window.addEventListener('DOMContentLoaded', (event) => {
  scrollListener()
});
