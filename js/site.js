const l = (...arguments) => {
  console.log(arguments);
};

const addAddingNormalProductToBasket = () => {
  const addToBasketButtons = document.querySelectorAll(
    "button[data-buttontype='ButtonProductAdd']"
  );
  if (addToBasketButtons) {
    addToBasketButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        productAddToBasket(
          generateNormalBasketString($(this)),
          e.currentTarget
        );
      });
    });
  }
};

const addAddingCustomizableProductToBasket = () => {
  const modalSaveButton = document.querySelector(
    'button[data-type="addCustomizableProduct"]'
  );

  modalSaveButton.addEventListener("click", (e) => {
    productAddToBasket(generateSetAddBasketString($(this)), e.currentTarget);
  });
};

const addCollapsibleEffect = () => {
  const collasipleElements = document.querySelectorAll(
    ".collapsible, .button-collapsible"
  );

  if (collasipleElements)
    collasipleElements.forEach((element) => {
      element.addEventListener("click", function (e) {
        const content = document.querySelector(
          e.currentTarget.getAttribute("data-target")
        );

        e.currentTarget.classList.toggle("active");
        toggleDisplay(content);
      });
    });

  const toggleDisplay = (content) => {
    if (content)
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.classList.remove("active");
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("active");
      }
  };
};

const addReducingMenuOnScoll = () => {
  const reduceIfScrollBiggerThanZero = () => {
    const mainNavigation = document.querySelector(".main-navigation");
    if (mainNavigation)
      if (window.scrollY > 0) {
        mainNavigation.classList.add("scroll-active");
        mainNavigation.classList.add("tigh");
      } else {
        mainNavigation.classList.remove("scroll-active");
        mainNavigation.classList.remove("tigh");
      }
  };

  reduceIfScrollBiggerThanZero();
  window.addEventListener("scroll", reduceIfScrollBiggerThanZero);
};

const addPossibilityToChangePizzaAmountInModal = () => {
  $(document).on(
    "click",
    '#customize-pizza [data-id="ProductDetailsAmountPlus"]',
    function (n) {
      n.preventDefault();
      console.log("ProductDetailsAmountPlus");
      var t = $('#customize-pizza [data-id="ProductDetailsAmount"]'),
        i = parseInt(t.prop("max")),
        r = parseInt(t.prop("min"));
      parseInt(t.val()) < i && t.val(parseInt(t.val()) + 1);
      copyProductSetSumPrice();
    }
  );
  $(document).on(
    "click",
    '#customize-pizza [data-id="ProductDetailsAmountMinus"]',
    function (n) {
      n.preventDefault();
      console.log("ProductDetailsAmountMinus");
      var t = $('#customize-pizza [data-id="ProductDetailsAmount"]'),
        r = parseInt(t.prop("max")),
        i = parseInt(t.prop("min"));
      parseInt(t.val()) > i && t.val(parseInt(t.val()) - 1);
      copyProductSetSumPrice();
    }
  );
};

function copyProductSetSumPrice() {
  console.log("copyProductSetSumPrice");
  var n = $('#customize-pizza [data-id="ProductDetailsPriceValue"]').html(),
    t = parseInt($('#customize-pizza [data-id="ProductDetailsAmount"]').val()),
    i = n * t;
  return (
    $('#customize-pizza [data-id="customize-pizzaSaveButtonPrice"]').html(
      i.toFixed(2)
    ),
    !0
  );
}

function copySumPriceInBasketModal() {
  var n = $(
    '[data-id="ModalBasket"] [data-id="ModalBasketSumAmountValue"]'
  ).html();
  return (
    typeof n == typeof undefined
      ? $('[data-id="ModalBasket"] [data-id="ModalBasketPrice"]').html("0")
      : $('[data-id="ModalBasket"] [data-id="ModalBasketPrice"]').html(
          $(
            '[data-id="ModalBasket"] [data-id="ModalBasketSumAmountValue"]'
          ).html()
        ),
    !1
  );
}

const addChangingApperienceNavigationBar = () => {
  const collapsibleButton = document.querySelector(".button-collapsible");

  if (collapsibleButton)
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
};

const addModal = () => {
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
          modal.classList.add("active");

          const closeModalButton = modal.querySelector(".close");
          const dimissButtons = modal.querySelectorAll(".dimiss");

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

          dimissButtons.forEach((dimissButton) => {
            dimissButton.addEventListener("click", closeThisModal);
          });
        }
      });
    });
  }
};

const addParallax = () => {
  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".parallax");
    M.Parallax.init(elems);
  });
};

const addDisplayingCategory = () => {
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
};

const moveActiveClass = (selected, all) => {
  all.forEach((element) => {
    if (element === selected) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
};

const addClosingOrder = () => {
  const closeButton = document.querySelector("#order .close");
  if (closeButton)
    closeButton.addEventListener("click", function () {
      const order = document.querySelector("#order");
      if (order) order.classList.remove("active");
    });
};

let radiosDelivery = document.querySelectorAll('[name="delivery"]');
let timeInput = document.querySelector("[name='time'");

if (radiosDelivery)
  radiosDelivery.forEach((radio) => {
    radio.addEventListener("click", function () {
      if (timeInput)
        if (this.getAttribute("value") === "on-time") {
          timeInput.classList.add("show");
        } else {
          timeInput.classList.remove("show");
        }
    });
  });

const addPizaConfigurator = () => {
  var buyButtons = document.querySelectorAll(
    "[data-buttontype='ButtonProductSetChoose']"
  );

  if (buyButtons)
    buyButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        loadProductSetDetails(button.dataset.productid);
      });
    });
};

const expand = (content) => {
  if (content)
    if (!content.style.maxHeight) {
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("active");
    }
};

const collapse = (content) => {
  if (content)
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      content.classList.remove("active");
    }
};

const addStickOrderDisplayWhenMenuIsDisplaying = () => {
  const container = this;
  const el1 = document.querySelector(".categories");
  const el2 = document.querySelector(".order");
  const offset = 70;

  if ($(window).width() > 1000) {
    sticker({
      el1,
      el2,
      offset,
      container,
    });
  }
};

const addInit = () => {
  showBasketContent();
};

const addLoginForm = () => {
  $("#nav .login").click(() => {
    showLoginForm();
  });

  $("#loginForm .login").click(() => {
    submitLoginForm();
  });
};

const addChangeLanguage = () => {
  $("#nav .language").click(() => {
    l("a	");
    showChnageLanguage();
  });
};

const addRemovingProductFromBasket = () => {
  $('[data-id="ModalBasketProductDeleteButton"]').click((e) => {
    const id = $(e.currentTarget).data("lineid");
    productRemoveFromBasket(id);
  });
};

addInit();
addStickOrderDisplayWhenMenuIsDisplaying();
addAddingNormalProductToBasket();
addRemovingProductFromBasket();
addCollapsibleEffect();
addReducingMenuOnScoll();
addChangingApperienceNavigationBar();
addPizaConfigurator();
addAddingCustomizableProductToBasket();
addLoginForm();
addChangeLanguage();
addModal();
addParallax();
addClosingOrder();
addDisplayingCategory();
