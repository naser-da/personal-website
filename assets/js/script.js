'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// projects variables
const projectsItem = document.querySelectorAll("[data-projects-item]");
const projectsModalContainer = document.querySelector("[data-projects-modal-container]");
const projectsModalCloseBtn = document.querySelector("[data-modal-projects-close-btn]");
const projectsOverlay = document.querySelector("[data-projects-overlay]");

// project modal variable
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalText = document.querySelector("[data-project-modal-text]");
const projectModalLink = document.querySelector("[data-project-modal-link]");

// projects modal toggle function
const projectsModalFunc = function () {
  projectsModalContainer.classList.toggle("active");
  document.body.style.overflow = projectsModalContainer.classList.contains("active") ? "hidden" : "";
}

// add click event to all project items
for (let i = 0; i < projectsItem.length; i++) {
  projectsItem[i].addEventListener("click", function (e) {
    e.preventDefault();
    
    const projectTitle = this.querySelector("[data-project-title]").innerHTML;
    const projectText = this.querySelector("[data-project-text]").innerHTML;
    const projectLink = this.querySelector("[data-project-modal-link]").innerHTML;
    const projectImages = this.querySelector("[data-project-images]").innerHTML.split("\n").filter(img => img.trim());
    
    projectModalTitle.innerHTML = projectTitle;
    projectModalText.innerHTML = projectText;
    projectModalLink.href = projectLink;
    
    // Initialize carousel with project images
    const carousel = new ProjectCarousel(projectImages);
    
    projectsModalFunc();
  });
}

// add click event to modal close button on projects
projectsModalCloseBtn.addEventListener("click", projectsModalFunc);
projectsOverlay.addEventListener("click", projectsModalFunc);

// Close project modal when pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && projectsModalContainer.classList.contains("active")) {
    projectsModalFunc();
  }
});

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}