function getTime() {
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  var d = new Date();
  var month = month[d.getMonth()];
  var year = d.getFullYear();
  var day = d.getDate();
  var hour = d.getHours();
  var minutes = d.getMinutes();

  if (minutes == 0) minutes = "00";
  else if (minutes == 1) minutes = "01";
  else if (minutes == 2) minutes = "02";
  else if (minutes == 3) minutes = "03";
  else if (minutes == 4) minutes = "04";
  else if (minutes == 5) minutes = "05";
  else if (minutes == 6) minutes = "06";
  else if (minutes == 7) minutes = "07";
  else if (minutes == 8) minutes = "08";
  else if (minutes == 9) minutes = "09";

  h = hour.toString();
  m = minutes.toString();
  mo = month;
  da = day.toString();
  y = year.toString();
}