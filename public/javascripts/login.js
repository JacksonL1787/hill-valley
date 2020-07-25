/* global $ */

$(".form-input").on("input", function() {
    if($("#login-email").val() == "" || $("#login-password").val() == "") {
        $('#login-btn').addClass("disabled");
        $('#login-btn').prop("disabled", true);
    } else {
        $('#login-btn').prop("disabled", false);
        $('#login-btn').removeClass("disabled");
    }
});