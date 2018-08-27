$(document).ready(function() {

// login button
  $(document).on("click", "#login", function() {

    event.preventDefault();
    
    $("#page-mask").show();
    $("#splash-login").show();

  });

// // close-login button
  $(document).on("click", "#close-login", function() {

    event.preventDefault();

    $("#splash-login").hide();
    $("#page-mask").hide();

  });

// car button
$(document).on("click", "#cart", function() {

  event.preventDefault();
  
  $("#page-mask").show();
  $("#splash-cart").show();

});

// // close-cart button
$(document).on("click", "#close-cart", function() {

  event.preventDefault();

  $("#splash-cart").hide();
  $("#page-mask").hide();

});

// register button
  $(document).on("click", "#register", function() {

    event.preventDefault();
    
    $("#page-mask").show();
    $("#splash-register").show();

  });

// close-register button
  $(document).on("click", "#close-register", function() {

    event.preventDefault();

    $("#splash-register").hide();
    $("#page-mask").hide();

  });

// haven't-registered link
  $(document).on("click", "#login-register", function() {

    event.preventDefault();

    $("#splash-login").hide();
    $("#splash-register").show();

  });

//products scroll
  $(document).on("click", "#flower", function() {

    event.preventDefault();

    $([document.documentElement, document.body]).animate({
      scrollTop: $("#products-row").offset().top
    }, 900);

  });

  $(document).on("click", "#edible", function() {

    event.preventDefault();

    $([document.documentElement, document.body]).animate({
      scrollTop: $(".edible-row").offset().top
    }, 900);

  });

  $(document).on("click", "#concentrate", function() {

    event.preventDefault();

    $([document.documentElement, document.body]).animate({
      scrollTop: $(".concentrate-row").offset().top
    }, 900);

  });

// cart functionality

  $(document).on("click", "#add-to-cart", function(){

    event.preventDefault();

    let dataName = $(this).attr("data-name");
    console.log(dataName);
    let dataPrice = $(this).attr("data-price");
    let dataQuantity = $(this).attr("data-quantity");
    let newLi = $("<li>").attr("class", "list-group-item order");
    $(newLi).attr("data-name", dataName);
    $(newLi).attr("data-price", dataPrice);
    $(newLi).attr("data-quantity", dataQuantity);

    let newSpan1 = $("<span>");
    let newSpan2 = $("<span>");
    let newSpan3 = $("<span>");
    $(newSpan1).text(`Item: ${dataName} `);
    $(newSpan2).text(`Quantity: ${dataQuantity} `);
    $(newSpan3).text(`Price: $${dataPrice} `);
    $(newLi).append(newSpan1, newSpan2, newSpan3);
    $("#order-list-products").append(newLi);

  })

//checkout
  $(document).on("click", "#checkout", function() {

    event.preventDefault();

    let groupItem = $(".list-group-item");

    let totalQuantity = 0;
    let userName = $(user).text();
    let totalPrice = 0;

    console.log("this works")
    console.log(groupItem.length);
    console.log(groupItem);
    console.log(groupItem[1]);
    console.log($(groupItem[1]).attr("data-quantity"));


    for(i= 0; i < groupItem.length; i++) {
      let quantity = parseInt($(groupItem[i]).attr("data-quantity"));
      totalQuantity += quantity;
    };

    console.log(totalQuantity);

    for(i= 0; i < groupItem.length; i++) {
      let price = parseInt($(groupItem[i]).attr("data-price"));
      totalPrice += price;
    };

    console.log(totalPrice);

    let currentUrl = window.location.origin;

    $.post(`${currentUrl}/api/order`,
    {
        name: userName,
        totalQuantity: totalQuantity,
        totalPrice: totalPrice
    },
    function(data){
        
    });
  })
//User display

  let currentUrl = window.location.origin;

  $.get(currentUrl + "/api/user", function(data) {
    
    let user = data;

    if (user) {

      $("#user-nav").children(".select").hide();

      let newA = $("<a>");
      $(newA).attr("href", "/profile")
      let newSpan = $("<span>");
      $(newSpan).attr("id", "user");
      $(newSpan).append(user.email);
      $(newA).append(newSpan);
      $(newA).attr("")
      $("#user-nav").prepend(newA);

      let newLi1 = $("<li>");
      $(newLi1).attr("class", "list-group-item");
      $(newLi1).append(`Email: ${user.email}`);
      $("#user-list").append(newLi1);

      let newLi2 = $("<li>");
      $(newLi2).attr("class", "list-group-item");
      $(newLi2).append(`Address: ${user.streetaddress} ${user.streetaddress2} ${user.city} ${user.state} ${user.zipcode}`);
      $("#user-list").append(newLi2);
      console.log(user);

    };

  });

//
  $.get(currentUrl + "/api/order", function(data) {


    
    console.log(data);
    console.log(data.length);
    console.log(data[1].totalquantity);

    for(i = 0; i < data.length; i++) {
      let newLi = $("<li>");
      $(newLi).attr("class", "list-group-item");
      let newSpan1 = $("<span>").text(`Order #: ${data[i].oid} `);
      let newSpan2 = $("<span>").text(`Quantity: ${data[i].totalquantity} `);
      let newSpan3 = $("<span>").text(`Price: $${data[i].ordertotal} `);
      console.log(newLi);
      console.log(newSpan1);
      $(newLi).append(newSpan1, newSpan2, newSpan3);

      $("#order-list-profile").append(newLi);

      
    }
  })

});
