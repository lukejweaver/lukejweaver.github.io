const breakpoint = 800;

function scrollListener() {
    const menuBar = document.getElementById('title');
    const headshot = menuBar.children[0];
    const navBar = menuBar.children[menuBar.children.length - 1];
    const smallName = menuBar.children[1];
    const headshotHeight = headshot.offsetHeight;
    const navBarMarginTop =  window.getComputedStyle(navBar).marginTop.match(/\d+/)[0];
    const navBarSpacing = window.innerHeight > 768 ?
      (parseInt(headshotHeight) - parseInt(navBar.offsetHeight)) :
      (parseInt(headshotHeight) + parseInt(navBarMarginTop));

    let visible = true;

    smallName.style.height = "0px";
  window.addEventListener('scroll', (event) =>  {

    if ((window.scrollY > navBarSpacing) && visible) {
        headshot.style.display = 'none';
        menuBar.style.position = 'sticky';

        smallName.style.height = smallName.scrollHeight + "px";
        smallName.classList.add('grow-in');

        visible = false;
    } else if (window.scrollY < 1 && !visible) {
        headshot.style.display = 'flex';
        menuBar.style.position = 'relative';
        window.scrollTo(0, navBarSpacing);

        smallName.classList.remove('grow-in');

        visible = true;

        smallName.style.height = "0px";
    }
  });
}

function resizeNavBar() {
  const screenWidth = window.innerWidth;

  if (screenWidth < breakpoint) {
    const navBarDots = document.getElementById("expansionDots");
    const navBarContainer = document.getElementById("navLinkContainer");
    const navBarChildren = navBarContainer.children;

    // slice is inclusive, exclusive
    const hiddenChildren = Array.from(navBarChildren).slice(3);

    navBarDots.classList.remove("dn");
    console.log(hiddenChildren);
    navBarDots.children[0].replaceChildren(...hiddenChildren);
  }
}

function navigationDotsAction(event) {
  const navPanel = event.children[0];

  if (!navPanel.style.display) {
    event.children[0].style.display = "flex";
  } else if (navPanel.style.display == "none") {
    event.children[0].style.display = "flex";
  } else {
    event.children[0].style.display = "none";
  }
}


window.addEventListener('DOMContentLoaded', (event) => {
  scrollListener();
  resizeNavBar();
});
