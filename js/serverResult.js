const origin = "https://zamowienia.s4honline.pl";

function loadProductSetDetails(n) {
  return (
    $.ajax({
      type: "GET",
      cache: !1,
      url: `${origin}/Home/SzczegolyZestawu?Artykul=` + n,
      beforeSend: function () {
        $("#customize-pizza .modal-content").html(
          '<i class="fas fa-circle-notch fa-spin mx-auto"></i>'
        );
      },
      success: function (n) {
        $("#customize-pizza .modal-content").html(n);
        //   loadDefaultDataForProductSetDetails();
        console.log(n);
      },
      error: function (n) {
        $("#customize-pizza .modal-content").html(n.responseText);
        console.log("loadProductSetDetails()");
        console.log(n.responseText);
      },
    }),
    !1
  );
}

function productAddToBasket(n) {
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
        ? (showMainAlerts("success", n.Kod, n.Wiadomosc),
          $("#ModalProductSetDetails").modal("hide"))
        : showMainAlerts("danger", n.Kod, n.Wiadomosc);
      // priceInBasket()
    },
    error: function (n) {
      console.log(n.responseText);
    },
  }),
    !1;
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

function addToBasketTest() {
  productAddToBasket("100252||1|1.00|5.00|");
}
