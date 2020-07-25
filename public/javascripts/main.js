 function scrollAbout() {
     $('html, body').animate({
        scrollTop: $(".about-container").offset().top - 100
    }, 1000);
}

 function scrollReservations() {
     $('html, body').animate({
        scrollTop: $(".rentals-container").offset().top - 100
    }, 1000);
}