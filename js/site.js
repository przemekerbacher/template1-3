const extraButton = document.querySelector(".buttons .expand");
const addToBasketButtons = document.querySelectorAll(".add-to-basket");

if (extraButton) {
  extraButton.addEventListener("click", function () {
    const extraMenu = document.querySelector(".buttons");
    extraMenu.classList.toggle("active");
  });
}

if (addToBasketButtons) {
  addToBasketButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const iconAdd = button.querySelector(".add");
      const iconOk = button.querySelector(".ok");

      button.classList.toggle("active");
      if (iconAdd) iconAdd.classList.toggle("hide");
      if (iconOk) iconOk.classList.toggle("hide");
    });
  });
}

//add collapsible effect
const collasibleElements = document.querySelectorAll(
  ".collapsible, .button-collapsible"
);

if (collasibleElements)
  collasibleElements.forEach((element) => {
    element.addEventListener("click", function (e) {
      const content = document.querySelector(
        e.currentTarget.getAttribute("data-target")
      );

      e.currentTarget.classList.toggle("active");

      if (content)
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
          content.classList.remove("active");
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          content.classList.add("active");
        }
    });
  });

//add active class when scroll
window.addEventListener("scroll", function () {
  const mainNavigation = document.querySelector(".main-navigation");
  const collapsibleButton = document.querySelector(".button-collapsible");

  if (window.scrollY > 0) {
    if (mainNavigation) {
      mainNavigation.classList.add("scroll-active");
      mainNavigation.classList.add("tigh");
    }
  } else {
    {
      mainNavigation.classList.remove("scroll-active");
      mainNavigation.classList.remove("tigh");
    }
  }
});

//add active clas when button clicked
const collapsibleButton = document.querySelector(".button-collapsible");

collapsibleButton.addEventListener("click", function () {
  const mainNavigation = document.querySelector(".main-navigation");
  this.classList.toggle("is-active");
  if (mainNavigation) {
    if (this.classList.contains("active")) {
      mainNavigation.classList.add("active");
    } else {
      mainNavigation.classList.remove("active");
    }
  }
});

//
const reservation = document.querySelector("#reserve");

if (reservation) {
  const moreInformation = document.querySelector(".hidden-form");
  reservation.addEventListener("click", function (e) {
    e.preventDefault();
    moreInformation;
  });
}

//modal
const modalButtons = document.querySelectorAll(".show-modal");
if (modalButtons) {
  modalButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const modal = document.querySelector(
        e.currentTarget.getAttribute("data-target")
      );

      if (modal) {
        const closeModalButton = modal.querySelector(".close");

        const closeThisModal = () => {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        };

        const showThisModal = () => {
          modal.style.display = "block";
          document.body.style.overflow = "hidden";
        };

        //handle show modal
        showThisModal();

        //Handle close modal
        window.addEventListener("click", function (e) {
          if (e.target == modal) {
            closeThisModal();
          }
        });
        if (closeModalButton) {
          closeModalButton.addEventListener("click", closeThisModal);
        }
      }
    });
  });
}

//enable parallax
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".parallax");
  M.Parallax.init(elems);
});

//display-category
var categorySelectors = document.querySelectorAll(".category-selector");
if (categorySelectors)
  categorySelectors.forEach((categorySelector) => {
    categorySelector.addEventListener("click", function () {
      const categories = document.querySelectorAll(".category");
      const target = document.querySelector(this.getAttribute("data-target"));
      moveActiveClass(categorySelector, categorySelectors);
      moveActiveClass(target, categories);
    });
  });

moveActiveClass = (selected, all) => {
  all.forEach((element) => {
    if (element === selected) {
      element.classList.add("active");
      console.log(element);
    } else {
      element.classList.remove("active");
    }
  });
};
