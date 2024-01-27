function applyAnimations() {
  var idsToAnimate = {
    'title': 'enter-bottom'
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
    if (window.scrollY > 0 && menuBar.style.boxShadow != 'rgb(197, 197, 197) 0px 2px 5px') {
      menuBar.style.boxShadow = '0px 2px 5px rgb(197, 197, 197)';
      menuBar.style.padding = '0.5rem';
    } else if (window.scrollY == 0 && menuBar.style.boxShadow == 'rgb(197, 197, 197) 0px 2px 5px') {
      menuBar.style.boxShadow = 'none';
      menuBar.style.padding = '1rem';
    }

    applyAnimations();
  });
}

window.addEventListener('DOMContentLoaded', (event) => {
  scrollListener()
});
