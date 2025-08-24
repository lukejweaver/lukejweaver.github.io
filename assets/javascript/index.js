let paperOffset = window.screen.height * 0.40;

let idsToAnimate = {
  'title': ['enter-bottom'],
  'headshot': ['enter-left'],
  'brief': ['enter-right'],
  'paper1': ['enter-right-toss-1', paperOffset],
  'paper2': ['enter-right-toss-2', paperOffset - 10],
  'paper3': ['enter-right-toss-3', paperOffset - 71],
  'cv': ['enter-right-toss-4', paperOffset - 150],
  'journal-1': ['enter-bottom'],
  'journal-2': ['enter-bottom'],
  'journal-3': ['enter-bottom']
}

let highlightToAnimate = [
  'highlight-1',
  'highlight-2',
  'highlight-3'
]

let highlightOffset = window.screen.height * 0.45;

let currentPage = "1";
let pageData = {};

let titleAbstract = null;
let researchContainer = null;
let maxHeight = null;
let childrenArray = null;
let childrenHeightArray = null;
let navResButtons = null;

function applyAnimations() {
  Object.keys(idsToAnimate).forEach(key => {
    let element = document.getElementById(key);
    let animationProperties = idsToAnimate[key];
    let animationOffset = animationProperties[1] ? animationProperties[1] : 0;
    let elementY = element.getBoundingClientRect().y + animationOffset;
    let elementBottomY = element.getBoundingClientRect().height + elementY + animationOffset;

    if (window.screen.height > elementY && elementY > 0 || window.screen.height > elementBottomY && elementBottomY > 0) {
      delete(idsToAnimate[key]);
      element.classList.add(animationProperties[0]);
      element.classList.remove('o0');
    }
  });

  highlightToAnimate.forEach(key => {
    let element = document.getElementById(key);
    if (element == null) {
      return;
    }

    let elementY = element.getBoundingClientRect().y + highlightOffset;
    let elementBottomY = element.getBoundingClientRect().height + elementY + highlightOffset;

    if (window.screen.height > elementY && elementY > 0 || window.screen.height > elementBottomY && elementBottomY > 0) {
      highlightToAnimate.splice(key, 1);
      element.classList.add('draw-in-left');
      element.style.backgroundSize = "100%";
    }
  });
}

function scrollListener() {
  window.addEventListener('scroll', (event) =>  {
    let menuBar = document.getElementById('menu-bar');
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

function addResearchHandler() {
  setTimeout(() => {
    titleAbstract = document.getElementById("title-and-abstract");
    researchContainer = document.getElementById("research-body-contents");
    let compResearchStyle = getComputedStyle(researchContainer);
    navResButtons = document.getElementById("nav-research-buttons");
    maxHeight = researchContainer.offsetHeight - parseFloat(compResearchStyle.paddingTop)*2 - navResButtons.offsetHeight;
    childrenArray = [].slice.call(researchContainer.children)
    childrenHeightArray = childrenArray.map((x) => x.offsetHeight);
    let pageWidth = window.innerWidth;
    // Now we calculate how many we can fit within the body
    //  to calculate the number of pages needed
    // This is honestly pretty simple, all we need to do is
    //  multiply the height by 2 (two-columns) and divide by the maxHeight
    //  and then calculate the ceiling of that which will tell us how many
    //  pages we need
    // NOTE: slice(inclusive, exclusive)
    // let numOfPages = Math.ceil((totalHeight)/(maxHeight*2))
    // Now we split into pages

    let startingChildIndex = 0;
    let endingChildIndex = 0;
    let numOfPages = 1;
    let workingHeight = maxHeight;
    let runningHeight = titleAbstract.offsetHeight + 10;
    if (pageWidth > 800) {
      runningHeight*=2;
      workingHeight*=2;
    }
    console.log(workingHeight);
    console.log(runningHeight);
    while (endingChildIndex < (childrenArray.length)) {
      while (runningHeight < workingHeight) {
        if ((runningHeight + childrenHeightArray[endingChildIndex]) > workingHeight || endingChildIndex == (childrenArray.length)) {
          console.log("break");
          console.log(runningHeight + childrenHeightArray[endingChildIndex]);
          console.log(workingHeight);
          console.log(endingChildIndex);
          console.log(childrenArray.length);
          break;
        }
        endingChildIndex++;
        runningHeight+=childrenHeightArray[endingChildIndex - 1]
        console.log(runningHeight);
      }

      pageData[numOfPages] = childrenArray.slice(startingChildIndex, endingChildIndex)
      console.log(childrenHeightArray.slice(startingChildIndex, endingChildIndex));
      startingChildIndex = endingChildIndex;
      runningHeight = 0;
      numOfPages++;
    }

    let currentPage = "1";

    pageData[currentPage].forEach((element) => {
      // element.style.display = 'block';
    });


    const filteredData = Object.keys(pageData)
      .filter(key => ![currentPage].includes(key))
      .reduce((obj, key) => {
        obj[key] = pageData[key];
        return obj;
      }, {});

    for (const [_key, value] of Object.entries(filteredData)) {
      value.forEach((element) => {
        // element.style.display = 'none';
      })
    }

    displayResearchPage()
  }, 1)

  window.addEventListener("resize", (event) => {
    childrenHeightArray = childrenArray.map((x) => x.offsetHeight);
    // Now we calculate how many we can fit within the body
    //  to calculate the number of pages needed
    // This is honestly pretty simple, all we need to do is
    //  multiply the height by 2 (two-columns) and divide by the maxHeight
    //  and then calculate the ceiling of that which will tell us how many
    //  pages we need
    // NOTE: slice(exclusive, inclusive)
    // let numOfPages = Math.ceil((totalHeight)/(maxHeight*2))
    // Now we split into pages

    let startingChildIndex = 0;
    let endingChildIndex = 0;
    let numOfPages = 1;
    let runningHeight = titleAbstract.offsetHeight*2;
    while (endingChildIndex < (childrenArray.length + 1)) {
      while (runningHeight < maxHeight*2) {
        if (runningHeight + childrenHeightArray[endingChildIndex] > maxHeight*2) {
          break;
        }
        runningHeight+=childrenHeightArray[endingChildIndex]
        endingChildIndex++;
      }

      pageData[numOfPages] = childrenArray.slice(startingChildIndex, endingChildIndex - 1)
      startingChildIndex = endingChildIndex - 1;
      runningHeight = 0;
      numOfPages++;
    }

    let currentPage = "1";

    pageData[currentPage].forEach((element) => {
      // element.style.display = 'block';
    });


    const filteredData = Object.keys(pageData)
      .filter(key => ![currentPage].includes(key))
      .reduce((obj, key) => {
        obj[key] = pageData[key];
        return obj;
      }, {});

    for (const [_key, value] of Object.entries(filteredData)) {
      value.forEach((element) => {
        // element.style.display = 'none';
      })
    }

    displayResearchPage()
  })
}

function displayResearchPage() {
    researchContainer = document.getElementById("research");
    let researchBodyContents = document.getElementById("research-body-contents");
    let previousPage = document.getElementById("research-previous-page");
    let prevPageContents = document.getElementById("prev-pg-research-body-contents");
    let backButton = document.getElementsByClassName("research-back");
    let nextButton = document.getElementsByClassName("research-next");
    let currentPageInt = parseInt(currentPage);
    let pageNums = Object.keys(pageData).map((x) => parseInt(x));

    if (currentPageInt > pageNums[0]) {
      for (let x of backButton) {
        x.style.display = "block";
      }
    } else {
      for (let x of backButton) {
        x.style.display = "none";
      }
    }

    if (currentPageInt < pageNums.at(-1)) {
      for (let x of nextButton) {
        x.style.display = "block";
      }
    } else {
      for (let x of nextButton) {
        x.style.display = "none";
      }
    }

    previousPage.style.display = 'block';

    prevPageContents.replaceChildren(...pageData[currentPage]);
    if (currentPage == "1") {
      previousPage.insertBefore(titleAbstract, prevPageContents);
      let heightOfContents = maxHeight - titleAbstract.offsetHeight;
      prevPageContents.setAttribute("style",`height:${heightOfContents}px`);
    } else {
      prevPageContents.setAttribute("style",`height:${maxHeight}px`);
    }
    researchContainer.style.display = 'none';
    researchContainer.classList.add('shuffle');


    setTimeout(() => {
      researchContainer.style.display = 'block';
      previousPage.style.zIndex = 0;
      setTimeout(() => {
        previousPage.style.zIndex = 2;
        setTimeout(() => {
          previousPage.style.display = 'none';
          previousPage.style.zIndex = -1;
          researchBodyContents.replaceChildren(...pageData[currentPage]);
          if (currentPage == "1") {
            researchContainer.insertBefore(titleAbstract, researchBodyContents);
            let heightOfContents = maxHeight - titleAbstract.offsetHeight;
            researchBodyContents.setAttribute("style",`height:${heightOfContents}px`);
          } else {
            researchBodyContents.setAttribute("style",`height:${maxHeight}px`);
          }
        }, 950)
      }, 240)
    }, 10)

    if (currentPage !== "1" && titleAbstract.style.display != 'none') {
      titleAbstract.style.display = 'none';
      titleAbstract.classList.remove("title-visible");
    } else if (currentPage == "1") {
      titleAbstract.style.display = 'block';
      if (!titleAbstract.classList.contains("title-visible")) {
        titleAbstract.classList.add("title-visible");
      }
    }
}

function changePage(element) {
  if (element.value > 0) {
    currentPage = (parseInt(currentPage) + 1).toString();
  } else {
    currentPage = (parseInt(currentPage) - 1).toString();
  }

  displayResearchPage();
}

window.addEventListener('DOMContentLoaded', (event) => {
  scrollListener()
  applyAnimations()
  addCorrectDate()
  addResearchHandler()
});
