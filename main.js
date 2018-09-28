var Calendar = require('./calendar.js');


window.addEventListener("load", function () {
    var form = document.querySelector("#form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var sDate = document.querySelector("[name=cal_start_date]").value;
        var nDate = document.querySelector("[name=cal_num_of_dates]").value;

        var options = {
            el: "calendarContainer",
            startDate: sDate,
            daysNumer: nDate,
            colors: ["#E91E63", "#C2185B", "#FFFFFF", "#F8BBD0"]
        };

        new Calendar(options);
    });
});
