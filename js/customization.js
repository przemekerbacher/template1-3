const addProdutCustomizable = () => {
  const toFixedValue = 2;
  const disableOrEnableButtonByAddonLimits = (button) => {
    const componentId = $(button).data("componentid");
    const currentValue = parseInt(
      $(
        `[data-id="ProductDetailsBoxComponentAmount"][data-componentid="${componentId}"]`
      ).html()
    );
    const max = $(button).data("maxamount");
    const min = $(button).data("minamount");
    const operationButtons = [];
    const addButton = $(
      `[data-id="ProductDetailsBoxComponentAddButton"][data-componentid="${componentId}"]`
    );
    const removeButton = $(
      `[data-id="ProductDetailsBoxComponentSubtractButton"][data-componentid="${componentId}"]`
    );

    operationButtons.push(addButton);
    operationButtons.push(removeButton);

    operationButtons.forEach((operationButton) => {
      const operation = operationButton.data("id");

      if (operation === "ProductDetailsBoxComponentSubtractButton") {
        if (currentValue <= min) {
          $(operationButton).attr("disabled", true);
        } else {
          $(operationButton).attr("disabled", false);
        }
      } else if (operation === "ProductDetailsBoxComponentAddButton") {
        if (currentValue >= max) {
          $(operationButton).attr("disabled", true);
        } else {
          $(operationButton).attr("disabled", false);
        }
      }
    });
  };
  const disableOrEnableButtonByGroupLimits = (groupId) => {
    const groupMin = parseInt(
      $(
        `[data-componentgroupid="${groupId}"] [data-id="ProductDetailsBoxComponentMinValue"]`
      ).html()
    );
    const groupMax = parseInt(
      $(
        `[data-componentgroupid="${groupId}"] [data-id="ProductDetailsBoxComponentMaxValue"]`
      ).html()
    );
    const groupTotal = parseInt(
      $(
        `[data-componentgroupid="${groupId}"] [data-id="ProductDetailsBoxComponentSelectedValue"]`
      ).html()
    );

    const groupSubstractOperationButtons = $(
      `button[data-componentgroupid="${groupId}"][data-id="ProductDetailsBoxComponentSubtractButton"]`
    );
    const groupAddOperationButtons = $(
      `button[data-componentgroupid="${groupId}"][data-id="ProductDetailsBoxComponentAddButton"]`
    );
    if (groupTotal >= groupMax) {
      $(groupAddOperationButtons).each((index, button) => {
        $(button).attr("disabled", true);
      });
    } else if (groupTotal > groupMin) {
      $(groupAddOperationButtons).each((index, button) => {
        disableOrEnableButtonByAddonLimits(button);
      });
    }

    if (groupTotal <= groupMin) {
      $(groupSubstractOperationButtons).each((index, button) => {
        $(button).attr("disabled", true);
      });
    } else if (groupTotal < groupMax) {
      $(groupSubstractOperationButtons).each((index, button) => {
        disableOrEnableButtonByAddonLimits(button);
      });
    }
  };
  const updateTotalCountInGroup = () => {
    const groups = $(
      "#customize-pizza .card-header .btn-product-details-box-accordion-group"
    );
    $(groups).each((index, group) => {
      let totalCount = 0;
      const totalDisplaPlace = $(group).find(
        '[data-id="ProductDetailsBoxComponentSelectedValue"]'
      );
      const groupId = $(group).data("componentgroupid");

      const groupAddons = $(
        `#collapse_3_${groupId} span[data-id='ProductDetailsBoxComponentAmount']`
      );
      $(groupAddons).each((index, item) => {
        const addonCount = $(item).html();
        totalCount += parseInt(addonCount);
      });
      totalDisplaPlace.html(totalCount);
    });
  };
  const updateTotalPrice = () => {
    const displaPlace = $(".modal-footer [data-id='total-price']");
    const price = calculateTotalPrice();

    displaPlace.html(price.toFixed(toFixedValue));
  };
  const getPriceFromPizzaSize = () => {
    const activeSize = $(".product-details-box-size-select :checked");
    const sizeId = activeSize.data("productsizesection");
    const price = $(
      `.product-details-box-price[data-sizeid="${sizeId}"] [data-id="ProductDetailsPriceValue"]`
    ).data("originalprice");

    return parseFloat(price);
  };
  const getAddonsPrice = () => {
    const addons = $('[data-id="ProductDetailsBoxComponentAmount"]');
    let total = 0;
    $(addons).each((index, addon) => {
      const price = parseFloat($(addon).data("pricevalue"));
      const count = parseFloat($(addon).html());
      const originalamount = parseFloat($(addon).data("originalamount"));

      if (count - originalamount > 0) {
        total += count * price;
      }
    });
    return parseFloat(total);
  };
  const getPizzaCount = () => {
    return parseFloat($('[data-id="ProductDetailsAmount"]').val());
  };
  const calculateInitValues = () => {
    updateTotalPrice();
    updateTotalCountInGroup();
  };
  const handleChangeAddonAmount = () => {
    const changeValue = (e) => {
      const source = e.currentTarget;
      const operation = $(source).data("id");
      const componentId = $(source).data("componentid");
      const displayPlace = $(
        `[data-id="ProductDetailsBoxComponentAmount"][data-componentid="${componentId}"]`
      );
      const groupId = $(source).data("componentgroupid");
      let currentValue = parseInt($(displayPlace).html());
      if (operation === "ProductDetailsBoxComponentSubtractButton") {
        $(displayPlace).html(--currentValue);
      } else if (operation === "ProductDetailsBoxComponentAddButton") {
        $(displayPlace).html(++currentValue);
      }

      updateTotalCountInGroup();
      disableOrEnableButtonByGroupLimits(groupId);
      updateTotalPrice();
    };
    $(".product-details-box-accordion-component-minus").click(changeValue);
    $(".product-details-box-accordion-component-plus").click(changeValue);
  };
  const handleChangePizzaSize = () => {
    $(".product-details-box-size-select").click(() => {
      updateTotalPrice();
    });
  };
  const handleChangePizzaCount = () => {
    const disableOrEnableButton = (button) => {
      if ($(button).data("id") === "ProductDetailsAmountMinus") {
        if (
          $('[data-id="ProductDetailsAmount"]').val() <=
          $('[data-id="ProductDetailsAmount"]').attr("min")
        ) {
          $('[data-id="ProductDetailsAmountMinus"]').attr("disabled", true);
        } else {
          $('[data-id="ProductDetailsAmountMinus"]').attr("disabled", false);
        }
      } else {
        if (
          $('[data-id="ProductDetailsAmount"]').val() >=
          $('[data-id="ProductDetailsAmount"]').attr("max")
        ) {
          $('[data-id="ProductDetailsAmountPlus"]').attr("disabled", true);
        } else {
          $('[data-id="ProductDetailsAmountPlus"]').attr("disabled", false);
        }
      }
    };
    const disableOrEnableBoth = () => {
      disableOrEnableButton(
        document.querySelector('[data-id="ProductDetailsAmountPlus"]')
      );

      disableOrEnableButton(
        document.querySelector('[data-id="ProductDetailsAmountMinus"]')
      );
    };
    disableOrEnableButton($('[data-id="ProductDetailsAmountMinus"]'));

    $('[data-id="ProductDetailsAmountMinus"]').click(() => {
      const input = $(
        '.product-details-box-amount [data-id="ProductDetailsAmount"]'
      );
      let currentCount = input.val();
      input.val(--currentCount);
      disableOrEnableBoth();
      updateTotalPrice();
    });
    $('[data-id="ProductDetailsAmountPlus"]').click(() => {
      const input = $(
        '.product-details-box-amount [data-id="ProductDetailsAmount"]'
      );
      let currentCount = input.val();
      input.val(++currentCount);
      disableOrEnableBoth();
      updateTotalPrice();
    });
  };
  const disableOrEnableButtons = () => {
    const groups = $("[data-id='ProductDetailsBoxComponentContent']");

    groups.each((index, group) => {
      const groupId = $(group)
        .parent()
        .find(".card-header")
        .attr("id")
        .replace("heading_", "");
      disableOrEnableButtonByGroupLimits(groupId);
    });
  };
  const calculateTotalPrice = () => {
    const priceFromPizzaSize = getPriceFromPizzaSize();
    const addonsPrice = getAddonsPrice();
    const pizzaCount = getPizzaCount();
    return pizzaCount * (priceFromPizzaSize + addonsPrice);
  };

  calculateInitValues();
  disableOrEnableButtons();
  handleChangeAddonAmount();
  handleChangePizzaSize();
  handleChangePizzaCount();
};
