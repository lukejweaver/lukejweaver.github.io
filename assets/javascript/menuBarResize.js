const MINWINDOWWIDTH = 700;
const displayMenu = (elem) => {
  elem.style.display = 'block';

  setTimeout(() => {elem.style.opacity = '100%';}, 10)
};
const hideMenu = (elem) => {
  elem.style.opacity = '0%';

  setTimeout(() => {elem.style.display = 'none';}, 200)
};

function menuBarPhone() {
  // Initial setup of hamburger on page reload
  if (window.innerWidth > MINWINDOWWIDTH) {
    var elements = document.getElementsByClassName('header-link');

    Array.from(elements).forEach((element) => {
      element.style.display = 'inline-block';
    });
    document.getElementById('list').style.display = 'none';
  } else {
    var elements = document.getElementsByClassName('header-link');

    Array.from(elements).forEach((element) => {
      element.style.display = 'none';
    });
    document.getElementById('list').style.display = 'inline-block';
  }

  var isFullHeader = false;

  window.addEventListener("resize", function() {
    isFullHeader = updateHeaderState(isFullHeader);
  });
}

function updateHeaderState(isFullHeader) {
  if (window.innerWidth > MINWINDOWWIDTH && !isFullHeader) {
    var elements = document.getElementsByClassName('header-link');

    Array.from(elements).forEach((element) => {
      element.style.display = 'inline-block';
    });
    document.getElementById('list').style.display = 'none';

    return true;
  } else if (window.innerWidth <= MINWINDOWWIDTH && isFullHeader) {
    var elements = document.getElementsByClassName('header-link');

    Array.from(elements).forEach((element) => {
      element.style.display = 'none';
    });
    document.getElementById('list').style.display = 'inline-block';

    return false;
  } else {
    return isFullHeader;
  }
}

function addClickEventListeners() {
  document.getElementById('list').addEventListener('click', (event) => {
    displayMenu(document.getElementById('phoneMenu'));
  });
  document.getElementById('phoneMenuClose').addEventListener('click', (event) => {
    hideMenu(document.getElementById('phoneMenu'));
    // Otherwise clicking the x also clicks the hamburger button
    event.stopPropagation();
  });
}

window.addEventListener('DOMContentLoaded', (event) => {
  addClickEventListeners();
  menuBarPhone();
});
