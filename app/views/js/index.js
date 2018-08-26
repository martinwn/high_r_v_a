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

});
