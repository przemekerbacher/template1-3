const origin = "https://zamowienia.s4honline.pl";

function loadProductSetDetails(n) {
  return (
    $.ajax({
      type: "GET",
      cache: !1,
      url: `${origin}/Home/SzczegolyZestawu?Artykul=` + n,
      beforeSend: function () {
        $("#customize-pizza .modal-content .addons").html(
          '<i class="fas fa-circle-notch fa-spin mx-auto"></i>'
        );
        $("#customize-pizza .modal-content .addCustomizableProduct").attr(
          "disabled",
          true
        );
      },
      success: function (n) {
        $("#customize-pizza .modal-content .addons").html(n);
        addProdutCustomizable();
        $("#customize-pizza .modal-content .addCustomizableProduct").attr(
          "disabled",
          false
        );
      },
      error: function (n) {
        $("#customize-pizza .modal-content .addons").html(n.responseText);
      },
    }),
    !1
  );
}

function productAddToBasket(n, source) {
  const sourceHtml = $(source).html();
  $.ajax({
    type: "POST",
    cache: !1,
    url: `${origin}/Zamowienie/DodajDoKoszyka`,
    data: {
      DaneDoKoszyka: n,
    },
    beforeSend: function () {
      M.toast({ html: "Dodaję do koszyka" });

      $(source).html(`<i class="fas fa-circle-notch fa-spin mx-auto"></i>`);
      $(source).attr("disabled", true);
    },
    complete: function () {},
    success: function (n) {
      n.Kod > 0
        ? ((document.querySelector("#customize-pizza").style.display = "none"),
          (document.body.style.overflow = "auto"),
          showBasketContent())
        : null;
      M.toast({ html: "Dodano do koszyka", classes: "success" });

      $(source).html(sourceHtml);
      $(source).attr("disabled", false);
    },
    error: function (n) {
      M.toast({ html: "Nie udało się dodać do koszyka", classes: "error" });
      console.log(n.responseText);
      $(source).html(sourceHtml);
      $(source).attr("disabled", false);
    },
  }),
    !1;
}
function productRemoveFromBasket(n) {
  return (
    $.ajax({
      type: "POST",
      cache: !1,
      url: `${origin}/Zamowienie/UsunZkoszyka`,
      data: {
        Linijka: n,
      },
      beforeSend: function () {
        M.toast({ html: "Usuwam produkt z koszyka" });
      },
      success: function (n) {
        n.Kod >= 0
          ? (M.toast({
              html: "Usunięto produkt z koszyka",
              classes: "success",
            }),
            showBasketContent())
          : M.toast({
              html: "Nie udało się usunąć produktu",
              classes: "error",
            });
      },
      error: function (n) {},
    }),
    !1
  );
}
function showChnageLanguage() {
  return (
    $.ajax({
      type: "GET",
      cache: !1,
      url: `${origin}/Home/AjaxModalJezykow`,
      beforeSend: function () {},
      success: function (n) {
        $("#changeLanguage .changeLanguage").html(n);
      },
      error: function (n) {
        console.log(n.responseText);
      },
    }),
    !1
  );
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
function generateSetAddBasketString() {
  var t = $('#customize-pizza [data-id="ProductSize"]:checked'),
    r = parseInt(t.data("productsizesection")),
    f = t.data("productsizeshort"),
    u = $('#customize-pizza [data-id="ProductDetailsPrice"]'),
    e = parseInt(u.data("productid")),
    o = parseInt($('#customize-pizza [data-id="ProductDetailsAmount"]').val()),
    s = parseInt(u.data("productcontent")),
    h = $(
      '#customize-pizza [data-id="ProductDetailsPrice"][data-sizeid="' +
        r +
        '"] [data-id="ProductDetailsPriceValue"]'
    ).data("pricevalue"),
    n = e + "|" + f + "|" + o + "|" + s + "|" + h + "|";
  return (
    $('#customize-pizza [data-id="ProductDetailsBoxComponentAmount"]').each(
      function () {
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
      }
    ),
    n
  );
}
function showBasketContent() {
  return (
    $.ajax({
      type: "GET",
      cache: !1,
      url: `${origin}/Home/GenerujKoszykModal`,
      beforeSend: function () {
        $("#order .order-items").html(
          '<i class="fas fa-circle-notch fa-spin mx-auto"></i>'
        );
      },
      success: function (n) {
        $("#order .order-items").html(n);
        basket = $("#order .total-to-pay span");
        basketPrice = $('[data-id="ModalBasketSumAmountValue"]').html();
        basket.html(basketPrice);
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
      url: `${origin}/Profil/LoginFormularzAjax`,
      beforeSend: function () {},
      success: function (n) {
        $("#loginForm .modal-content .form").html(n);
      },
      error: function (n) {
        console.log(n.responseText);
      },
    }),
    !1
  );
}
function submitLoginForm() {
  var i = $("#loginForm form").serialize();
  return (
    $.ajax({
      type: "POST",
      cache: !1,
      url: `${origin}/Profil/LoginAjax`,
      data: i,
      beforeSend: function () {},
      success: function (i) {
        i.Kod > 0
          ? M.toast(
              { html: i.Wiadomosc, classes: "success" },
              $("#loginForm").css("display", "none"),
              $("body").css("overflow", "auto")
            )
          : M.toast({ html: i.Wiadomosc, classes: "error" });
      },
      error: function (n) {
        console.log(n.responseText);
      },
    }),
    !1
  );
}
