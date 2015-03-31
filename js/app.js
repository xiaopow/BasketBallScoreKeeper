// $(document).ready(function() {
  var option = {
    time: 12,
    sessions: 4,
    homeName: 'Home',
    awayName: 'Away',
    homePlayers: [],
    awayPlayers: []
  }
  var minLeft = option.time;
  var secLeft = 0;
  var msecLeft = 0;
  var timer;

  var countDown = function () {
    if (minLeft > 0 && secLeft == 0 && msecLeft == 0) {
      $('#second').text('00');
      $('#msecond').text(msecLeft);
      msecLeft = 9;
      minLeft = minLeft - 1;
      secLeft = 59;
    } else if (minLeft >= 0 && secLeft > 0 && msecLeft == 0) {
      $('#msecond').text(msecLeft);
      secLeft = secLeft - 1;
      msecLeft = 9;
    } else if (minLeft >= 0 && msecLeft > 0) {
      if (secLeft > 9) {
        $('#second').text(secLeft);
      } else {
        $('#second').text('0' + secLeft);
      }
      $('#minute').text(minLeft);
      $('#msecond').text(msecLeft);
      msecLeft = msecLeft - 1 ;
    } else if (minLeft == 0 && secLeft == 0 && msecLeft == 0) {
      $('#msecond').text(msecLeft);
      console.log('stop the timer');
      clearInterval(timer);
    }
  }

  var resume = function() {
    timer = setInterval(countDown, 500);
  }

  var pause = function() {
    clearInterval(timer);
  }

// })