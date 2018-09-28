  var moment = require('moment');

  function Calendar(options) {
    this.id = options.el;
    this.sDate = new Date(Date.parse(options.startDate) + 86400000);
    this.endDate = null;
    this.nDays = parseInt(options.daysNumer);
    this.color = options.colors;
    this.options = {};

    this.setLanguage(options.lang);
    document.getElementById(this.id);

    this.endDate = moment(this.sDate, "DD-MM-YYYY").add(this.nDays, 'days')
    var nMonths = this.calcDate(this.sDate, this.endDate);

    this.clearDraw();
    for (var i = 0; i < nMonths.length; i++) {
      this.drawMonths(nMonths[i], i);
    }
  }

  Calendar.prototype = {
    constructor: Calendar
  };

  Calendar.prototype.calcDate = function(sDate, fDate) {
      if (sDate > fDate) {
        return;
      }

    var dateStart = moment(sDate);
    var dateEnd = moment(fDate);
    var dateMap = [];
    var month = null;

    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
      month = dateStart.clone().startOf('month');
      dateMap.push(month);
      dateStart.add(1,'month');
    }
        return dateMap;
    };

  Calendar.prototype.setLanguage = function(lang) {
    // ? TODO load dynamic language
    // ? TODO load full / short name

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
      "S",
      "M",
      "T",
      "W",
      "T",
      "F",
      "S"
    ];
  };

  Calendar.prototype.clearDraw = function(){
      document.getElementById(this.id).innerHTML = "";
  };

  Calendar.prototype.drawMonths = function(month) {
    let today = moment();
    let firstDay =  month.day();
    let daysInMonth = month.daysInMonth();
    let trackDays = month.clone();

    var theCalendar = document.createElement("table");
    theCalendar.className = "calendar col-md-5 mx-auto";

    var tHeader = document.createElement("thead");
    var calWeek = document.createElement("tr");
    calWeek.className = "cal-week";
    for (var i = 0; i < this.options.days.length; i++) {
      var theLabel = document.createElement("th");
      theLabel.className = "day-of-week";
      theLabel.appendChild(
        document.createTextNode(this.options.days[i]).cloneNode(true)
      );
      calWeek.appendChild(theLabel.cloneNode(true));
    }
    tHeader.appendChild(calWeek.cloneNode(true));

    var calMonth = document.createElement("tr");
    calMonth.className = "month-header";

    var tdMonh = document.createElement('th');
    tdMonh.innerHTML = this.options.months[month.month()] + " " + month.year();
    tdMonh.setAttribute('colSpan', '7');
    calMonth.appendChild(tdMonh);
    tHeader.appendChild(calMonth.cloneNode(true));

    theCalendar.appendChild(tHeader.cloneNode(true));

    var calDays = document.createElement("tbody");
    calDays.className = "cal-days";
    var theRows = [],
      theDays = [];
    let date = 1;

    for (let i = 0; i < 6; i++) {
      theRows[i] = document.createElement("tr");
      theRows[i].className = "cal-row";
      for (let j = 0; j < 7; j++) {
        theDays[j] = document.createElement("td");
        theDays[j].className = "day";
        if (i === 0 && j < firstDay) {
          let cellText = document.createTextNode("");
          theDays[j].appendChild(cellText);
          theRows[i].appendChild(theDays[j]);
          theDays[j].className += " mute";
        } else if (date > daysInMonth) {
          break;
        } else {
          if(trackDays.weekday()==0 || trackDays.weekday()==6){
            theDays[j].className += ' week-end';
          } else {
            theDays[j].className += ' week-day';
          }

          if(trackDays.isBetween(moment(this.sDate).subtract(1,'day'), moment(this.endDate).add(1,'day'),'day')){
            let cellText = document.createTextNode(date);
            theDays[j].appendChild(cellText);

            if (trackDays.isSame(today,'day')) {
              theDays[j].classList.add("bg-info");
            }

          } else {
            theDays[j].className += " mute";
          }

          theRows[i].appendChild(theDays[j]);
          trackDays.add(1, 'day');
          date++;
        }
      }
    }

    for (let i = 0; i < 6; i++) {
      calDays.appendChild(theRows[i].cloneNode(true));
    }

    theCalendar.appendChild(calDays.cloneNode(true));

    document.getElementById(this.id).appendChild(theCalendar.cloneNode(true));
  };

  module.exports = Calendar;
