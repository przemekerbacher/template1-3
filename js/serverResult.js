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
      },
      success: function (n) {
        $("#customize-pizza .modal-content .addons").html(n);
      },
      error: function (n) {
        $("#customize-pizza .modal-content .addons").html(n.responseText);
        console.log("loadProductSetDetails()");
        console.log(n.responseText);
      },
    }),
    !1
  );
}

function productAddToBasket(n) {
  console.log(n);
  $.ajax({
    type: "POST",
    cache: !1,
    url: `${origin}/Zamowienie/DodajDoKoszyka`,
    data: {
      DaneDoKoszyka: n,
    },
    beforeSend: function () {},
    complete: function () {},
    success: function (n) {
      n.Kod > 0
        ? ((document.querySelector("#customize-pizza").style.display = "none"),
          (document.body.style.overflow = "auto"),
          showBasketContent())
        : null;
    },
    error: function (n) {
      console.log(n.responseText);
    },
  }),
    !1;
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

function showBasketContent() {
  return (
    console.log("showBasketContent"),
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
      },
      error: function (n) {
        console.log(n.responseText);
      },
    }),
    !1
  );
}
