$('#create-event-prompt-btn').click(function() {
    $('.box-modal').addClass('active')
    $('.box-modal-form').addClass('active')
    $('body').css('overflow-y', 'hidden')
});

$('#cancel-btn').click(function() {
    $('.box-modal').removeClass('active')
    $('.box-modal-form').removeClass('active')
    $('body').css('overflow-y', 'auto')
    $('.form-wrapper input').each(function() {
        $(this).val('')
    })
})

// var birthday = new Date(1995, 11, 20, 11, 50, 0)
// console.log(birthday.getHours() + ":" + birthday.getMinutes())
// console.log(birthday.getMonth() + "/" + birthday.getDay() + "/" + birthday.getUTCFullYear())

// var array = [{id: 1, date: {year: 2000, month: 0, day: 20, hour: 13, minutes: 50, seconds: 0}}, {id: 2, date: {year: 2000, month: 0, day: 20, hour: 11, minutes: 50, seconds: 0}}, {id: 3, date: {year: 2005, month: 0, day: 20, hour: 13, minutes: 50, seconds: 0}}];

// array.sort(function(a, b) {
//     console.log(new Date(b.date.year,b.date.month,b.date.day,b.date.hour,b.date.minutes,b.date.seconds))
//     console.log(new Date(a.date.year,a.date.month,a.date.day,a.date.hour,a.date.minutes,a.date.seconds))
//     return new Date(b.date.year,b.date.month,b.date.day,b.date.hour,b.date.minutes,b.date.seconds) - new Date(a.date.year,a.date.month,a.date.day,a.date.hour,a.date.minutes,a.date.seconds);
// });

// console.log(array);

$('.create-event-box').click(function() {
    window.location.href = '/events/create'
})
