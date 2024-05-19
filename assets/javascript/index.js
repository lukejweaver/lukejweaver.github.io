var paperOffset = window.innerHeight * 0.40;

var idsToAnimate = {
  'title': ['enter-bottom'],
  'headshot': ['enter-left'],
  'brief': ['enter-right'],
  'paper1': ['enter-right-toss-1', paperOffset],
  'paper2': ['enter-right-toss-2', paperOffset - 10],
  'paper3': ['enter-right-toss-3', paperOffset - 71],
  'cv': ['enter-right-toss-4', paperOffset - 150],
  'journal-1': ['enter-bottom'],
  'journal-2': ['enter-bottom']
}

var highlightToAnimate = [
  'highlight-1',
  'highlight-2',
  'highlight-3'
]

var highlightOffset = window.innerHeight * 0.45;

function applyAnimations() {
  Object.keys(idsToAnimate).forEach(key => {
    var element = document.getElementById(key);
    var animationProperties = idsToAnimate[key];
    var animationOffset = animationProperties[1] ? animationProperties[1] : 0;
    var elementY = element.getBoundingClientRect().y + animationOffset;
    var elementBottomY = element.getBoundingClientRect().height + elementY + animationOffset;

    if (window.innerHeight > elementY && elementY > 0 || window.innerHeight > elementBottomY && elementBottomY > 0) {
      delete(idsToAnimate[key]);
      element.classList.add(animationProperties[0]);
      element.classList.remove('o0');
    }
  });

  highlightToAnimate.forEach(key => {
    var element = document.getElementById(key);
    var elementY = element.getBoundingClientRect().y + highlightOffset;
    var elementBottomY = element.getBoundingClientRect().height + elementY + highlightOffset;

    if (window.innerHeight > elementY && elementY > 0 || window.innerHeight > elementBottomY && elementBottomY > 0) {
      highlightToAnimate.splice(key, 1);
      element.classList.add('draw-in-left');
      element.style.backgroundSize = "100%";
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

function addCorrectDate() {
  const date = new Date();
  let day = date.getDate();
  let monthName = date.toLocaleString('default', { month: 'long' });
  let year = date.getFullYear();

  let currentDate = `${monthName} ${day}, ${year}`;
  const $date = document.getElementById('abstract-date')
  $date.textContent = currentDate;
}

window.addEventListener('DOMContentLoaded', (event) => {
  scrollListener()
  addCorrectDate()
});
