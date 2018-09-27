function Calendar(options) {
  this.id = options.el;
  this.sDate = new Date(Date.parse(options.startDate) + 86400000);
  this.endDate = null;
  this.nDays = parseInt(options.daysNumer);
  this.color = options.colors;
  this.options = {};

  this.setLanguage(options.lang);
  document.getElementById(this.id)
  this.endDate = this.addDays(this.nDays);
  var nMonths = this.calcDate(this.sDate, this.endDate);

  this.clearDraw();
  for (var i = 0; i < nMonths.length; i++) {
    this.drawMonths(nMonths[i], i);
  }
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

    var dateMap = [];
    var currentDate = new Date(sDate.getFullYear(), sDate.getMonth(), 1);
    var lastDate  = new Date(fDate.getFullYear(), fDate.getMonth(), 1);

    while (currentDate <= lastDate) {
      var newMonth = currentDate.getMonth() + 1;
      var newYear = newMonth > 11 ? (sDate.getFullYear() + 1) : sDate.getFullYear();
      newMonth = newMonth > 11 ? (newMonth - 12) : newMonth;
      dateMap.push(currentDate);
      currentDate = new Date(newYear, newMonth, "1");
    }
    return dateMap;
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
  this.options.days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
};

Calendar.prototype.clearDraw = function(){
    document.getElementById(this.id).innerHTML = "";
};

Calendar.prototype.drawMonths = function(mDate) {
  let today = new Date();
  let firstDay = new Date(mDate.getFullYear(), mDate.getMonth(), 1).getDay();
  let daysInMonth = 32 - mDate.getDate();

  var theCalendar = document.createElement("div");
  theCalendar.className = "calendar";

  var calHeader = document.createElement("div");
  calHeader.innerHTML =
    this.options.months[mDate.getMonth()] + " " + mDate.getFullYear();
  calHeader.className = "cal-header";
  theCalendar.appendChild(calHeader);

  var calWeek = document.createElement("div");
  calWeek.className = "cal-week";
  for (var i = 0; i < this.options.days.length; i++) {
    var theLabel = document.createElement("span");
    theLabel.className = "day-of-week";
    theLabel.appendChild(
      document.createTextNode(this.options.days[i]).cloneNode(true)
    );
    calWeek.appendChild(theLabel.cloneNode(true));
  }

  theCalendar.appendChild(calWeek.cloneNode(true));

  var calDays = document.createElement("div");
  calDays.className = "cal-days";
  var theRows = [],
    theDays = [];
  let date = 1;
  for (let i = 0; i < 6; i++) {
    theRows[i] = document.createElement("div");
    theRows[i].className = "cal-row row";
    for (let j = 0; j < 7; j++) {
      theDays[j] = document.createElement("label");
      if (i === 0 && j < firstDay) {
        theDays[j].className = "mute day";
        let cellText = document.createTextNode("");
        theDays[j].appendChild(cellText);
        theRows[i].appendChild(theDays[j]);
      } else if (date > daysInMonth) {
        break;
      } else {
        theDays[j].className = "no-mute day";

        let cellText = document.createTextNode(date);
        if (date === today.getDate() && mDate.getFullYear() === today.getFullYear() && mDate.getMonth() === today.getMonth()) {
          theDays[j].classList.add("bg-info");
        }
        theDays[j].appendChild(cellText);
        theRows[i].appendChild(theDays[j]);
        date++;
      }
    }
  }

  for (var i = 0; i < 6; i++) {
    calDays.appendChild(theRows[i].cloneNode(true));
  }

  theCalendar.appendChild(calDays.cloneNode(true));
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
