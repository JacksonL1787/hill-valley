$(window).resize(navScroll);
$(document).ready(navScroll);
$(window).scroll(navScroll);



function navScroll() {

	var scrollTop = $(window).scrollTop();

    if($(window).width() >= 992) {
    	$("#collapse-navbar").removeClass("collapse-navbar-open")
        if(scrollTop >= 25) {
			$("#global-nav").addClass("scrolled-nav");
			$("#global-nav").addClass("bg-dark");
		} else {
			$("#global-nav").removeClass("scrolled-nav");
			$("#global-nav").removeClass("bg-dark");
		}
    } else {
		return;
	}
}

$('.collapse-nav').click(function() {
	$("#collapse-navbar").toggleClass("collapse-navbar-open")	
});

$('#collapse-navbar .nav-item').click(function() {
	$("#collapse-navbar").removeClass("collapse-navbar-open")
})