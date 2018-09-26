function Calendar(options) {
  this.id = options.el;
  this.sDate = options.startDate;
  this.nDays = parseInt(options.daysNumer);
  this.color = options.colors;
  this.options = {};

  this.setLanguage(options.lang);

  var startDate = new Date(this.sDate);
  var endDate = this.addDays(this.nDays);
  var nMonths = this.calcDate(startDate, endDate);

  for (var i = 0; i < nMonths; i++) {
    this.drawMonths();
  }

  this.label = [];
  this.labels = [];

  console.log("Calendar");
}

Calendar.prototype = {
  constructor: Calendar
};

Calendar.prototype.addDays = function(days) {
  var date = new Date(this.sDate);
  date.setDate(date.getDate() + days);
  return date;
};

Calendar.prototype.calcDate = function(sDate, fDate) {
  if (sDate > fDate) {
    return;
  }
  months = (fDate.getFullYear() - sDate.getFullYear()) * 12;
  months += fDate.getMonth() - sDate.getMonth();
  return months;
};

Calendar.prototype.setLanguage = function(lang) {
  // ? TODO load dynamic language
  this.options.months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  this.options.label = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
};

Calendar.prototype.createCalendar = function(month, year) {};

Calendar.prototype.drawMonths = function() {
  var theCalendar = document.createElement("div");
  for (var i = 0; i < this.labels.length; i++) {
    var month = this.labels[i].month;
    var year = this.labels[i].year;

    this.createCalendar(month, year);
  }

  document.getElementById(this.id).appendChild(theCalendar.cloneNode(true));
};

window.addEventListener("load", function() {
  var form = document.querySelector("#form");

  form.addEventListener("submit", function(event) {
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
