const l = (m) => {
  console.log(m);
};

const addAddingNormalProductToBasket = () => {
  const addToBasketButtons = document.querySelectorAll(
    "button[data-buttontype='ButtonProductAdd']"
  );

  if (addToBasketButtons) {
    addToBasketButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        productAddToBasket(generateNormalBasketString($(this)));

        // const iconAdd = button.querySelector(".add");
        // const iconOk = button.querySelector(".ok");

        // button.classList.toggle("active");
        // if (iconAdd) iconAdd.classList.toggle("hide");
        // if (iconOk) iconOk.classList.toggle("hide");
      });
    });
  }
};

const addAddingCustomizableProductToBasket = () => {
  const modalSaveButton = document.querySelector(
    'button[data-type="addCustomizableProduct"]'
  );

  modalSaveButton.addEventListener("click", () => {
    productAddToBasket(genetateSetAddBasketString($(this)));
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
  console.log("copySumPriceInBasketModal");
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
    } else {
      element.classList.remove("active");
    }
  });
};

//close order
const closeButton = document.querySelector("#order .close");
if (closeButton)
  closeButton.addEventListener("click", function () {
    const order = document.querySelector("#order");
    if (order) toggleDisplay(order);
  });

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

//////////////////////////
const addProdutCustomizable = () => {
  const getPriceFromSize = () => {
    const selectedPizzaId = $(
      ".btn-product-details-box-size-select.active input"
    ).data("productsizesection");
    const initPrice = $(
      `#customize-pizza [data-sizeid="${selectedPizzaId}"] [data-id='ProductDetailsPriceValue']`
    ).data("pricevalue");

    return parseFloat(initPrice);
  };

  const getPriceFromAddons = () => {
    return 0;
  };

  const setPriceField = (value) => {
    const priceField = $(`#customize-pizza [data-id='total-price']`);
    priceField.html(value.toFixed(2));
  };

  const initButtons = () => {
    const cards = $(".card-header").each((e, item) => {
      const id = item.id;
      const numberedId = item.id.replace("heading_", "");
      const groupTotal = parseInt(
        document.querySelector(
          `#${id} [data-id="ProductDetailsBoxComponentSelectedValue"]`
        ).innerHTML
      );
      const groupMax = parseInt(
        document.querySelector(
          `#${id} [data-id="ProductDetailsBoxComponentMaxValue"]`
        ).innerHTML
      );
      const groupMin = parseInt(
        document.querySelector(
          `#${id} [data-id="ProductDetailsBoxComponentMinValue"]`
        ).innerHTML
      );

      if (groupTotal >= groupMax) {
        $(`[data-id="ProductDetailsBoxComponentAddButton"]`).attr(
          "disabled",
          true
        );
      } else if (groupTotal <= groupMin) {
        $(`[data-id="ProductDetailsBoxComponentSubtractButton"]`).attr(
          "disabled",
          true
        );
      }

      const addons = $(
        `[data-id="ProductDetailsBoxComponentAmount"][data-componentgroupid="${numberedId}"]`
      );

      $(addons).each((i, addon) => {
        const { maxamount, minamount, componentid } = addon.dataset;
        const addonTotal = addon.innerHTML;
        const addonMax = maxamount;
        const addonMin = minamount;

        if (addonTotal >= addonMax) {
          $(
            `button[data-componenid="${componentid}"][data-id="ProductDetailsBoxComponentAddButton"]`
          ).attr("disabled", true);
        } else if (addonTotal <= addonMin) {
          $(
            `button[data-componenid="${componentid}"][data-id="ProductDetailsBoxComponentSubtractButton"]`
          ).attr("disabled", true);
        }
      });
    });
  };
  const initValues = () => {
    initTotalAddonsCount();
    initButtons();

    const initPrice = getPriceFromSize();

    setPriceField(initPrice);
  };
  const getTotalPrice = () => {
    const priceFromSize = getPriceFromSize();
    const priceFromAddons = getPriceFromAddons();

    return priceFromSize + priceFromAddons;
  };

  const handleChangeAddonAmount = () => {
    $(
      '[data-id="ProductDetailsBoxComponentAddButton"], [data-id="ProductDetailsBoxComponentSubtractButton"]'
    ).click((e) => {
      const { id, componentgroupid, componentid } = e.currentTarget.dataset;
      let groupMax = 0;
      let groupMin = 0;
      let groupTotal = 0;
      let addonMax = 0;
      let addonMin = 0;
      let addonTotal = 0;

      const addonTotalLabel = e.currentTarget.parentElement.querySelector(
        `[data-componentgroupid="${componentgroupid}"]`
      );

      const groupTotalLabel = document.querySelector(
        `#heading_${componentgroupid} [data-id="ProductDetailsBoxComponentSelectedValue"]`
      );

      let currentAddonCount = parseInt(addonTotalLabel.innerHTML);
      let currentgroupCount = parseInt(groupTotalLabel.innerHTML);

      const get = (what) => {
        switch (what) {
          case "total":
            return parseInt(
              document.querySelector(
                `#heading_${componentgroupid} [data-id="ProductDetailsBoxComponentSelectedValue"]`
              ).innerHTML
            );
          case "min":
            return parseInt(
              document.querySelector(
                `#heading_${componentgroupid} [data-id="ProductDetailsBoxComponentMinValue"]`
              ).innerHTML
            );
          case "max":
            return parseInt(
              document.querySelector(
                `#heading_${componentgroupid} [data-id="ProductDetailsBoxComponentMaxValue"]`
              ).innerHTML
            );
          case "addon total":
            l(
              e.currentTarget.parentElement.querySelector(
                `span[data-componentgroupid="${componentgroupid}"]`
              )
            );
            return e.currentTarget.parentElement.querySelector(
              `span[data-componentgroupid="${componentgroupid}"]`
            ).innerHTML;
          case "addon min":
            return e.currentTarget.parentElement.querySelector(
              `[data-componentgroupid="${componentgroupid}"]`
            ).dataset.minamount;
          case "addon max":
            return e.currentTarget.parentElement.querySelector(
              `[data-componentgroupid="${componentgroupid}"]`
            ).dataset.maxamount;

          default:
            return 0;
        }
      };
      const init = () => {
        groupTotal = parseInt(get("total"));
        groupMax = parseInt(get("max"));
        groupMin = parseInt(get("min"));
        addonTotal = parseInt(get("addon total"));
        addonMax = parseInt(get("addon max"));
        addonMin = parseInt(get("addon min"));
        disableButtonsIfNeed(componentgroupid);
      };
      const updateFields = () => {
        if (id === "ProductDetailsBoxComponentAddButton") {
          addonTotalLabel.innerHTML = ++addonTotal;
          groupTotalLabel.innerHTML = ++groupTotal;
        }

        if (id === "ProductDetailsBoxComponentSubtractButton") {
          addonTotalLabel.innerHTML = --addonTotal;
          groupTotalLabel.innerHTML = --groupTotal;
        }
      };
      const disableButtonsIfNeed = () => {
        if (groupTotal >= groupMax) {
          disable({ what: "ProductDetailsBoxComponentAddButton", all: true });
        } else if (groupTotal <= groupMin) {
          disable({
            what: "ProductDetailsBoxComponentSubtractButton",
            all: true,
          });
        } else if (addonTotal >= addonMax) {
          disable({
            what: "ProductDetailsBoxComponentAddButton",
            componentgroupid,
          });
        } else if (addonTotal <= addonMin) {
          disable({
            what: "ProductDetailsBoxComponentSubtractButton",
            componentgroupid,
          });
        }

        $(`button[data-componentgroupid="${componentgroupid}"]`).each(
          (i, buttonMax) => {
            //todo
          }
        );

        array.forEach((element) => {});
      };

      const enableAllButtons = () => {
        $(`[data-id="ProductDetailsBoxComponentAddButton"]`).attr(
          "disabled",
          false
        );
        $(`[data-id="ProductDetailsBoxComponentSubtractButton"]`).attr(
          "disabled",
          false
        );
      };

      const disable = ({ what, all = false, componentgroupid }) => {
        if (all) {
          switch (what) {
            case "ProductDetailsBoxComponentAddButton":
              $(`[data-id="${what}"]`).attr("disabled", true);
              break;
            case "ProductDetailsBoxComponentSubtractButton":
              $(`[data-id="${what}"]`).attr("disabled", true);
              break;
          }
        } else {
          switch (what) {
            case "ProductDetailsBoxComponentAddButton":
              l(componentid);

              $(`[data-componentid="${componentid}"][data-id="${what}"]`).attr(
                "disabled",
                true
              );
              break;
            case "ProductDetailsBoxComponentSubtractButton":
              $(`[data-componentid="${componentid}"][data-id="${what}"]`).attr(
                "disabled",
                true
              );
              break;
          }
        }
      };
      init();
      updateFields();
      enableAllButtons();
      disableButtonsIfNeed();
    });
  };

  const initTotalAddonsCount = () => {
    const cards = $(".card-header").each((e, item) => {
      const id = item.id;
      const numberedId = item.id.replace("heading_", "");

      let total = 0;

      const addons = $(item).find(
        `[data-id="ProductDetailsBoxComponentAmount"][data-componentgroupid="${numberedId}"]`
      );

      addons.each((i, addon) => {
        total += parseInt(addon.val());
      });

      $(`#${id} [data-id="ProductDetailsBoxComponentSelectedValue"]`).text("0");
    });
  };

  initValues();
  handleChangeAddonAmount();
};

addProdutCustomizable();
////////////////////////////
const addPizaConfigurator = () => {
  const initValues = () => {
    //load price
    const priceField = $("#customize-pizza .total-price");
    const initPrice = $("#customize-pizza .ProductDetailsPriceValue").data(
      "data-pricevalue"
    );

    priceField.val(initPrice);
  };

  var buyButtons = document.querySelectorAll(
    "button[data-buttontype='ButtonProductSetChoose']"
  );

  if (buyButtons)
    buyButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        loadProductSetDetails(button.dataset.productid);
        initValues();
      });
    });
};

//display customize option
const customizeOptions = document.querySelectorAll(".customize-option");
if (customizeOptions)
  customizeOptions.forEach((customizeOption) => {
    customizeOption.addEventListener("click", function () {
      const contents = document.querySelectorAll(".customize-content");
      const target = document.querySelector(this.getAttribute("data-target"));
      moveActiveClass(customizeOption, customizeOptions);
      moveActiveClass(target, contents);
    });
  });

//show/hide customize pizza option
if (customizeOptions)
  customizeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const customizeContents = document.querySelectorAll(".customize-content");
      customizeContents.forEach((content) => {
        if (!content.classList.contains("active")) {
          collapse(content);
        }
      });
    });
  });

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

class AddonsGroup {
  constructor(groupName) {
    this.groupElement = document.querySelector(`#${groupName}`);
    this.setCurrentItems();
    this.fillMax();
    this.fillMin();
    this.fillTotal();
    this.updateTotal();
  }
  items = [];
  changes = [];
  total = 0;
  max = 0;
  min = 0;

  setCurrentItems = () => {
    const addons = this.groupElement.querySelectorAll(".addon");

    if (addons)
      addons.forEach((addon) => {
        const name = addon.querySelector(".name [data-name]").dataset.name;
        const count = addon.querySelector(".count [data-value]").dataset.value;
        const id = addon.id;

        this.items.push({ count, name, id });
      });
  };

  fillTotal = () => {
    this.items.forEach((item) => {
      this.total += parseInt(item.count);
    });
  };

  updateTotal = () => {
    this.groupElement.querySelector(
      ".current-count"
    ).dataset.value = this.total;
  };

  fillMax = () => {
    this.max = this.groupElement.dataset.max;
  };

  fillMin = () => {
    this.min = this.groupElement.dataset.min;
  };

  increaseValue = (targetId) => {
    targetId = targetId.replace("#", "");

    const currentItem = this.items.find((item) => item.id === targetId);
    const targetElement = document.querySelector(`#${targetId} .count span`);

    currentItem.count++;
    targetElement.dataset.value = currentItem.count;
    this.updateTotal();
  };

  decreaseValue = (targetId) => {
    targetId = targetId.replace("#", "");

    const currentItem = this.items.find((item) => item.id === targetId);
    const targetElement = document.querySelector(`#${targetId} .count span`);

    currentItem.count--;
    targetElement.dataset.value = currentItem.count;
    this.updateTotal();
  };
}

//initialize customize groups
const groups = document.querySelectorAll(".customize-group");
let groupClasses = [];
if (groups)
  groups.forEach((group) => {
    groupClasses.push({ group: group.id, class: new AddonsGroup(group.id) });
  });

//

//handle change addon amount
const addonButtons = document.querySelectorAll(".addons-button");
if (addonButtons)
  addonButtons.forEach((button) => {
    const shouldDisable = (button) => {
      const { group, target } = button.dataset;
      const id = target.replace("#", "");

      const currentGroup = groupClasses.find((g) => g.group === group).class;

      const total = currentGroup.total;
      const max = currentGroup.max;
      const min = currentGroup.min;
      const current = currentGroup.items.find((i) => i.id === id).count;
      const operation = button.dataset.operation;

      if (operation === "add") {
        const buttonMax = button.dataset.max;

        if (current === max || current === buttonMax) {
          return true;
        } else {
          return false;
        }
      }
      if (operation === "remove") {
        const buttonMin = button.dataset.min;
        if (current === buttonMin) {
          return true;
        } else {
          return false;
        }
      }
    };

    const toggleDisable = (button) => {
      if (shouldDisable(button)) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    };

    const setTargetValue = (button, operation) => {
      const { target, group } = button.dataset;
      const currentGroup = groupClasses.find((g) => g.group === group).class;

      if (operation === "add") currentGroup.increaseValue(target);
      if (operation === "remove") currentGroup.decreaseValue(target);
    };

    if (shouldDisable(button)) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }

    button.addEventListener("click", function (e) {
      let operation = "";

      addonButtons.forEach((element) => {
        if (e.currentTarget.dataset.operation === "add") {
          element.dataset.total++;
          operation = "add";
        }
        if (e.currentTarget.dataset.operation === "remove") {
          element.dataset.total--;
          operation = "remove";
        }
      });

      setTargetValue(e.currentTarget, operation);

      addonButtons.forEach((element) => {
        toggleDisable(element);
      });
    });
  });

//handle change pizza size
const pizzaSizeButtons = document.querySelectorAll(".pizza-size");
if (pizzaSizeButtons) {
  pizzaSizeButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      moveActiveClass(e.currentTarget, pizzaSizeButtons);
    });
  });

  //handle load basket
  const basketButton = document.querySelector(".basket[data-target='#order']");
  basketButton.addEventListener("click", function () {
    showBasketContent();
  });
}

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

addInit();
addStickOrderDisplayWhenMenuIsDisplaying();
addAddingNormalProductToBasket();
addCollapsibleEffect();
addReducingMenuOnScoll();
addChangingApperienceNavigationBar();
