function showMainAlerts(n, t, i) {
  t < 0 && (i = i + " (" + t + ")");
  MessageBox = $('[data-id="AlertMain"]');
  MessageBox.hide();
  MessageBox.find("div")
    .removeClass()
    .addClass("alert alert-" + n)
    .html(i);
  MessageBox.fadeIn(500);
  clearTimeout(messageSetTimeout);
  messageSetTimeout = setTimeout(function () {
    MessageBox.fadeOut(500);
  }, 4500);
}
function refreshHeader() {
  return (
    console.log("refreshHeader"),
    $.ajax({
      type: "GET",
      cache: !1,
      url: "/Home/GenerujHeader",
      beforeSend: function () {},
      success: function (n) {
        $("header").html(n);
        $("#ModalLogin").modal("hide");
      },
      error: function (n) {
        console.log(n.responseText);
      },
    }),
    !1
  );
}
function showChnageLanguage() {
  return (
    console.log("showChnageLanguage"),
    $.ajax({
      type: "GET",
      cache: !1,
      url: "/Home/AjaxModalJezykow",
      beforeSend: function () {},
      success: function (n) {
        $('#ModalLanguageChange [data-id="ModalLanguageChangeContent"]').html(
          n
        );
      },
      error: function (n) {
        console.log(n.responseText);
      },
    }),
    !1
  );
}
function showLoginForm() {
  return (
    console.log("showLoginForm"),
    $.ajax({
      type: "GET",
      cache: !1,
      url: "/Profil/LoginFormularzAjax",
      beforeSend: function () {},
      success: function (n) {
        $('#ModalLogin [data-id="ModalLoginContent"]').html(n);
      },
      error: function (n) {
        console.log(n.responseText);
      },
    }),
    !1
  );
}
function submitLoginForm(n, t) {
  console.log("submitLoginForm");
  var i = $("#ModalLogin #LoginForm").serialize();
  return (
    $.ajax({
      type: "POST",
      cache: !1,
      url: "/Profil/LoginAjax",
      data: i,
      beforeSend: function () {},
      success: function (i) {
        i.Kod > 0
          ? (showMainAlerts("success", i.Kod, i.Wiadomosc),
            n
              ? (console.log("location.reload"), location.reload())
              : t && refreshHeader())
          : showMainAlerts("danger", i.Kod, i.Wiadomosc);
      },
      error: function (n) {
        console.log(n.responseText);
      },
    }),
    !1
  );
}
function loadProductSetDetails(n) {
  return (
    console.log("loadProductSetDetails"),
    $.ajax({
      type: "GET",
      cache: !1,
      url: "/Home/SzczegolyZestawu?Artykul=" + n,
      beforeSend: function () {
        $('[data-id="ProductSetDetailsBoxWrapper"]').html(
          '<i class="fas fa-circle-notch fa-spin mx-auto"></i>'
        );
      },
      success: function (n) {
        $('[data-id="ProductSetDetailsBoxWrapper"]').html(n);
        loadDefaultDataForProductSetDetails();
      },
      error: function (n) {
        $('[data-id="ProductSetDetailsBoxWrapper"]').html(n.responseText);
        console.log("loadProductSetDetails()");
        console.log(n.responseText);
      },
    }),
    !1
  );
}
function productAddToBasket(n) {
  return (
    console.log("productAddToBasket"),
    $.ajax({
      type: "POST",
      cache: !1,
      url: "/Zamowienie/DodajDoKoszyka",
      data: {
        DaneDoKoszyka: n,
      },
      beforeSend: function () {},
      complete: function () {
        $("button.wait-loading-button")
          .removeClass("wait-loading-button")
          .find("i.fas")
          .show()
          .first()
          .remove();
      },
      success: function (n) {
        n.Kod > 0
          ? (showMainAlerts("success", n.Kod, n.Wiadomosc),
            $("#ModalProductSetDetails").modal("hide"))
          : showMainAlerts("danger", n.Kod, n.Wiadomosc);
        priceInBasket();
      },
      error: function (n) {
        console.log(n.responseText);
      },
    }),
    !1
  );
}
function showBasketContent() {
  return (
    console.log("showBasketContent"),
    $.ajax({
      type: "GET",
      cache: !1,
      url: "/Home/GenerujKoszykModal",
      beforeSend: function () {
        $('[data-id="ModalBasket"] [data-id="ModalBasketContent"]').html(
          '<i class="fas fa-circle-notch fa-spin mx-auto"></i>'
        );
      },
      success: function (n) {
        $('[data-id="ModalBasket"] [data-id="ModalBasketContent"]').html(n);
      },
      error: function (n) {
        console.log(n.responseText);
      },
    }),
    !1
  );
}
function productRemoveFromBasket(n) {
  return (
    console.log("productRemoveFromBasket"),
    $.ajax({
      type: "POST",
      cache: !1,
      url: "/Zamowienie/UsunZkoszyka",
      data: {
        Linijka: n,
      },
      beforeSend: function () {},
      success: function (n) {
        n.Kod >= 0
          ? (showMainAlerts("success", n.Kod, n.Wiadomosc),
            showBasketContent(),
            priceInBasket())
          : showMainAlerts("danger", n.Kod, n.Wiadomosc);
      },
      error: function (n) {
        console.log(n.responseText);
      },
    }),
    !1
  );
}
function priceInBasket() {
  return (
    console.log("priceInBasket"),
    $.ajax({
      type: "GET",
      cache: !1,
      url: "/Zamowienie/SumaWkoszyku",
      beforeSend: function () {
        $('[data-id="MenuBasketPrice"]').html(
          '<i class="fas fa-circle-notch fa-spin mx-auto"></i>'
        );
      },
      success: function (n) {
        $('[data-id="MenuBasketPrice"]').html(n.WartoscZamowienia);
        n.IloscLinijek === 0
          ? $('[data-id="MenuBasketButtonNext"]').addClass("disabled")
          : $('[data-id="MenuBasketButtonNext"]').removeClass("disabled");
      },
      error: function (n) {
        $('[data-id="MenuBasketPrice"]').html("?");
        console.log(n.responseText);
      },
    }),
    !1
  );
}
function setDeliveryToAddress() {
  console.log("setDeliveryToAddress");
  return (
    $.ajax({
      type: "POST",
      cache: !1,
      data: "",
      url: "/Zamowienie/DostawaNaAdres",
      beforeSend: function () {},
      success: function (n) {
        n.Kod > 0
          ? (showMainAlerts("success", n.Kod, n.Wiadomosc),
            setTimeout(function () {
              location.reload();
            }, 2e3))
          : (showMainAlerts("danger", n.Kod, n.Wiadomosc),
            console.log(n.responseText));
      },
      error: function (n) {
        showMainAlerts("danger", "", n.responseText);
        console.log(n.responseText);
      },
    }),
    !1
  );
}
function setDeliveryAddress() {
  console.log("setDeliveryAddress");
  var n = JSON.stringify({
    DeliveryCityName: $('[data-id="DeliveryCityName"]').find(":selected").val(),
    DeliveryStreetName: $('[data-id="DeliveryStreetName"]')
      .find(":selected")
      .val(),
    DeliveryAddressNumber: $('[data-id="DeliveryAddressNumber"]').val(),
    DeliveryDescription: $('[data-id="DeliveryDescription"]').val(),
  });
  return (
    $.ajax({
      type: "POST",
      cache: !1,
      data: n,
      dataType: "json",
      contentType: "application/json",
      url: "/Zamowienie/UstawAdresDostawy",
      beforeSend: function () {},
      success: function (n) {
        n.Kod > 0
          ? (showMainAlerts("success", n.Kod, n.Wiadomosc),
            loadConfirmationBasket())
          : (showMainAlerts("danger", n.Kod, n.Wiadomosc),
            console.log(n.responseText));
      },
      error: function (n) {
        showMainAlerts("danger", "", n.responseText);
        console.log(n.responseText);
      },
    }),
    !1
  );
}
function setPersonalData() {
  console.log("setPersonalData");
  var n = JSON.stringify({
    ClientName: $('[data-id="ClientName"]').val(),
    ClientSurname: $('[data-id="ClientSurname"]').val(),
    ClientTelephone: $('[data-id="ClientTelephone"]').val(),
    ClientEmail: $('[data-id="ClientEmail"]').val(),
  });
  return (
    $.ajax({
      type: "POST",
      cache: !1,
      data: n,
      dataType: "json",
      contentType: "application/json",
      url: "/Zamowienie/UstawDaneKlienta",
      beforeSend: function () {},
      success: function (n) {
        n.Kod > 0
          ? (showMainAlerts("success", n.Kod, n.Wiadomosc),
            loadConfirmationBasket())
          : (showMainAlerts("danger", n.Kod, n.Wiadomosc),
            console.log(n.responseText));
      },
      error: function (n) {
        showMainAlerts("danger", "", n.responseText);
        console.log(n.responseText);
      },
    }),
    !1
  );
}
function setLocalPickup() {
  console.log("setLocalPickup");
  return (
    $.ajax({
      type: "POST",
      cache: !1,
      data: "",
      url: "/Zamowienie/DostawaOdbiorWLokaluNaWynos",
      beforeSend: function () {},
      success: function (n) {
        n.Kod > 0
          ? (showMainAlerts("success", n.Kod, n.Wiadomosc),
            setTimeout(function () {
              location.reload();
            }, 2e3))
          : (showMainAlerts("danger", n.Kod, n.Wiadomosc),
            console.log(n.responseText));
      },
      error: function (n) {
        showMainAlerts("danger", "", n.responseText);
        console.log(n.responseText);
      },
    }),
    !1
  );
}
function loadConfirmationBasket() {
  return (
    console.log("loadConfirmationBasket"),
    $.ajax({
      type: "GET",
      cache: !1,
      url: "/Zamowienie/PodsumowanieListaProduktow",
      beforeSend: function () {},
      success: function (n) {
        $('[data-id="ConfirmatiomBasketListArea"]').html(n);
      },
      error: function (n) {
        $('[data-id="ConfirmatiomBasketListArea"]').html("?");
        console.log(n.responseText);
      },
    }),
    !1
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
function copyProductSetSumPrice() {
  console.log("copyProductSetSumPrice");
  var n = $(
      '#ModalProductSetDetails [data-id="ProductDetailsPriceValue"]:visible'
    ).html(),
    t = parseInt(
      $('#ModalProductSetDetails [data-id="ProductDetailsAmount"]').val()
    ),
    i = n * t;
  return (
    $(
      '#ModalProductSetDetails [data-id="ModalProductSetDetailsSaveButtonPrice"]'
    ).html(i.toFixed(priceToFixedValue)),
    !0
  );
}
function loadDefaultDataForProductSetDetails() {
  console.log("loadDefaultDataForProductSetDetails");
  var n = $(
    '#ModalProductSetDetails [data-id="ProductSetDetailsBox"] [data-id="ProductSizeLabel"] [data-id="ProductSize"]:checked'
  );
  $(
    '#ModalProductSetDetails [data-id="ProductSetDetailsBox"] [data-id="ProductDetailsPrice"][data-sizeid="' +
      n.data("productsizesection") +
      '"]'
  ).show();
  checkComponentsAddSubstractButtonsForProductSetDetails();
}
function checkComponentsAddSubstractButtonsForProductSetDetails() {
  var i;
  console.log("checkComponentsAddSubstractButtonsForProductSetDetails");
  var n = parseInt(
      $('#ModalProductSetDetails [data-id="ProductSize"]:checked').data(
        "productsizesection"
      )
    ),
    r = !0,
    t = "";
  originalPriceField = $(
    '[data-id="ProductDetailsPrice"][data-sizeid="' +
      n +
      '"] [data-id="ProductDetailsPriceValue"]'
  );
  originalPrice = parseInt(originalPriceField.data("originalprice") * 1e3);
  allGroupsComponentsPricePartial = 0;
  allGroupsComponentsPriceAdd = 0;
  allGroupsComponentsPriceSubstract = 0;
  allGroupsComponentsPriceSubstractBelow = 0;
  $('#ModalProductSetDetails [data-id="ProductDetailsBoxComponent"]').each(
    function () {
      var f, u, i;
      if (n !== parseInt($(this).data("sizeid"))) return !0;
      sumAllComponentsAmount = 0;
      sumAllComponentsPrices = 0;
      sumAllComponentsPricesAdd = 0;
      sumAllComponentsPricesSubstract = 0;
      sumAllComponentsPricesSubstractBelow = 0;
      f = $(this).data();
      $(
        '#ModalProductSetDetails [data-id="ProductDetailsBoxComponentAmount"][data-componentgroupid="' +
          $(this).data("componentgroupid") +
          '"][data-sizeid="' +
          $(this).data("sizeid") +
          '"]'
      ).each(function () {
        var n = parseInt($(this).html()),
          i = parseInt($(this).data("originalamount"));
        sumAllComponentsAmount += n;
        n !== i &&
          (n > i &&
            ($(this).data("priceaddingtoprice") === !0 &&
              (sumAllComponentsPricesAdd +=
                parseInt($(this).data("pricevalue") * 1e3) * n),
            (t +=
              "+" +
              (n - i) +
              " x " +
              $(
                '#ModalProductSetDetails [data-id="ProductDetailsBoxComponentName"][data-componentid="' +
                  $(this).data("componentid") +
                  '"]'
              ).html() +
              ", ")),
          n < i &&
            ($(this).data("data-pricesubstractbelowprice") === !0
              ? (sumAllComponentsPricesSubstractBelow -=
                  parseInt($(this).data("pricevalue") * 1e3) * (i - n))
              : $(this).data("pricesubstractfromprice") === !0 &&
                (sumAllComponentsPricesSubstract -=
                  parseInt($(this).data("pricevalue") * 1e3) * (i - n)),
            (t +=
              "-" +
              (i - n) +
              " x " +
              $(
                '#ModalProductSetDetails [data-id="ProductDetailsBoxComponentName"][data-componentid="' +
                  $(this).data("componentid") +
                  '"]'
              ).html() +
              ", ")));
      });
      u = sumAllComponentsPricesSubstractBelow;
      i = sumAllComponentsPricesAdd + sumAllComponentsPricesSubstract;
      i + originalPrice < originalPrice && (i = 0);
      sumAllComponentsPrices = u + i;
      allGroupsComponentsPricePartial += sumAllComponentsPrices;
      allGroupsComponentsPriceAdd += sumAllComponentsPricesAdd;
      allGroupsComponentsPriceSubstract += sumAllComponentsPricesSubstract;
      allGroupsComponentsPriceSubstractBelow += sumAllComponentsPricesSubstractBelow;
      console.log(
        u +
          " / " +
          sumAllComponentsPricesAdd +
          " / " +
          sumAllComponentsPricesSubstract +
          " / " +
          sumAllComponentsPrices
      );
      $(this)
        .find('span[data-id="ProductDetailsBoxComponentSelectedValue"]')
        .html(sumAllComponentsAmount);
      sumAllComponentsAmount < $(this).data("minamount")
        ? ($(this).parent(".card-header").addClass("header-warning"),
          $(
            '#ModalProductSetDetails [data-id="ProductDetailsBoxComponentMinValueWarning"][data-componentgroupid="' +
              $(this).data("componentgroupid") +
              '"][data-sizeid="' +
              $(this).data("sizeid") +
              '"]'
          ).show(),
          (r = !1),
          console.log(
            "ModalSaveButtonEnable: " +
              $(this).data("componentgroupid") +
              " / " +
              sumAllComponentsAmount +
              " < " +
              $(this).data("minamount") +
              " / " +
              $(this).data("sizeid")
          ))
        : ($(this).parent(".card-header").removeClass("header-warning"),
          $(
            '#ModalProductSetDetails  [data-id="ProductDetailsBoxComponentMinValueWarning"][data-componentgroupid="' +
              $(this).data("componentgroupid") +
              '"][data-sizeid="' +
              $(this).data("sizeid") +
              '"]'
          ).hide());
      sumAllComponentsAmount >= $(this).data("maxamount")
        ? $(
            '#ModalProductSetDetails [data-id="ProductDetailsBoxComponentAddButton"][data-sizeid="' +
              $(this).data("sizeid") +
              '"][data-componentgroupid="' +
              $(this).data("componentgroupid") +
              '"]'
          ).prop("disabled", !0)
        : $(
            '#ModalProductSetDetails [data-id="ProductDetailsBoxComponentAddButton"][data-sizeid="' +
              $(this).data("sizeid") +
              '"][data-componentgroupid="' +
              $(this).data("componentgroupid") +
              '"]'
          ).removeProp("disabled");
      sumAllComponentsAmount <= 0
        ? $(
            '#ModalProductSetDetails [data-id="ProductDetailsBoxComponentSubtractButton"][data-sizeid="' +
              $(this).data("sizeid") +
              '"][data-componentgroupid="' +
              $(this).data("componentgroupid") +
              '"]'
          ).prop("disabled", !0)
        : $(
            '#ModalProductSetDetails [data-id="ProductDetailsBoxComponentSubtractButton"][data-sizeid="' +
              $(this).data("sizeid") +
              '"][data-componentgroupid="' +
              $(this).data("componentgroupid") +
              '"]'
          ).removeProp("disabled");
      $(
        '#ModalProductSetDetails [data-id="ProductDetailsBoxComponentAmount"][data-sizeid="' +
          $(this).data("sizeid") +
          '"]'
      ).each(function () {
        var n = parseInt($(this).html());
        n >= $(this).data("maxamount")
          ? $(
              '#ModalProductSetDetails [data-id="ProductDetailsBoxComponentAddButton"][data-componentid="' +
                $(this).data("componentid") +
                '"]'
            ).prop("disabled", !0)
          : $(this).data("componentgroupid") ||
            $(
              '#ModalProductSetDetails [data-id="ProductDetailsBoxComponentAddButton"][data-componentid="' +
                $(this).data("componentid") +
                '"]'
            ).removeProp("disabled");
        n <= 0
          ? $(
              '#ModalProductSetDetails [data-id="ProductDetailsBoxComponentSubtractButton"][data-componentid="' +
                $(this).data("componentid") +
                '"]'
            ).prop("disabled", !0)
          : $(this).data("componentgroupid") ||
            $(
              '#ModalProductSetDetails [data-id="ProductDetailsBoxComponentSubtractButton"][data-componentid="' +
                $(this).data("componentid") +
                '"]'
            ).removeProp("disabled");
      });
    }
  );
  allGroupsComponentsPriceAdd +
    allGroupsComponentsPriceSubstract +
    originalPrice >
    originalPrice &&
    (originalPrice +=
      allGroupsComponentsPriceAdd + allGroupsComponentsPriceSubstract);
  originalPrice += allGroupsComponentsPriceSubstractBelow;
  i = originalPrice / 1e3;
  originalPriceField.html(i.toFixed(priceToFixedValue));
  originalPriceField.data("pricevalue", i.toFixed(priceToFixedValue));
  copyProductSetSumPrice();
  $('[data-id="ProductDetailsBoxComponentsList"]').hide();
  t.length &&
    ($(
      '[data-id="ProductDetailsBoxComponentsList"][data-sizeid="' + n + '"]'
    ).show(),
    $(
      '[data-id="ProductDetailsBoxComponentsList"][data-sizeid="' +
        n +
        '"] [data-id="ProductDetailsBoxComponentsListContent"]'
    ).html(t));
  console.log(
    "tmpPrice: " +
      i +
      " | Rozmiar: " +
      n +
      " | allGroupsComponentsPricePartial: " +
      allGroupsComponentsPricePartial +
      " | price: " +
      originalPriceField.data("pricevalue")
  );
  r
    ? $(
        '#ModalProductSetDetails [data-id="ModalProductSetDetailsSaveButton"]'
      ).removeProp("disabled")
    : $(
        '#ModalProductSetDetails [data-id="ModalProductSetDetailsSaveButton"]'
      ).prop("disabled", !0);
}
function generateNormalBasketString(n) {
  var t = n.data();
  return (
    t.productid +
    "||" +
    t.originalamount +
    "|" +
    t.originalcontent +
    "|" +
    t.oryginalprice +
    "|"
  );
}
function genetateSetAddBasketString() {
  var t = $('#ModalProductSetDetails [data-id="ProductSize"]:checked'),
    r = parseInt(t.data("productsizesection")),
    f = t.data("productsizeshort"),
    u = $('#ModalProductSetDetails [data-id="ProductDetailsPrice"]'),
    e = parseInt(u.data("productid")),
    o = parseInt(
      $('#ModalProductSetDetails [data-id="ProductDetailsAmount"]').val()
    ),
    s = parseInt(u.data("productcontent")),
    h = $(
      '#ModalProductSetDetails [data-id="ProductDetailsPrice"][data-sizeid="' +
        r +
        '"] [data-id="ProductDetailsPriceValue"]'
    ).data("pricevalue"),
    n = e + "|" + f + "|" + o + "|" + s + "|" + h + "|";
  return (
    $(
      '#ModalProductSetDetails [data-id="ProductDetailsBoxComponentAmount"]'
    ).each(function () {
      if (r !== parseInt($(this).data("sizeid"))) return !0;
      var t = parseInt($(this).html()),
        u = parseInt($(this).data("originalamount"));
      if (t !== u) {
        if (t > u)
          for (tmpDifference = t - u, i = 1; i <= tmpDifference; i++)
            (n += "ADD|"),
              (n += $(this).data("componentsystemid") + "|"),
              (n += $(this).data("pricevalue") + "|"),
              (n += $(this).data("originalcontent") + "|"),
              (n += $(this).data("pricelistid") + "|"),
              (n += $(this).data("componentgroupid") + "|");
        if (t < u)
          for (tmpDifference = u - t, i = 1; i <= tmpDifference; i++)
            (n += "DEL|"),
              (n += $(this).data("componentsystemid") + "|"),
              (n += $(this).data("pricevalue") + "|"),
              (n += $(this).data("originalcontent") + "|"),
              (n += $(this).data("pricelistid") + "|"),
              (n += $(this).data("componentgroupid") + "|");
      }
    }),
    n
  );
}
function showHideSelectionOfTimeDelivery() {
  $('[data-id="DeliveryTimeSelect"]').is(":checked")
    ? $('[data-id="DeliveryTimeSelectArea"]').slideDown()
    : $('[data-id="DeliveryTimeSelectArea"]').slideUp();
}
function copyPriceForConfirmation() {
  console.log("copyPriceForConfirmation");
  var n = $('[data-id="ConfirmationBasketSummaryPrice"]').text();
  $('[data-id="ConfirmationToPay"]').text(n);
}
function showPasswordFields() {
  console.log("showPasswordFields");
  $('[data-id="UserRegisterCheckbox"]').is(":checked")
    ? $('[data-id="UserRegistrationArea"]').show()
    : $('[data-id="UserRegistrationArea"]').hide();
}
var menuCategoriesOffsetTop, menuBasketOffsetTop;
AOS.init({
  disable: "phone",
});
var mySetTimeout,
  messageSetTimeout,
  missTrigger = 0,
  menuCategories = $("#MenuCategories"),
  menuBasket = $("#MenuBasket");
menuCategories.length &&
  (menuCategoriesOffsetTop =
    menuCategories.offset().top - $("#PageMainMenu").outerHeight() - 200);
menuBasket.length &&
  (menuBasketOffsetTop =
    menuBasket.offset().top - $("#PageMainMenu").outerHeight() - 200);
$(window).scroll(function () {
  $(window).scrollTop() > menuCategoriesOffsetTop &&
  isScrolledIntoViewOuside($(".menu-area-content"), 500) &&
  menuCategories.length
    ? ($("#MenuCategories").addClass(
        "fixed-top-menu-categories menu-fixed-elements-height"
      ),
      $(".menu-fixed-elements-height").matchHeight())
    : $("#MenuCategories")
        .removeClass("fixed-top-menu-categories menu-fixed-elements-height")
        .css("height", "auto");
  $(window).scrollTop() > menuBasketOffsetTop &&
  isScrolledIntoViewOuside($(".menu-area-content"), 500) &&
  menuBasket.length
    ? ($("#MenuBasket").addClass(
        "fixed-top-menu-basket menu-fixed-elements-height"
      ),
      $(".menu-fixed-elements-height").matchHeight())
    : $("#MenuBasket")
        .removeClass("fixed-top-menu-basket menu-fixed-elements-height")
        .css("height", "auto");
});
$(function () {
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
  $(".matchHeight").matchHeight();
});
$(document).on(
  "click",
  '[data-id="ProductDetailsBoxComponentAddButton"]',
  function (n) {
    n.preventDefault();
    var i = $(this),
      t = $(
        '[data-id="ProductDetailsBoxComponentAmount"][data-componentid="' +
          i.data("componentid") +
          '"]'
      ),
      u = parseInt(t.data("maxamount")),
      f = parseInt(t.data("maxamount")),
      r =
        parseInt(
          $(
            '[data-id="ProductDetailsBoxComponentAmount"][data-componentid="' +
              i.data("componentid") +
              '"]'
          ).html()
        ) + 1;
    r <= u && t.html(r);
    checkComponentsAddSubstractButtonsForProductSetDetails();
  }
);
$(document).on(
  "click",
  '[data-id="ProductDetailsBoxComponentSubtractButton"]',
  function (n) {
    n.preventDefault();
    var t = $(this);
    parseInt(
      $(
        '[data-id="ProductDetailsBoxComponentAmount"][data-componentid="' +
          t.data("componentid") +
          '"]'
      ).html()
    ) > 0 &&
      $(
        '[data-id="ProductDetailsBoxComponentAmount"][data-componentid="' +
          t.data("componentid") +
          '"]'
      ).html(
        parseInt(
          $(
            '[data-id="ProductDetailsBoxComponentAmount"][data-componentid="' +
              t.data("componentid") +
              '"]'
          ).html()
        ) - 1
      );
    checkComponentsAddSubstractButtonsForProductSetDetails();
  }
);
$(document).on("click", '[data-id="ModalBasketProductDeleteButton"]', function (
  n
) {
  n.preventDefault();
  var t = $(this).data();
  productRemoveFromBasket($(this).data("lineid"));
});
$(document).on(
  "click",
  '#ModalProductSetDetails [data-id="ProductDetailsAmountPlus"]',
  function (n) {
    n.preventDefault();
    console.log("ProductDetailsAmountPlus");
    var t = $('#ModalProductSetDetails [data-id="ProductDetailsAmount"]'),
      i = parseInt(t.prop("max")),
      r = parseInt(t.prop("min"));
    parseInt(t.val()) < i && t.val(parseInt(t.val()) + 1);
    copyProductSetSumPrice();
  }
);
$(document).on(
  "click",
  '#ModalProductSetDetails [data-id="ProductDetailsAmountMinus"]',
  function (n) {
    n.preventDefault();
    console.log("ProductDetailsAmountMinus");
    var t = $('#ModalProductSetDetails [data-id="ProductDetailsAmount"]'),
      r = parseInt(t.prop("max")),
      i = parseInt(t.prop("min"));
    parseInt(t.val()) > i && t.val(parseInt(t.val()) - 1);
    copyProductSetSumPrice();
  }
);
$(document).on("click", '[data-id="ModalLoginLoginButton"]', function (n) {
  n.preventDefault();
  submitLoginForm(refreshPageAfterLogin, !0);
});
$(document).on("click", '[data-id="LanguageChangeButton"]', function (n) {
  n.preventDefault();
  $('[data-id="ModalLanguageChange"]').modal("show");
  showChnageLanguage();
});
$(document).on("click", '[data-action="ShowBigImage"]', function (n) {
  n.preventDefault();
  console.log("ShowBigImage");
  $('[data-id="ModalBigImageContent"]').html(
    '<img src="' + $(this).data("bigimage") + '" class="img-fluid">'
  );
  $('[data-id="ModalBigImage"]').modal("show");
});
$(document).on("click", '[data-action="ShowMoreText"]', function (n) {
  n.preventDefault();
  var t = $(this).data();
  $(
    '[data-id="MenuProductDescriptionMore"][data-productid="' +
      t.productid +
      '"]'
  ).toggle();
  $(".matchHeight ").matchHeight();
});
$(document).on("click", '[data-id="HeaderLoginButton"]', function (n) {
  n.preventDefault();
  $('[data-id="ModalLogin"]').modal("show");
  showLoginForm();
});
$(document).on("click", '[data-id="ButtonShowLoginForm"]', function (n) {
  n.preventDefault();
  $('[data-id="ModalLogin"]').modal("show");
  showLoginForm();
});
$(document).on("click", '[data-buttontype="ButtonProductSetChoose"]', function (
  n
) {
  n.preventDefault();
  var t = $(this).data("productid");
  $("#ModalProductSetDetails").modal("show");
  $(
    '#ModalProductSetDetails [data-id="ModalProductSetDetailsSaveButton"]'
  ).prop("disabled", !0);
  $(
    '#ModalProductSetDetails [data-id="ModalProductSetDetailsSaveButtonPrice"]'
  ).html("");
  loadProductSetDetails(t);
});
$(document).on("click", '[data-buttontype="ButtonProductAdd"]', function (n) {
  n.preventDefault();
  console.log("click ButtonProductAdd");
  $(this)
    .addClass("wait-loading-button")
    .prepend(' <i class="fas fa-circle-notch fa-spin loading-icon"></i>')
    .find("i.fas")
    .last()
    .hide();
  productAddToBasket(generateNormalBasketString($(this)));
});
$(document).on(
  "click",
  '[data-id="ModalProductSetDetailsSaveButton"]',
  function (n) {
    n.preventDefault();
    console.log("click ModalProductSetDetailsSaveButton");
    $(this)
      .addClass("wait-loading-button")
      .prepend(' <i class="fas fa-circle-notch fa-spin loading-icon"></i>')
      .find("i.fas")
      .last()
      .hide();
    productAddToBasket(genetateSetAddBasketString());
  }
);
$(document).on("click", '[data-id="MenuBasketButtonShow"]', function (n) {
  n.preventDefault();
  $('[data-id="ModalBasket"]').modal("show");
  $('[data-id="ModalBasketSaveButton"]').addClass("disabled");
  showBasketContent();
});
$(document).on("click", '[data-id="ButtonsetDeliveryToAddress"]', function (n) {
  n.preventDefault();
  setDeliveryToAddress();
});
$(document).on("click", '[data-id="ButtonSetLocalPickup"]', function (n) {
  n.preventDefault();
  setLocalPickup();
});
$(document).on(
  "change",
  '[data-id="DeliveryCityName"],[data-id="DeliveryStreetName"],[data-id="DeliveryAddressNumber"]',
  function () {
    console.log("Chane Address Fields");
    var n = $('[data-id="DeliveryCityName"]'),
      t = $('[data-id="DeliveryStreetName"]'),
      i = $('[data-id="DeliveryAddressNumber"]');
    clearTimeout(mySetTimeout);
    n.find(":selected").val() &&
      t.find(":selected").val() &&
      i.val() &&
      (mySetTimeout = setTimeout(function () {
        setDeliveryAddress();
      }, 1e3));
  }
);
$(document).on(
  "change",
  '[data-id="ClientName"],[data-id="ClientSurname"],[data-id="ClientTelephone"],[data-id="ClientEmail"]',
  function () {
    var n = $('[data-id="DeliveryCityName"]'),
      t = $('[data-id="ClientSurname"]'),
      i = $('[data-id="ClientTelephone"]'),
      r = $('[data-id="ClientEmail"]');
    clearTimeout(mySetTimeout);
    n.val() &&
      t.val() &&
      i.val() &&
      r.val() &&
      (mySetTimeout = setTimeout(function () {
        setPersonalData();
      }, 1e3));
  }
);
$(document).on("change", '[data-id="UserRegisterCheckbox"]', function (n) {
  n.preventDefault();
  showPasswordFields();
});
$(document).on(
  "change",
  '#ModalProductSetDetails [data-id="ProductSetDetailsBox"] [data-id="ProductSizeLabel"]',
  function () {
    var n = $(this).find('[data-id="ProductSize"]'),
      t = $('#ModalProductSetDetails [data-id="ProductSetDetailsBox"]');
    $(this).parent().find('[data-id="ProductSize"]').removeProp("checked");
    n.prop("checked", !0);
    t.find('[data-id="ProductComponentsSelectioAccordionSize"]').hide();
    t.find(
      '[data-id="ProductComponentsSelectioAccordionSize"][data-productsizesection="' +
        n.data("productsizesection") +
        '"]'
    ).show();
    $(
      '#ModalProductSetDetails [data-id="ProductSetDetailsBox"] [data-id="ProductDetailsPrice"]'
    ).hide();
    $(
      '#ModalProductSetDetails [data-id="ProductSetDetailsBox"] [data-id="ProductDetailsPrice"][data-sizeid="' +
        n.data("productsizesection") +
        '"]'
    ).show();
    checkComponentsAddSubstractButtonsForProductSetDetails();
    copyProductSetSumPrice();
  }
);
$(document).on("change", '[data-id="UserAddresses"]', function () {
  console.log("UserAddresses");
  var n = $(this).find(":selected");
  $('[data-id="DeliveryCityName"]').val(n.data("city")).trigger("change");
  $('[data-id="DeliveryStreetName"]').val(n.data("street")).trigger("change");
  $('[data-id="DeliveryAddressNumber"]')
    .val(n.data("number"))
    .trigger("change");
});
$("button[data-menucategoryid]").on("click", function (n) {
  n.preventDefault();
  var i = $(this),
    t = 0,
    r = 0;
  $('[data-id="ButtonMenuCategoriesCollapse"]:visible') &&
    ((t += $('[data-id="ButtonMenuCategoriesCollapse"]:visible').outerHeight()),
    (r = 250));
  $(".navbar-collapse").collapse("hide");
  setTimeout(function () {
    t += $("#MenuCategories").outerHeight() + $("#PageMainMenu").outerHeight();
    scrollToElement(
      '[data-menuproductcategoryid="' + i.data("menucategoryid") + '"]',
      t
    );
  }, r);
  console.log(
    "data-menucategoryid: " +
      $(
        '[data-menuproductcategoryid="' + i.data("menucategoryid") + '"]'
      ).offset().top +
      " | " +
      $("#MenuCategories").outerHeight() +
      " | " +
      $("#PageMainMenu").outerHeight()
  );
});
$("a[data-sectionscroll]").on("click", function (n) {
  n.preventDefault();
  $('[data-pagesection="' + $(this).data("sectionscroll") + '"]').length > 0
    ? (scrollToElement(
        '[data-pagesection="' + $(this).data("sectionscroll") + '"]',
        $("#PageMainMenu").outerHeight() + 8
      ),
      console.log("data-pagesection: " + $("#MenuCategories").outerHeight()))
    : (window.location.href = $(this).attr("href"));
});
$(document).on(
  "change",
  '[name="Zamowienie.CzyCzasDostarczeniaZamowieniaDoWyboru"]',
  function () {
    showHideSelectionOfTimeDelivery();
  }
);
$(".modal").on("hidden.bs.modal", function () {
  $(".modal-body").html("");
});
priceInBasket();
showPasswordFields();
