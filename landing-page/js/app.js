/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

//get sections list
const sections = document.getElementsByTagName("Section");

//get ul to append li elements to it
const ulElement = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

//the following function to check if the top of section is near to the top of viewport
function checkViewport(section) {
  const rect = section.getBoundingClientRect();
  return rect.top >= 0 && rect.top <= 300;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
//the following function to create navigation bar dynamically based on existing sections
function buildTheNav() {
  //loop over sections in page
  for (let section of sections) {
    //create li element and anchor element
    const liElement = document.createElement("li");
    const aElement = document.createElement("a");

    //get data-nav attribute of section in a variable
    const dataNavValue = section.getAttribute("data-nav");

    //set this variable as text content of the anchor element
    aElement.textContent = dataNavValue;

    //add class menu__link to anchor element for css styling porpuses
    aElement.classList.add("menu__link");

    //add smooth scrolling behaviour and prevent default jump when clicking on the anchor
    aElement.addEventListener("click", function (element) {
      element.preventDefault();
      section.scrollIntoView({ behavior: "smooth" });
    });

    //append anchor element to li element
    liElement.appendChild(aElement);
    //append li element to ul element
    ulElement.appendChild(liElement);
  }
}

// Add class 'active' to section when near top of viewport
//the following function to add active class to section in viewport and its anchor
function addClassActive() {
  let dataNavValue = null;

  //loop over sections in page
  for (let section of sections) {
    //check if there is a section in viewport
    if (checkViewport(section)) {
      //if the section is in viewport, add active class to it
      section.classList.add("your-active-class");
      //get data-nav attribute of the section
      dataNavValue = section.getAttribute("data-nav");
    } else {
      //for the rest of sections which are not in viewport, remove active class if exists
      section.classList.remove("your-active-class");
    }
  }

  //get links list
  const links = document.getElementsByClassName("menu__link");
  //loop over links
  for (let link of links) {
    //check if the text content of the link is the same as data-nav attribute of active section
    if (link.textContent === dataNavValue) {
      //if yes, add active class to this link to heighlight it
      link.classList.add("your-active-class");
    } else {
      //for the rest of links, remove active class if exists
      link.classList.remove("your-active-class");
    }
  }
}
// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildTheNav();
// Scroll to section on link click
// Set sections as active
window.addEventListener("scroll", addClassActive);
